import { Dictionary, IPath, IPoint, IRoute, IVehicle } from '../../../../models/main.model';
import { IPathWithPointsCoordinates, IRouteWithComputedData } from '../../canvas.model';
import { PathsUtils } from '../Paths/paths.utils';

export class RoutesUtils {
  static getRouteWithComputedData(
    paths: Dictionary<IPath>,
    points: Dictionary<IPoint>,
    vehicles: Dictionary<IVehicle>,
    routes: Dictionary<IRoute>
  ): IRouteWithComputedData[] {
    return (
      Object.values(routes).map(
        (r): IRouteWithComputedData => {
          const path: IPathWithPointsCoordinates = PathsUtils.setCoordinatesToPathPoints(paths[r.path], points);
          const vehicle: IVehicle = vehicles[r.vehicle];

          return {
            path,
            vehicle,
            progress: r.progress,
            selected: r.selected,
          };
        }
      ) || []
    );
  }
}
