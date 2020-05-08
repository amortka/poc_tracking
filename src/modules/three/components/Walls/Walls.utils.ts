import { Dictionary, IPoint, IWall } from '../../../../models/main.model'
import { IWallWithPointsCoordinates } from '../../canvas.model'

export class WallsUtils {
  static getWallsWithCoordinates(walls: Dictionary<IWall>, points: Dictionary<IPoint>): IWallWithPointsCoordinates[] {
    return (
      Object.values(walls).map(
        (w) => ({ ...w, start: points[w.start], end: points[w.end] } as IWallWithPointsCoordinates)
      ) || []
    )
  }
}
