import { Dictionary } from '../../app.model';

export enum OrdersAction {}

export enum OrderStatuses {
  'DELIVERED',
  'ONGOING',
}

export interface IOrder {
  productName: string;
  vehicleId: string;
  target: string;
  status: OrderStatuses;
}

export interface OrdersState extends Dictionary<IOrder> {}
