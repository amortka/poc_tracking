import React, { useState, useEffect } from 'react';
import { Canvas } from './modules/three/Canvas';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { InfoSidebar } from './modules/ui-interface/components/InfoSidebar';
import { Menu } from './modules/ui-interface/components/Menu';
import { VehicleAnimation } from './models/main.model';
import { VisualizationType } from './modules/three/canvas.model';
import { IEventContextPayload } from './modules/three/contexts/EventsContext';
import { CommunicationMock } from './mocks/communication.mock';
import { VehiclePositionsService } from './VehiclePositions.service';
import './App.css';
import { visualizationSceneMock, visualisationStateMock, selectionMock } from './mocks/main.mock';
import { MouseEventTooltip } from './modules/visualisation-tooltip/MouseEventTooltip';
import { SelectionEventTooltip } from './modules/visualisation-tooltip/SelectionEventTooltip';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

function App() {
  const [vehicles, setVehicles] = useState<VehicleAnimation[]>([]);

  useEffect(() => {
    const communicationMock = new CommunicationMock({ tag: 'Milkrun ABC', pathId: 'ojihoybn' });
    const vehiclePositionService = new VehiclePositionsService(visualizationSceneMock.paths);
    vehiclePositionService.onUpdate((data) => setVehicles([data]));
    vehiclePositionService.start();

    communicationMock.simulate(vehiclePositionService.handleEvent);
  }, []);

  const [events, setEvents] = useState<IEventContextPayload>(null);

  return (
    <main className={'MainContainer'}>
      <ThemeProvider theme={theme}>
        <Menu />
        <Canvas
          selectionDataClb={(payload) => console.log({ payload })}
          selection={selectionMock}
          scene={visualizationSceneMock}
          state={visualisationStateMock}
          type={VisualizationType.D3}
          events={setEvents}
          vehicles={vehicles}
        />
        <MouseEventTooltip events={events} />
        <SelectionEventTooltip objects={[]} />
        <InfoSidebar />
      </ThemeProvider>
    </main>
  );
}

export default App;
