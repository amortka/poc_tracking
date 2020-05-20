import { action } from 'typesafe-actions';
import { VehiclesAction } from './vehicles.model';
import { Dictionary, IVehicle } from '../../app.model';

export const VehiclesActions = {
  setVehicles: (payload: Dictionary<IVehicle>) => action(VehiclesAction.SET_VEHICLES, payload),
  updateVehicle: (payload: { vehicleId: string; data: IVehicle }) => action(VehiclesAction.SET_VEHICLES, payload),
};
