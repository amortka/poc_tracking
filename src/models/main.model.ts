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
  start: string // id pointu
  end: string // id pointu
  thickness: number
  meta?: {
    holes: Dictionary<Hole>
  }
}

export interface ISensor {
  point: string // id pointu
  tag?: string
}

export interface IRoomObject {
  shapePoints: string[] // id pointów
  height: number
  fromGround?: number
}

export interface IPath {
  tag?: string
  points: string[] // id pointów
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
  path: Dictionary<IPath>
  rooms: Dictionary<IRoom>
}
