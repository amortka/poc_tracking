import React, { useState } from 'react';
import { Provider } from 'react-redux';

import './App.css';
import { store } from './store/store.config';
import { UI } from './modules/ui/UI';
import { CanvasManager } from './modules/canvas-manager/CanvasMenager';
import { ServerHandler } from './modules/server-handler/ServerHandler';

function App() {
  const [onZoomIn, setOnZoomIn] = useState(() => () => console.log('onZoomIn'));
  const [onZoomOut, setOnZoomOut] = useState(() => () => console.log('onZoomOut'));
  const [onZoomFit, setOnZoomFit] = useState(() => () => console.log('onZoomFit'));

  return (
    <Provider store={store}>
      <ServerHandler>
        <UI onZoomIn={onZoomIn} onZoomOut={onZoomOut} onZoomFit={onZoomFit}>
          <CanvasManager setOnZoomIn={setOnZoomIn} setOnZoomOut={setOnZoomOut} setOnZoomFit={setOnZoomFit} />
        </UI>
      </ServerHandler>
    </Provider>
  );
}

export default App;
