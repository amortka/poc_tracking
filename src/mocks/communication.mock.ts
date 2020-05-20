import { IVehicleUpdate } from '../models/main.model';

interface MockVehicle {
  id: string;
  pathId: string;
}

const progress = [
  { delay: 0, sensorId: 'qeculymv', event: 'UPDATE' },
  { delay: 2000, sensorId: 'wytjebmg', event: 'UPDATE' },
  { delay: 4000, sensorId: 'etkehdxr', event: 'UPDATE' },
  { delay: 1000, sensorId: 'rzmgfdlc', event: 'UPDATE' },
  { delay: 2000, sensorId: 'dqwzllxi', event: 'UPDATE' },
  { delay: 3000, sensorId: 'sadvcvxl', event: 'UPDATE' },
  { delay: 8000, sensorId: 'ccomdgqr', event: 'UPDATE' },
  { delay: 2000, sensorId: 'lojlicgi', event: 'UPDATE' },
  { delay: 3000, sensorId: 'zohcrjma', event: 'UPDATE' },
  { delay: 1000, sensorId: 'xlrbndpv', event: 'UPDATE' },
];

const wait = (time) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(), time);
  });

export class CommunicationMock {
  vehicle: MockVehicle;

  constructor(vehicle: MockVehicle) {
    this.vehicle = vehicle;
  }

  async simulate(callback: (data: Array<IVehicleUpdate>) => void) {
    for (let { delay, sensorId, event } of progress) {
      await wait(delay);

      const data: IVehicleUpdate = {
        vehicleId: this.vehicle.id,
        pathId: this.vehicle.pathId,
        sensorId: sensorId,
        event: event,
      };

      callback([data]);
    }
  }
}
