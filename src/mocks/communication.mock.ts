interface MockVehicle {
  tag: string;
  pathId: string;
}

const progress = [
  { delay: 0, sensorId: 'qeculymv', event: 'UPDATE' },
  { delay: 5000, sensorId: 'wytjebmg', event: 'UPDATE' },
  { delay: 5000, sensorId: 'etkehdxr', event: 'UPDATE' },
  { delay: 5000, sensorId: 'rzmgfdlc', event: 'UPDATE' },
  { delay: 5000, sensorId: 'dqwzllxi', event: 'UPDATE' },
  { delay: 5000, sensorId: 'sadvcvxl', event: 'UPDATE' },
  { delay: 5000, sensorId: 'ccomdgqr', event: 'UPDATE' },
  { delay: 5000, sensorId: 'lojlicgi', event: 'UPDATE' },
  { delay: 5000, sensorId: 'zohcrjma', event: 'UPDATE' },
  { delay: 5000, sensorId: 'xlrbndpv', event: 'UPDATE' },
  { delay: 5000, sensorId: 'qeculymv', event: 'UPDATE' },
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

  async simulate(callback) {
    for (let { delay, sensorId, event } of progress) {
      await wait(delay);
      callback({
        ...this.vehicle,
        sensorId,
        event,
      });
    }
  }
}
