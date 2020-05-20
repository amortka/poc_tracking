import React, { useEffect, useState, useCallback } from 'react';
import { Provider } from 'react-redux';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';

import { CommunicationMock } from './mocks/communication.mock';
import { visualizationSceneMock, visualizationStateMock } from './mocks/main.mock';

import { IVisualizationState } from './models/main.model';

import { Canvas } from './modules/three/Canvas';
import { CartInfo } from './modules/ui-interface/components/CartInfo';
import { IEventContextPayload } from './modules/three/contexts/EventsContext';
import { InfoSidebar } from './modules/ui-interface/components/InfoSidebar';
import { Menu } from './modules/ui-interface/components/Menu';
import { MouseEventTooltip } from './modules/visualisation-tooltip/MouseEventTooltip';
import { SelectionEventTooltip } from './modules/visualisation-tooltip/SelectionEventTooltip';
import { VisualizationType } from './modules/three/canvas.model';

import { RoutesProgressService, RouteUpdate } from './RoutesProgressService';
import { store } from './store/store.config';

import './App.css';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

function App() {
  const [state, setState] = useState<IVisualizationState>(visualizationStateMock);

  const updateVehicleState = useCallback((data: RouteUpdate) => {
    setState((state) => ({
      ...state,
      routes: {
        ...state.routes,
        [data.routeId]: {
          ...state.routes[data.routeId],
          path: data.pathId,
          vehicle: data.tag,
          progress: data.progress,
        },
      },
    }));
  }, []);

  useEffect(() => {
    const communicationMock = new CommunicationMock({ id: 'trqzbojg', pathId: 'ojihoybn' });
    const routesProgressService = new RoutesProgressService(visualizationSceneMock.paths);
    routesProgressService.onProgressUpdate(updateVehicleState);
    communicationMock.simulate(routesProgressService.handleVehicleUpdate);
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
