import { AppState } from '../main.store';
import { createSelector } from 'reselect';
import { IOrder } from './orders.model';
import { Dictionary } from '../../app.model';
import { RoutesSelectors } from '../routes/routes.selectors';

export class OrdersSelectors {
  // TODO static orders selector
  static getOrdersForVehicleByRouteId = (routeId) =>
    createSelector(
      (state: AppState) => state.orders,
      RoutesSelectors.getRoute(routeId.routeId),
      (orders, route): Dictionary<IOrder> => {
        console.log(route, routeId);
        const vehicleId = route.vehicle;
        return Object.fromEntries(
          Object.entries(orders).filter(([key, order]) => {
            return order.vehicleId === vehicleId;
          })
        );
      }
    );

  static getOrdersForStation = (stationId) =>
    createSelector(
      (state: AppState) => state.orders,
      (orders): Dictionary<IOrder> => {
        return Object.fromEntries(
          Object.entries(orders).filter(([key, order]) => {
            return order.target === stationId;
          })
        );
      }
    );
}
