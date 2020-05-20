import React, { useEffect, useState } from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { Provider } from 'react-redux';

import './App.css';
import { Canvas } from './modules/canvas/Canvas';
import { CommunicationMock } from './mocks/communication.mock';
import { IEventContextPayload } from './modules/canvas/contexts/EventsContext';
import { IVisualisationState } from './models/main.model';
import { store } from './store/store.config';
import { VehiclePositionsService } from './VehiclePositions.service';
import { visualisationStateMock, visualizationSceneMock } from './mocks/main.mock';
import { VisualizationType } from './modules/canvas/canvas.model';
import { UI } from './modules/ui/UI';

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
  const [selection, setSelection] = useState(null);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <UI>
          <Canvas
            selectionDataClb={setSelection}
            scene={visualizationSceneMock}
            state={state}
            type={VisualizationType.D3}
            events={setEvents}
            debug={true}
          />
        </UI>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
