import React, { useEffect, useState } from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';

import './App.css';
import { Canvas } from './modules/three/Canvas';
import { CartInfo } from './modules/ui-interface/components/CartInfo';
import { CommunicationMock } from './mocks/communication.mock';
import { IEventContextPayload } from './modules/three/contexts/EventsContext';
import { InfoSidebar } from './modules/ui-interface/components/InfoSidebar';
import { Menu } from './modules/ui-interface/components/Menu';
import { MouseEventTooltip } from './modules/visualisation-tooltip/MouseEventTooltip';
import { SelectionEventTooltip } from './modules/visualisation-tooltip/SelectionEventTooltip';
import { VehicleAnimation } from './models/main.model';
import { VehiclePositionsService } from './VehiclePositions.service';
import { visualisationStateMock, visualizationSceneMock } from './mocks/main.mock';
import { VisualizationType } from './modules/three/canvas.model';

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
  const [isCartInfoVisible, setIsCartInfoVisible] = useState(false);
  const [selection, setSelection] = useState(null);

  return (
    <main className={'MainContainer'}>
      <ThemeProvider theme={theme}>
        <Menu />
        <div className={'CanvasWrapper'}>
          <Canvas
            selectionDataClb={setSelection}
            scene={visualizationSceneMock}
            state={visualisationStateMock}
            type={VisualizationType.D3}
            events={setEvents}
            vehicles={vehicles}
            debug={true}
          />
          <MouseEventTooltip events={events} />
          <SelectionEventTooltip selection={selection} debug={true} centerPosition={{ x: -2, y: -18 }} />
        </div>
        <InfoSidebar setIsCartInfoVisible={setIsCartInfoVisible} />
        {isCartInfoVisible && <CartInfo setIsCartInfoVisible={setIsCartInfoVisible} />}
      </ThemeProvider>
    </main>
  );
}

export default App;
