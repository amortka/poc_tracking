import { Dictionary } from '../app.model';
import { IOrder, OrderStatuses } from '../store/orders/orders.model';

export const ordersMock: Dictionary<IOrder> = {
  sqmygokds3: {
    productName: 'Steel screws',
    vehicleId: 'Simulated',
    amount: 40,
    target: { name: 'L1A', id: 'vbisqysg' },
    status: OrderStatuses.DELIVERED,
  },
  nbtlsmo9oz: {
    productName: 'Metal parts',
    vehicleId: 'Simulated',
    amount: 250,
    target: { name: 'L1A', id: 'vbisqysg' },
    status: OrderStatuses.DELIVERED,
  },
  p11dnequvu: {
    productName: 'Steel screws',
    vehicleId: 'Simulated',
    amount: 40,
    target: { name: 'L3A', id: 'hcgrauti' },
    status: OrderStatuses.ONGOING,
  },
  ef1dl566sb: {
    productName: 'Metal parts',
    vehicleId: 'Simulated',
    amount: 40,
    target: { name: 'L3A', id: 'hcgrauti' },
    status: OrderStatuses.ONGOING,
  },
  v7k2htgo1k: {
    productName: 'Steel screws',
    vehicleId: 'Simulated',
    amount: 40,
    target: { name: 'L3C', id: 'kkshvomj' },
    status: OrderStatuses.ONGOING,
  },
  la43lkvd2n: {
    productName: 'Metal parts',
    vehicleId: 'Simulated',
    amount: 40,
    target: { name: 'L3C', id: 'kkshvomj' },
    status: OrderStatuses.ONGOING,
  },
  qqxyhj3tpp: {
    productName: 'Steel screws',
    vehicleId: 'Simulated',
    amount: 40,
    target: { name: 'L1B', id: 'ycjfzvlk' },
    status: OrderStatuses.ONGOING,
  },
  uwtilkzqzk: {
    productName: 'Metal parts',
    vehicleId: 'Simulated',
    amount: 40,
    target: { name: 'L1B', id: 'ycjfzvlk' },
    status: OrderStatuses.ONGOING,
  },
};
