import React, { useState, useEffect } from 'react';
import { Canvas } from './modules/three/Canvas';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { InfoSidebar } from './modules/ui-interface/components/InfoSidebar';
import { Menu } from './modules/ui-interface/components/Menu';
import { visualizationMock } from './mocks/main.mock';
import { VehicleAnimation } from './models/main.model';
import { VisualizationType } from './modules/three/canvas.model';
import { VisualizationTooltip } from './modules/visualisation-tooltip/VisualisationTooltip';
import { IEventContextPayload } from './modules/three/contexts/EventsContext';
import { CommunicationMock } from './mocks/communication.mock';
import { VehiclePositionsService } from './VehiclePositions.service';
import './App.css';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

function App() {
  const [vehicles, setVehicles] = useState<VehicleAnimation[]>([
    { pathId: 'ojihoybn', tag: 'Milkrun ABC', type: 'basic', progress: 0.38 },
    // { pathId: 'ojihoybn', tag: 'Milkrun GHI', type: 'basic', progress: 0.78 },
    // { pathId: 'ojihoybn', tag: 'Milkrun MNB', type: 'basic', progress: 0.1 },
  ]);

  useEffect(() => {
    const communicationMock = new CommunicationMock({ tag: 'Milkrun ABC', path: 'dsada' });
    const vehiclePositionService = new VehiclePositionsService(visualizationMock.paths);
    vehiclePositionService.onUpdate((data) => setVehicles([data]));

    communicationMock.simulate(vehiclePositionService.handleEvent);
  }, []);

  const [events, setEvents] = useState<IEventContextPayload>(null);

  return (
    <main className={'MainContainer'}>
      <ThemeProvider theme={theme}>
        <Menu />
        <Canvas config={visualizationMock} type={VisualizationType.D3} events={setEvents} vehicles={vehicles} />
        <VisualizationTooltip events={events} />
        <InfoSidebar />
      </ThemeProvider>
    </main>
  );
}

export default App;
