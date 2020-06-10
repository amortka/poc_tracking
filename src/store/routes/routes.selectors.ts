import { createSelector } from 'reselect';

import { AppState } from '../main.store';
import { Dictionary, IRouteWithData } from '../../app.model';
import { VehiclesSelectors } from '../vehicles/vehicles.selectors';
import { IRouteState } from './routes.model';
import { AreasSelectors } from '../areas/areas.selectors';

export class RoutesSelectors {
  static routes = createSelector(
    (state: AppState) => state.routes,
    (routes) => routes
  );

  static routesIds = createSelector(RoutesSelectors.routes, (routes) => Object.keys(routes));

  static getRoute = (routeId: string) => createSelector(RoutesSelectors.routes, (routes) => routes[routeId]);

  static getRoutesInArea = (areaId: string) =>
    createSelector(RoutesSelectors.routes, AreasSelectors.getArea(areaId), (routes, area) => {
      if (!area) return [];
      return Object.entries(routes).filter(([rId, rData]) => area.vehiclesId.indexOf(rData.vehicle) !== -1);
    });

  static getRoutesWithData = createSelector(
    RoutesSelectors.routes,
    VehiclesSelectors.vehicles,
    (routes, vehicles): Dictionary<IRouteWithData> => {
      const routesWidthData: Dictionary<IRouteWithData> = {};
      for (const routeId in routes) {
        const { vehicle: vehicleId, ...other } = routes[routeId];
        routesWidthData[routeId] = { ...other, vehicle: null };
        routesWidthData[routeId].vehicle = vehicles[routes[routeId].vehicle];
      }
      return routesWidthData;
    }
  );

  static getFirstSelectedRouteEntry = createSelector(RoutesSelectors.getRoutesWithData, (routes): {
    routeId: string;
    data: IRouteWithData;
  } => {
    const selectedRouteEntry = Object.entries(routes).find(([routeId, route]) => route.selected);
    return selectedRouteEntry
      ? { routeId: selectedRouteEntry[0], data: selectedRouteEntry[1] }
      : { routeId: null, data: null };
  });

  static getFirstSelectedRouteStateEntry = createSelector(RoutesSelectors.routes, (routes): {
    routeId: string;
    data: IRouteState;
  } => {
    const selectedRouteEntry = Object.entries(routes).find(([routeId, route]) => route.selected);
    return selectedRouteEntry
      ? { routeId: selectedRouteEntry[0], data: selectedRouteEntry[1] }
      : { routeId: null, data: null };
  });
}
