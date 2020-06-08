import { Dictionary } from '../../app.model';
import { BackgroundProperty } from 'csstype';
import { Color as ThreeColor, Vector2 } from 'three';

/**
 * Canvas View
 */
export enum VisualizationType {
  D2 = 'D2',
  D3 = 'D3',
}

export type Color = ThreeColor | number | string;

export interface ICanvasTheme {
  canvasBackground: BackgroundProperty<any>;
  text: {
    color?: Color;
  };
  floor: {
    D2?: Color;
    D3?: Color;
  };
  sensor: {
    circleRadius: number;
  };
  walls: {
    D2?: { line?: Color };
    D3?: Color;
  };
  objects: {
    D2?: {
      line?: Color;
      shape?: Color;
      text?: Color;
      textSelected?: Color;
      indicatorBackground?: Color;
      indicatorMaxColor?: Color;
      indicatorMinColor?: Color;
      indicatorMidColor?: Color;
    };
  };
  paths: {
    dashScale?: number;
    dashSize?: number;
    gapSize?: number;
    line?: Color;
    selectedLine?: Color;
  };
  routes: {
    dashScale?: number;
    dashSize?: number;
    gapSize?: number;
    line?: Color;
    lineWidth?: number;
  };
}

/**
 * IVisualizationScene
 */

export enum TextSize {
  SMALL = 0.12,
  MEDIUM = 0.2,
  LARGE = 0.25,
}

export enum BorderType {
  SOLID = 'solid',
  DASHED = 'dashed',
}

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
  meta: {
    holes?: Dictionary<Hole>;
  };
}

export interface ISensor {
  point: string;
  tag?: string;
  meta: {
    selected?: boolean;
    selectable?: boolean;
    hidden?: boolean;
  };
}

export interface IObject {
  shapePoints: string[];
  height?: number;
  fromGround?: number;
  meta: {
    name?: string;
    description?: string;
    textSize?: TextSize;
    textRotation?: number;
    borderType?: BorderType;
    selectable?: boolean;
  };
}

export interface IPath {
  tag?: string;
  points: string[];
  sensors: Array<{ sensorId: string; distance: number; relationHidden?: boolean }>;
  objects: Array<{ objectId: string; distance: number }>;
  length: number;
}

export interface IRoom {
  walls: string[];
  tag?: string;
}

export interface IPoint {
  x: number;
  y: number;
}

export interface IVisualizationScene {
  points: Dictionary<IPoint>;
  walls: Dictionary<IWall>;
  sensors: Dictionary<ISensor>;
  objects: Dictionary<IObject>;
  paths: Dictionary<IPath>;
}

/**
 * IVisualizationState
 */

export type MouseEventContextObject =
  | { id: string; tag: string } // for Sensors
  | { id: string; meta: Pick<IObjectWithPointsCoordinates, 'meta'> };

export interface IVehicle {
  tag: string;
  dimensions: { x: number; y: number; z: number };
  segments: number;
  velocity: number;
  temperature: number;
  humidity: number;
  ambientPressure: number;
}

export interface IRoute {
  tag?: string;
  vehicle: string; // id vehicle
  path: string; // id path
  progress: number; // range 0-1
  selected: boolean;
  color: Color;
}

export interface IObjectStateMeta {
  color?: Color;
  resourceIndicator?: number; // 0-1
  selected?: boolean;
  visibleResourceIndicator?: boolean;
}

export interface IPathStateMeta {
  selected?: boolean;
  color?: Color;
}

export interface ISensorStateMeta {
  selected?: boolean;
  color?: Color;
}

export interface IRouteWithComputedData extends Omit<IRoute, 'vehicle' | 'path'> {
  vehicle: IVehicle;
  points: Vector2[];
}

export interface IVisualizationState {
  isD3: boolean;
  objects: Dictionary<IObjectStateMeta>;
  paths: Dictionary<IPathStateMeta>;
  routes: Dictionary<IRoute>;
  selection: ISelection;
  sensors: Dictionary<ISensorStateMeta>;
  vehicles: Dictionary<IVehicle>;
}

/**
 * Selection
 */

export interface IMouseEventPayload {
  object: MouseEventContextObject;
  objectType: ObjectType;
  type: EventType;
}

export enum EventType {
  MOUSE_IN = 'pointerin',
  MOUSE_OUT = 'pointerout',
  MOUSE_CLICK = 'click',
}

export enum ObjectType {
  OBJECT = 'OBJECT',
  PATH = 'PATH',
  SENSOR = 'SENSOR',
  WALL = 'WALL',
  VEHICLE = 'VEHICLE',
}

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
 * Other
 */

export enum WallCorner {
  START = 'start',
  END = 'end',
}

export interface IWallWithPointsCoordinates extends Omit<IWall, 'start' | 'end'> {
  start: IPoint;
  end: IPoint;
}

export interface IObjectWithPointsCoordinates extends Omit<IObject, 'shapePoints'> {
  id: string;
  shapePoints: IPoint[];
}

export interface IPathWithPointsCoordinates extends Omit<IPath, 'points'> {
  points: IPoint[];
}
