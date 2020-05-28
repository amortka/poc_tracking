import * as React from 'react';
import { useEffect } from 'react';
import socketIOClient from 'socket.io-client';

import { store } from '../../store/store.config';
import { VehiclesActions } from '../../store/vehicles/vehicles.actions';
import { ApiEvent, IApiVehicleUpdate } from '../../app.model';

const ENDPOINT = 'http://127.0.0.1:3001';
const SOCKET_IO_CONFIG = {
  reconnectionDelay: 1000,
  reconnection: true,
  reconnectionAttemps: 10,
  agent: false,
  upgrade: false,
  rejectUnauthorized: false,
};

function useWebsocket() {
  useEffect(() => {
    const socket = socketIOClient(ENDPOINT, SOCKET_IO_CONFIG);

    socket.on('connect', (connect) => console.log({ connect }));
    socket.on('connect_error', (connect_error) => console.log({ connect_error }));
    socket.on('connect_timeout', (connect_timeout) => console.log({ connect_timeout }));
    socket.on('error', (error) => console.log({ error }));
    socket.on('disconnect', (disconnect) => console.log({ disconnect }));
    socket.on('reconnect_attempt', (reconnect_attempt) => console.log({ reconnect_attempt }));
    socket.on('reconnecting', (reconnecting) => console.log({ reconnecting }));
    socket.on('reconnect_error', (reconnect_error) => console.log({ reconnect_error }));
    socket.on('reconnect_failed', (reconnect_failed) => console.log({ reconnect_failed }));
    socket.on('reconnect_failed', (reconnect_failed) => console.log({ reconnect_failed }));

    socket.on(ApiEvent.VEHICLE_UPDATE, (data: IApiVehicleUpdate) => {
      store.dispatch(VehiclesActions.updateVehicle(data));
    });
    return () => socket.close();
  }, []);

  return;
}

export const RealBackend: React.FC = () => {
  useWebsocket();
  return <React.Fragment />;
};
