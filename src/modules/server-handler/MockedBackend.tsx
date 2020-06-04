import React, { useEffect } from 'react';

import { ApiEvent } from '../../app.model';
import { store } from '../../store/store.config';
import { VehiclesActions } from '../../store/vehicles/vehicles.actions';
import { VehicleMock } from '../../mocks/vehicle.mock';
import { ObjectResourceMock } from '../../mocks/object-resource.mock';
import { ObjectsActions } from '../../store/objects/objects.actions';

function actionReducer(actionType: ApiEvent, data: any): void {
  switch (actionType) {
    case ApiEvent.VEHICLE_UPDATE:
      store.dispatch(VehiclesActions.updateVehicle(data));
      break;

    case ApiEvent.ORDERS_UPDATE:
      break;
    case ApiEvent.OBJECT_UPDATE:
      store.dispatch(ObjectsActions.setObjectResourceIndicator(data));
      break;
  }
}

function useVehicleMock() {
  useEffect(() => {
    const socketIO = {
      emit: (actionType: ApiEvent, payload: any) => {
        actionReducer(actionType, payload);
      },
    };

    const objectResourceMock = new ObjectResourceMock(socketIO as any);
    objectResourceMock.startSimulation();

    const vehicleMock = new VehicleMock(socketIO as any, objectResourceMock);
    vehicleMock.startSimulation();

    return () => {
      vehicleMock.stopSimulation();
      objectResourceMock.stopSimulation();
    };
  }, []);
}

export const MockedBackend: React.FC = () => {
  useVehicleMock();
  return <React.Fragment />;
};
