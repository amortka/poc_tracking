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
import { SelectionEventTooltip } from './modules/visualisation-tooltip/SelectionEventTooltip';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

function App() {
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
        />
        <MouseEventTooltip events={events} />
        <SelectionEventTooltip objects={[]} />
        <InfoSidebar />
      </ThemeProvider>
    </main>
  );
}

export default App;
