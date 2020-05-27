import { action } from 'typesafe-actions';
import { VehiclesAction } from './vehicles.model';
import { Dictionary, IApiVehicleUpdate } from '../../app.model';
import { IVehicle } from '../../modules/canvas/canvas.model';

export const VehiclesActions = {
  setVehicles: (payload: Dictionary<IVehicle>) => action(VehiclesAction.SET_VEHICLES, payload),
  updateVehicle: (payload: IApiVehicleUpdate) => action(VehiclesAction.UPDATE_VEHICLE, payload),
};
