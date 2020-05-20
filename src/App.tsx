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
import './App.css';
import { Canvas } from './modules/canvas/Canvas';
import { CommunicationMock } from './mocks/communication.mock';
import { IEventContextPayload } from './modules/canvas/contexts/EventsContext';
import { IVisualisationState } from './models/main.model';
import { store } from './store/store.config';

import './App.css';
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
