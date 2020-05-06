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

export interface Wall {
  start: string // id pointu
  end: string // id pointu
  thickness: number
  meta?: {
    holes: Dictionary<Hole>
  }
}

export interface Sensor {
  point: string // id pointu
  tag?: string
}

export interface RoomObject {
  shapePoints: string[] // id pointów
  height: number
  fromGround?: number
}

export interface Path {
  tag?: string
  points: string[] // id pointów
}

export interface Room {
  walls: string[]
  tag?: string
}

export interface ProductionHall {
  points: Dictionary<Point>
  walls: Dictionary<Wall>
  sensors: Dictionary<Sensor>
  objects: Dictionary<RoomObject>
  path: Dictionary<Path>
  rooms: Dictionary<Room>
}
