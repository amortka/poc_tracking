import { IRouteState } from './store/routes/routes.model';
import { IVehicleState } from './store/vehicles/vehicles.model';

export interface Dictionary<T> {
  [id: string]: T;
}

/**
 * Communication
 */

export enum ApiEvent {
  VEHICLE_UPDATE = 'VEHICLE_UPDATE',
  OBJECT_UPDATE = 'OBJECT_UPDATE',
}

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

export type IApiObjectResourceUpdate = Array<{
  objectId: string;
  resourceIndicator?: number; // 0-1
}>;

export interface IApiWebsocketMessage {
  eventType: ApiEvent;
  payload: IApiVehicleUpdate | IApiObjectResourceUpdate;
}

export interface IRouteWithData extends Omit<IRouteState, 'vehicle'> {
  vehicle: IVehicleState;
}
