import { Dictionary, IVehicle } from '../../app.model';

export enum VehiclesAction {
  SET_VEHICLES = '@@vehicles/SET_VEHICLES',
  UPDATE_VEHICLE = '@@vehicles/UPDATE_VEHICLE',
}

export interface VehiclesState extends Dictionary<IVehicle> {}
