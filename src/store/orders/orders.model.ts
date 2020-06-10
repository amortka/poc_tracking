import { Dictionary } from '../../app.model';

export enum OrdersAction {
  CLEAR_SELECTED_STATION = '@@orders/CLEAR_SELECTED_STATION',
}

export enum OrderStatuses {
  'DELIVERED',
  'ONGOING',
}

export interface IOrder {
  productName: string;
  vehicleId: string;
  amount: number;
  target: { name: string; id: string };
  status: OrderStatuses;
}

export interface OrdersState {
  list: Dictionary<IOrder>;
  selectedStation: { id: string; name: string };
}
