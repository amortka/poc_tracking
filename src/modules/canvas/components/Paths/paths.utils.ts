import { Dictionary } from '../../../../app.model';
import { IPath, IPathWithPointsCoordinates, IPoint } from '../../canvas.model';

export class PathsUtils {
  static getPathWithCoordinates(paths: Dictionary<IPath>, points: Dictionary<IPoint>): IPathWithPointsCoordinates[] {
    return Object.values(paths).map((p) => this.setCoordinatesToPathPoints(p, points)) || [];
  }

  static setCoordinatesToPathPoints(path: IPath, points: Dictionary<IPoint>): IPathWithPointsCoordinates {
    return { ...path, points: path.points.map((p) => points[p]) };
  }
}
