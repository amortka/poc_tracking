import { AppState } from '../main.store';
import { createSelector } from 'reselect';
import { IOrder } from './orders.model';
import { Dictionary } from '../../app.model';
import { RoutesSelectors } from '../routes/routes.selectors';

export class OrdersSelectors {
  static getOrdersList = createSelector(
    (state: AppState) => state.orders,
    (orders) => orders.list
  );

  static getOrdersForVehicleByRouteId = (routeId) =>
    createSelector(
      OrdersSelectors.getOrdersList,
      RoutesSelectors.getRoute(routeId),
      (orders, route): Dictionary<IOrder> => {
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
      OrdersSelectors.getOrdersList,
      (orders): Dictionary<IOrder> => {
        return Object.fromEntries(
          Object.entries(orders).filter(([key, order]) => {
            return order.target.id === stationId;
          })
        );
      }
    );

  static getSelectedStation = createSelector(
    (state: AppState) => state.orders,
    (ordersState) => ordersState.selectedStation
  );
}
