import { CartItemProps } from '../modules/ui/components/CartItem/CartItem';

export const cartsMock: CartItemProps[] = [
  {
    name: 'Mocked POI',
    time: '9:12',
    color: '#41E8D7',
    wagons: [
      { id: 'nsef4hy9nr', isLoaded: true },
      { id: '04stobtp2e', isLoaded: true },
      { id: 'qw5juql112', isLoaded: true },
      { id: 'o9nlemcjii', isLoaded: false },
    ],
  },
  {
    name: 'Mocked GHI',
    time: '2:00',
    color: '#11B573',
    wagons: [
      { id: 'evie1gbtfc', isLoaded: true },
      { id: '0fb1ugjkg8', isLoaded: true },
      { id: '0buzz87zek', isLoaded: true },
    ],
  },
  {
    name: 'Mocked MNB',
    time: '16:34',
    color: '#E9842C',
    wagons: [
      { id: 'ewhjqn9epr', isLoaded: true },
      { id: '7qozosm2fx', isLoaded: false },
    ],
  },
  {
    name: 'Milkrun MBC',
    time: '2:30',
    color: '#493B2F',
    wagons: [
      { id: '9z2nz8shge', isLoaded: true },
      { id: 'l3zb4tvvjs', isLoaded: false },
    ],
  },
  {
    name: 'Milkrun RYA',
    time: '9:24',
    color: '#41E8D7',
    wagons: [
      { id: 'ox1wv80ihz', isLoaded: true },
      { id: 'xreo13ycsf', isLoaded: true },
    ],
  },
  {
    name: 'Milkrun SDA',
    time: '34:12',
    color: '#A853D8',
    wagons: [{ id: 'pbd8yv7xc3', isLoaded: true }],
  },
];

export const ordersMock = [
  {
    id: '9643200322',
    product: 'Steel screws',
    pickUpPoint: 'L1A',
    isDelivered: true,
  },
  {
    id: '7005300322',
    product: 'Metal parts',
    pickUpPoint: 'L1A',
    isDelivered: true,
  },
  {
    id: '9643200322',
    product: 'Steel screws',
    pickUpPoint: 'L3A',
    isDelivered: false,
  },
  {
    id: '7005300322',
    product: 'Metal parts',
    pickUpPoint: 'L3A',
    isDelivered: false,
  },
  {
    id: '9643200322',
    product: 'Steel screws',
    pickUpPoint: 'L3C',
    isDelivered: false,
  },
  {
    id: '7005300322',
    product: 'Metal parts',
    pickUpPoint: 'L3C',
    isDelivered: false,
  },
  {
    id: '9643200322',
    product: 'Steel screws',
    pickUpPoint: 'L1B',
    isDelivered: false,
  },
  {
    id: '7005300322',
    product: 'Metal parts',
    pickUpPoint: 'L1B',
    isDelivered: false,
  },
];
