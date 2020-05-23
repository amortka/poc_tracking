import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';

import './App.css';
import { store } from './store/store.config';
import { UI } from './modules/ui/UI';
import { CanvasManager } from './modules/canvas-manager/CanvasMenager';

import socketIOClient from 'socket.io-client';
const ENDPOINT = 'http://127.0.0.1:3001';
const SOCKET_IO_CONFIG = {
  reconnectionDelay: 1000,
  reconnection: true,
  reconnectionAttemps: 10,
  agent: false,
  upgrade: false,
  rejectUnauthorized: false,
};

function App() {
  const [response, setResponse] = useState('');

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on('FromAPI', (data) => {
      setResponse(data);
    });
  }, []);

  const [onZoomIn, setOnZoomIn] = useState(() => () => console.log('onZoomIn'));
  const [onZoomOut, setOnZoomOut] = useState(() => () => console.log('onZoomOut'));
  const [onZoomFit, setOnZoomFit] = useState(() => () => console.log('onZoomFit'));

  return (
    <Provider store={store}>
      <p style={{ position: 'fixed', top: 0, left: 0, zIndex: 10000, backgroundColor: 'white', width: '100%' }}>
        It's <time dateTime={response}>{response}</time>
      </p>
      <UI onZoomIn={onZoomIn} onZoomOut={onZoomOut} onZoomFit={onZoomFit}>
        <CanvasManager setOnZoomIn={setOnZoomIn} setOnZoomOut={setOnZoomOut} setOnZoomFit={setOnZoomFit} />
      </UI>
    </Provider>
  );
}

export default App;
