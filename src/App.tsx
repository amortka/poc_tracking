import React from 'react';
import { Provider } from 'react-redux';

import './App.css';
import { store } from './store/store.config';
import { UI } from './modules/ui/UI';
import { CanvasManager } from './modules/canvas-manager/CanvasMenager';

function App() {
  return (
    <Provider store={store}>
      <UI>
        <CanvasManager />
      </UI>
    </Provider>
  );
}

export default App;
