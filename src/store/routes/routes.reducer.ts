import { Reducer } from 'redux';
import shortid from 'shortid';

import { RoutesState, RoutesAction } from './routes.model';
import { VehiclesAction } from '../vehicles/vehicles.model';
import { IApiVehicleUpdate } from '../../app.model';

export const initialState: RoutesState = {};

export const routesReducer: Reducer<RoutesState> = (state = initialState, action) => {
  switch (action.type) {
    case RoutesAction.ADD_ROUTE: {
      const newId = shortid.generate();
      return { ...state, [newId]: action.payload };
    }
    case RoutesAction.UPDATE_ROUTE: {
      return { ...state, [action.payload.vehicleId]: { ...state[action.payload.vehicleId], ...action.payload.data } };
    }

    // TODO: temporary add creation of route by backend vehicle update where rfid is not empty
    case VehiclesAction.UPDATE_VEHICLE: {
      const vehicleUpdate = action.payload as IApiVehicleUpdate;

      // check if vehicleUpdate has rfids so in on the route
      if (!vehicleUpdate.rfids.length) return;
      // check if vehicle has its routes
      if (Object.values(state).find((route) => route.vehicle === vehicleUpdate.deviceId)) return;

      const newId = shortid.generate();
      return {
        ...state,
        [newId]: {
          vehicle: vehicleUpdate.deviceId,
          path: 'ojihoybn',
          selected: true,
        },
      };
    }
    default: {
      return state;
    }
  }
};
