import { Reducer } from 'redux';
import { VehiclesAction, VehiclesState } from './vehicles.model';
import { visualizationStateMock } from '../../mocks/main.mock';

export const initialState: VehiclesState = {
  ...visualizationStateMock.vehicles,
};

export const vehiclesReducer: Reducer<VehiclesState> = (state = initialState, action) => {
  switch (action.type) {
    case VehiclesAction.SET_VEHICLES: {
      return { ...action.payload };
    }
    case VehiclesAction.UPDATE_VEHICLE: {
      return { ...state, [action.payload.vehicleId]: { ...state[action.payload.vehicleId], ...action.payload.data } };
    }
    default: {
      return state;
    }
  }
};
