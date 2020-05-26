import { AppState } from '../main.store';
import { createSelector } from 'reselect';
import { IRouteWithData } from '../../app.model';
import { VehiclesSelectors } from '../vehicles/vehicles.selectors';
import { SceneSelectors } from '../scene/scene.selectors';
import { IPath } from '../../modules/canvas/canvas.model';

export class RoutesSelectors {
  static routes = createSelector(
    (state: AppState) => state.routes,
    (routes) => routes
  );
  static routesIds = createSelector(RoutesSelectors.routes, (routes) => Object.keys(routes));
  static getRoute = (routeId: string) => createSelector(RoutesSelectors.routes, (routes) => routes[routeId]);
}
