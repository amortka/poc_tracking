import { ObjectType } from '../modules/three/contexts/EventsContext';

export interface Dictionary<T> {
  [id: string]: T;
}

export interface IPoint {
  x: number;
  y: number;
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
  height: number;
  fromGround?: number;
  meta?: {
    name?: string;
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
 * IVisualisationState
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
  path: string; // id vehicle
  progress: number; // range 0-1
  selected: boolean;
}

export interface IVisualisationState {
  vehicles: Dictionary<IVehicle>;
  routes: Dictionary<IRoute>;
  // TODO: add selections (showing tooltips e.g sensors)
}

/**
 * Selection
 */

export interface ISelectionTooltip {
  objectType: ObjectType;
  coordinates: IPoint;
  title: string;
  description: string;
}

export interface ISelection {
  vehicles: string[]; // array of vehicle ids
  sensors: string[]; // array of sensor ids
}

export interface ISelectionData {
  vehicles: Dictionary<ISelectionTooltip>;
  sensors: Dictionary<ISelectionTooltip>;
}
