import { Dictionary } from '../app.model';
import { IOrder, OrderStatuses } from '../store/orders/orders.model';

export const ordersMock: Dictionary<IOrder> = {
  sqmygokds3: {
    productName: 'Steel screws',
    vehicleId: 'trqzbojg',
    target: 'L1A',
    status: OrderStatuses.DELIVERED,
  },
  nbtlsmo9oz: {
    productName: 'Metal parts',
    vehicleId: 'trqzbojg',
    target: 'L1A',
    status: OrderStatuses.DELIVERED,
  },
  p11dnequvu: {
    productName: 'Steel screws',
    vehicleId: 'trqzbojg',
    target: 'L3A',
    status: OrderStatuses.ONGOING,
  },
  ef1dl566sb: {
    productName: 'Metal parts',
    vehicleId: 'trqzbojg',
    target: 'L3A',
    status: OrderStatuses.ONGOING,
  },
  v7k2htgo1k: {
    productName: 'Steel screws',
    vehicleId: 'trqzbojg',
    target: 'L3C',
    status: OrderStatuses.ONGOING,
  },
  la43lkvd2n: {
    productName: 'Metal parts',
    vehicleId: 'trqzbojg',
    target: 'L3C',
    status: OrderStatuses.ONGOING,
  },
  qqxyhj3tpp: {
    productName: 'Steel screws',
    vehicleId: 'trqzbojg',
    target: 'L1B',
    status: OrderStatuses.ONGOING,
  },
  uwtilkzqzk: {
    productName: 'Metal parts',
    vehicleId: 'trqzbojg',
    target: 'L1B',
    status: OrderStatuses.ONGOING,
  },
};
