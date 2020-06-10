import { action } from 'typesafe-actions';
import { OrdersAction } from './orders.model';

export const ordersActions = {
  clearSelectedStation: () => action(OrdersAction.CLEAR_SELECTED_STATION),
};
