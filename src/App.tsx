import React from 'react';
import { Provider } from 'react-redux';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';

import './App.css';
import { store } from './store/store.config';
import { UI } from './modules/ui/UI';
import { CanvasManager } from './modules/canvas-manager/CanvasMenager';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <UI>
          <CanvasManager />
        </UI>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
