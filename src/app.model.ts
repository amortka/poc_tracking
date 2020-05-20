import { EventType, ObjectType, VisualizationType } from './modules/canvas/canvas.model';
import { MouseEventContextObject } from './modules/canvas/contexts/MouseEventsContext';

export interface Dictionary<T> {
  [id: string]: T;
}

export interface IPoint {
  x: number;
  y: number;
}

export enum WallCorner {
  START = 'start',
  END = 'end',
}

export interface IMouseEventPayload {
  object: MouseEventContextObject;
  objectType: ObjectType;
  type: EventType;
}

/**
 * IVisualizationScene
 */

export interface Hole {
  start: number;
  width: number;
  height: number;
  fromGround?: number;
}

export interface IWall {
  start: string;
  end: string;
  thickness: number;
  meta?: {
    holes: Dictionary<Hole>;
  };
}

export interface ISensor {
  point: string;
  tag?: string;
}

export interface IObject {
  shapePoints: string[];
  height?: number;
  fromGround?: number;
  meta?: {
    name?: string;
    type?: VisualizationType;
    description?: string;
  };
}

export interface IPath {
  tag?: string;
  points: string[];
  sensors: Array<{ sensorId: string; distance: number }>;
}

export interface IRoom {
  walls: string[];
  tag?: string;
}

export interface IVisualizationScene {
  points: Dictionary<IPoint>;
  walls: Dictionary<IWall>;
  sensors: Dictionary<ISensor>;
  objects: Dictionary<IObject>;
  paths: Dictionary<IPath>;
  rooms: Dictionary<IRoom>;
}

/**
 * IVisualizationState
 */

export interface VehicleAnimation {
  tag: string;
  type: string;
  pathId: string;
  progress: number;
}

export interface IVehicle {
  tag: string;
  dimensions: { x: number; y: number; z: number };
  segments: number;
}

export interface IRoute {
  vehicle: string; // id vehicle
  path: string; // id path
  progress: number; // range 0-1
  selected: boolean;
}

export interface IVisualizationState {
  vehicles: Dictionary<IVehicle>;
  routes: Dictionary<IRoute>;
  selection: ISelection;
}

/**
 * Selection
 */
export interface ISelectionData {
  objectType: ObjectType;
  coordinates: IPoint;
  title: string;
  description: string;
}

export type ISelection = {
  [ObjectType.VEHICLE]?: string[];
  [ObjectType.OBJECT]?: string[];
  [ObjectType.SENSOR]?: string[];
};

/**
 * Communication
 */

export interface IVehicleUpdate {
  vehicleId: string;
  pathId: string;
  sensorId: string;
  event: string;
}
