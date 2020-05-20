import { AppState } from '../main.store';
import { createSelector } from 'reselect';

export class RoutesSelectors {
  static routes = createSelector(
    (state: AppState) => state.routes,
    (routes) => routes
  );
  static getRoute = (routeId: string) => createSelector(RoutesSelectors.routes, (routes) => routes[routeId]);
}
