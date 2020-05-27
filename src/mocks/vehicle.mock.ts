import { ApiEvent, IApiVehicleUpdate } from '../app.model';

const progress = [
  { delay: 0, sensorId: 'qeculymv', event: ApiEvent.VEHICLE_UPDATE },
  { delay: 2000, sensorId: 'wytjebmg', event: ApiEvent.VEHICLE_UPDATE },
  { delay: 4000, sensorId: 'etkehdxr', event: ApiEvent.VEHICLE_UPDATE },
  { delay: 1000, sensorId: 'rzmgfdlc', event: ApiEvent.VEHICLE_UPDATE },
  { delay: 2000, sensorId: 'dqwzllxi', event: ApiEvent.VEHICLE_UPDATE },
  { delay: 3000, sensorId: 'sadvcvxl', event: ApiEvent.VEHICLE_UPDATE },
  { delay: 4000, sensorId: undefined, event: ApiEvent.VEHICLE_UPDATE },
  { delay: 4000, sensorId: 'ccomdgqr', event: ApiEvent.VEHICLE_UPDATE },
  { delay: 2000, sensorId: 'lojlicgi', event: ApiEvent.VEHICLE_UPDATE },
  { delay: 3000, sensorId: 'zohcrjma', event: ApiEvent.VEHICLE_UPDATE },
  { delay: 1000, sensorId: 'xlrbndpv', event: ApiEvent.VEHICLE_UPDATE },
  { delay: 1000, sensorId: 'qeculymv', event: ApiEvent.VEHICLE_UPDATE },
];

const wait = (time: number) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(), time);
  });

export class VehicleMock {
  vehicle: IApiVehicleUpdate = {
    Acc_Val_X_RMS: 0,
    Acc_Val_Y_RMS: 0,
    Acc_Val_Z_RMS: 0,
    Ambient_Pressure: 1027,
    Humidity: 80,
    Temp: 28,
    TimeStats: new Date().toString(),
    Timestamp: Date.now(),
    Vel_Val_Magnitude_P2P: 0,
    deviceId: 'trqzbojg',
    rfids: [],
  };

  private stopProcess: boolean = false;

  constructor(private socketIo: any) {}

  stopSimulation(): void {
    this.stopProcess = true;
  }

  startSimulation(): void {
    this.stopProcess = false;
    this.simulateScenario();
  }

  private async simulateScenario() {
    for (let { delay, sensorId, event } of progress) {
      await wait(delay);

      if (this.stopProcess) break;
      this.updateVehicle({ rfids: sensorId ? [sensorId] : [] });
      this.socketIo.emit(event, this.vehicle);
    }
    await wait(4000);

    if (this.stopProcess) return;
    this.startSimulation();
  }

  private updateVehicle(patch: Partial<IApiVehicleUpdate>): void {
    this.vehicle = {
      ...this.vehicle,
      TimeStats: new Date().toString(),
      Timestamp: Date.now(),
      Ambient_Pressure: 1020 + Math.floor(Math.random() * 10),
      Humidity: 80 + Math.floor(Math.random() * 10),
      Temp: 28 + Math.floor(Math.random() * 10),
      ...patch,
    };
  }
}
