import './App.css';
import React, { useState } from 'react';
import { Canvas } from './modules/three/Canvas';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { InfoSidebar } from './modules/ui-interface/components/InfoSidebar';
import { Menu } from './modules/ui-interface/components/Menu';
import { visualizationMock } from './mocks/main.mock';
import { VisualizationType } from './modules/three/canvas.model';
import { VisualisationTooltip } from './modules/visualisation-tooltip/VisualisationTooltip';
import { IEventContextPayload } from './modules/three/contexts/EventsContext';
import { CartInfo } from './modules/ui-interface/components/CartInfo';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

function App() {
  const [events, setEvents] = useState<IEventContextPayload>(null);
  const [isCartInfoVisible, setIsCartInfoVisible] = useState(false);

  return (
    <main className={'MainContainer'}>
      <ThemeProvider theme={theme}>
        <Menu />
        <Canvas config={visualizationMock} type={VisualizationType.D3} events={setEvents} />
        <VisualisationTooltip events={events} />
        <InfoSidebar setIsCartInfoVisible={setIsCartInfoVisible} />
        {isCartInfoVisible && <CartInfo setIsCartInfoVisible={setIsCartInfoVisible} />}
      </ThemeProvider>
    </main>
  );
}

export default App;
