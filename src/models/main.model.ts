export interface Dictionary<T> {
  [id: string]: T
}

export interface IPoint {
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

export interface IObject {
  shapePoints: string[]
  height: number
  fromGround?: number
  meta?: {
    name?: string
    description?: string
  }
}

export interface IPath {
  tag?: string
  points: string[]
  sensors: Dictionary<{ sensorId: string; distance: number }>
}

export interface IRoom {
  walls: string[]
  tag?: string
}

export interface IVisualization {
  points: Dictionary<IPoint>
  walls: Dictionary<IWall>
  sensors: Dictionary<ISensor>
  objects: Dictionary<IObject>
  paths: Dictionary<IPath>
  rooms: Dictionary<IRoom>
}
