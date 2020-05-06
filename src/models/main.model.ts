export interface Dictionary<T> {
  [id: string]: T
}

export interface Point {
  x: number
  y: number
}

export interface Hole {
  start: number
  width: number
  height: number
  fromGround?: number
}

export interface IWall {
  start: string
  end: string
  thickness: number
  meta?: {
    holes: Dictionary<Hole>
  }
}

export interface ISensor {
  point: string
  tag?: string
}

export interface IRoomObject {
  shapePoints: string[]
  height: number
  fromGround?: number
}

export interface IPath {
  tag?: string
  points: string[]
}

export interface IRoom {
  walls: string[]
  tag?: string
}

export interface Visualisation {
  points: Dictionary<Point>
  walls: Dictionary<IWall>
  sensors: Dictionary<ISensor>
  objects: Dictionary<IRoomObject>
  paths: Dictionary<IPath>
  rooms: Dictionary<IRoom>
}
