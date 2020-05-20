import React, { useEffect, useState } from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { Provider } from 'react-redux';

import './App.css';
import { Canvas } from './modules/three/Canvas';
import { CartInfo } from './modules/ui-interface/components/CartInfo';
import { CommunicationMock } from './mocks/communication.mock';
import { IEventContextPayload } from './modules/three/contexts/EventsContext';
import { InfoSidebar } from './modules/ui-interface/components/InfoSidebar';
import { IVisualisationState } from './models/main.model';
import { Menu } from './modules/ui-interface/components/Menu';
import { MouseEventTooltip } from './modules/visualisation-tooltip/MouseEventTooltip';
import { SelectionEventTooltip } from './modules/visualisation-tooltip/SelectionEventTooltip';
import { store } from './store/store.config';
import { VehiclePositionsService } from './VehiclePositions.service';
import { visualisationStateMock, visualizationSceneMock } from './mocks/main.mock';
import { VisualizationType } from './modules/three/canvas.model';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

function App() {
  const [state, setState] = useState<IVisualisationState>(visualisationStateMock);

  useEffect(() => {
    const communicationMock = new CommunicationMock({ tag: 'Milkrun ABC', pathId: 'ojihoybn' });
    const vehiclePositionService = new VehiclePositionsService(visualizationSceneMock.paths);
    vehiclePositionService.onUpdate((data) => {
      setState((state) => ({
        ...state,
        routes: {
          ...state.routes,
          [data.routeId]: {
            ...state.routes[data.routeId],
            progress: data.progress,
          },
        },
      }));
    });
    vehiclePositionService.start();

    communicationMock.simulate(vehiclePositionService.handleEvent);
  }, []);

  const [events, setEvents] = useState<IEventContextPayload>(null);
  const [isCartInfoVisible, setIsCartInfoVisible] = useState(false);
  const [selection, setSelection] = useState(null);

  return (
    <Provider store={store}>
      <main className={'MainContainer'}>
        <ThemeProvider theme={theme}>
          <Menu />
          <div className={'CanvasWrapper'}>
            <Canvas
              selectionDataClb={setSelection}
              scene={visualizationSceneMock}
              state={state}
              type={VisualizationType.D3}
              events={setEvents}
              debug={true}
            />
            <MouseEventTooltip events={events} />
            <SelectionEventTooltip selection={selection} debug={true} centerPosition={{ x: -2, y: -18 }} />
          </div>
          <InfoSidebar setIsCartInfoVisible={setIsCartInfoVisible} />
          {isCartInfoVisible && <CartInfo setIsCartInfoVisible={setIsCartInfoVisible} />}
        </ThemeProvider>
      </main>
    </Provider>
  );
}

export default App;
