import { Dictionary, IObject, IPoint } from '../../../../models/main.model'
import { IObjectWithPointsCoordinates } from '../../canvas.model'

export class ObjectsUtils {
  static getObjectsWithCoordinates(
    objects: Dictionary<IObject>,
    points: Dictionary<IPoint>
  ): IObjectWithPointsCoordinates[] {
    return Object.values(objects).map((o) => ({ ...o, shapePoints: o.shapePoints.map((p) => points[p]) })) || []
  }
}
