import { IWallWithPointsCoordinates } from '../canvas.model'
import { Dictionary, IPoint, IWall } from '../../../models/main.model'

export class StateUtils {
  static getWallsDataFromConfig(walls: Dictionary<IWall>, points: Dictionary<IPoint>): IWallWithPointsCoordinates[] {
    return Object.values(walls).map(
      (w) => ({ ...walls, start: points[w.start], end: points[w.end] } as IWallWithPointsCoordinates)
    )
  }
}
