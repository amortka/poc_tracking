import { Reducer } from 'redux';
import { IVehiclesState, IVehicleState, VehiclesAction } from './vehicles.model';
import { IApiVehicleUpdate } from '../../app.model';
import { RoutesActions } from '../routes/routes.actions';
import { RealDeviceId } from '../../modules/server-handler/RealBackend';

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

      // NOTE: This is additional functionality due to POC presentation
      // When user retrieve first real backend data then select new route
      if (payload.deviceId === RealDeviceId && !state[payload.deviceId]) {
        action.asyncDispatch(RoutesActions.selectRoutesByDeviceId(RealDeviceId));
      }

      return { ...state, [payload.deviceId]: { ...state[payload.deviceId], ...vehicle } };
    }
    default: {
      return state;
    }
  }
};
