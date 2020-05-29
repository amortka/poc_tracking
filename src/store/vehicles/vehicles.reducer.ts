import { Reducer } from 'redux';
import { VehiclesAction, IVehiclesState, IVehicleState } from './vehicles.model';
import { IApiVehicleUpdate } from '../../app.model';

export const initialState: IVehiclesState = {};

function vehicleDTO(payload: IApiVehicleUpdate): Partial<IVehicleState> {
  const {
    Ambient_Pressure: ambientPressure,
    Humidity: humidity,
    Temp: temperature,
    Vel_Val_Magnitude_P2P: velocity,
    Acc_Val_X_RMS: x,
    Acc_Val_Y_RMS: y,
    Acc_Val_Z_RMS: z,
    Timestamp: lastUpdateTime,
    TimeStats: timeStats,
    rfids: currentRfIds,
  } = payload;

  return {
    ambientPressure,
    humidity,
    temperature,
    velocity,
    acceleration: { x, y, z },
    lastUpdateTime,
    timeStats,
    currentRfIds,
  };
}

export const vehiclesReducer: Reducer<IVehiclesState> = (state = initialState, action) => {
  switch (action.type) {
    case VehiclesAction.SET_VEHICLES: {
      return { ...action.payload };
    }
    case VehiclesAction.UPDATE_VEHICLE: {
      const payload = action.payload as IApiVehicleUpdate;
      const vehicle = vehicleDTO(action.payload);
      return { ...state, [payload.deviceId]: { ...state[payload.deviceId], ...vehicle } };
    }
    default: {
      return state;
    }
  }
};
