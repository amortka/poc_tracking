import { IRouteState } from './store/routes/routes.model';
import { IPathWithPointsCoordinates } from './modules/canvas/canvas.model';
import { IVehicleState } from './store/vehicles/vehicles.model';

export interface Dictionary<T> {
  [id: string]: T;
}

export enum ApiEvents {
  VEHICLE_UPDATE = 'VEHICLE_UPDATE',
}
/**
 * Communication
 */

export interface IVehicleUpdate {
  vehicleId: string;
  pathId: string;
  sensorId: string;
  event: string;
}

export interface IApiVehicleUpdate {
  Acc_Val_X_RMS: number;
  Acc_Val_Y_RMS: number;
  Acc_Val_Z_RMS: number;
  Vel_Val_Magnitude_P2P: number;
  Temp: number;
  Humidity: number;
  Ambient_Pressure: number;
  Timestamp: number;
  TimeStats: string;
  rfids: string[];
  deviceId: string;
  pathId?: string;
}

export interface IRouteWithData extends Omit<IRouteState, 'vehicle' | 'path'> {
  vehicle: IVehicleState;
  path: IPathWithPointsCoordinates;
}
