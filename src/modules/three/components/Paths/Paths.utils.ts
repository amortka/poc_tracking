import { Dictionary, IPath, IPoint } from '../../../../models/main.model';
import { IPathWithPointsCoordinates } from '../../canvas.model';

export class PathsUtils {
  static getPathWithCoordinates(paths: Dictionary<IPath>, points: Dictionary<IPoint>): IPathWithPointsCoordinates[] {
    return Object.values(paths).map((p) => ({ ...p, points: p.points.map((p) => points[p]) })) || [];
  }
}
