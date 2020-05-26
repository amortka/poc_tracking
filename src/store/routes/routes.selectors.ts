import { AppState } from '../main.store';
import { createSelector } from 'reselect';

export class RoutesSelectors {
  static routes = createSelector(
    (state: AppState) => state.routes,
    (routes) => routes
  );
  static routesIds = createSelector(RoutesSelectors.routes, (routes) => Object.keys(routes));
  static getRoute = (routeId: string) => createSelector(RoutesSelectors.routes, (routes) => routes[routeId]);
}
