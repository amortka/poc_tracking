import './App.css';
import React from 'react';
import { Canvas } from './modules/three/Canvas';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { InfoSidebar } from './modules/ui-interface/components/InfoSidebar';
import { Menu } from './modules/ui-interface/components/Menu';
import { visualizationMock } from './mocks/main.mock';
import { VisualizationType } from './modules/three/canvas.model';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

function App() {
  const callback = (payload) => console.log({ payload });

  return (
    <main className={'MainContainer'}>
      <ThemeProvider theme={theme}>
        <Menu />
        <Canvas config={visualizationMock} type={VisualizationType.D3} events={callback} />
        <InfoSidebar />
      </ThemeProvider>
    </main>
  );
}

export default App;
