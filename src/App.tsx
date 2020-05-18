import './App.css';
import React, { useState } from 'react';
import { Canvas } from './modules/three/Canvas';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { InfoSidebar } from './modules/ui-interface/components/InfoSidebar';
import { Menu } from './modules/ui-interface/components/Menu';
import { visualizationSceneMock, visualisationStateMock, selectionMock } from './mocks/main.mock';
import { VisualizationType } from './modules/three/canvas.model';
import { MouseEventTooltip } from './modules/visualisation-tooltip/MouseEventTooltip';
import { IEventContextPayload } from './modules/three/contexts/EventsContext';
import { CartInfo } from './modules/ui-interface/components/CartInfo';
import { SelectionEventTooltip } from './modules/visualisation-tooltip/SelectionEventTooltip';

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
        <Canvas
          selectionDataClb={(payload) => console.log({ payload })}
          selection={selectionMock}
          scene={visualizationSceneMock}
          state={visualisationStateMock}
          type={VisualizationType.D3}
          events={setEvents}
        />
        <MouseEventTooltip events={events} />
        <SelectionEventTooltip objects={[]} />
        <InfoSidebar setIsCartInfoVisible={setIsCartInfoVisible} />
        {isCartInfoVisible && <CartInfo setIsCartInfoVisible={setIsCartInfoVisible} />}
      </ThemeProvider>
    </main>
  );
}

export default App;
