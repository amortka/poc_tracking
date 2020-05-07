import { IPoint, IWall } from '../../models/main.model'

export interface IWallWithPointsCoordinates extends Omit<IWall, 'start' | 'end'> {
  start: IPoint
  end: IPoint
}

export interface IWallWithAdditionalData extends Omit<IWall, 'start' | 'end'> {
  start: IPoint
  end: IPoint
  startNeighborWalls: IWallWithPointsCoordinates
  endNeighborWalls: IWallWithPointsCoordinates
}
