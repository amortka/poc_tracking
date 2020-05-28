import React, { useEffect } from 'react';
import { ApiEvent } from '../../app.model';
import { store } from '../../store/store.config';
import { VehiclesActions } from '../../store/vehicles/vehicles.actions';
import { VehicleMock } from '../../mocks/vehicle.mock';

function actionReducer(actionType: ApiEvent, data: any): void {
  switch (actionType) {
    case ApiEvent.VEHICLE_UPDATE:
      store.dispatch(VehiclesActions.updateVehicle(data));
  }
}

function useVehicleMock() {
  useEffect(() => {
    const socketIO = {
      emit: (actionType: ApiEvent, payload: any) => {
        actionReducer(actionType, payload);
      },
    };

    const vehicleMock = new VehicleMock(socketIO as any);
    vehicleMock.startSimulation();
    return () => vehicleMock.stopSimulation();
  }, []);
}

export const MockedBackend: React.FC = () => {
  useVehicleMock();
  return <React.Fragment />;
};
