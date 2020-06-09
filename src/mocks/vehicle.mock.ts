import { ApiEvent, IApiVehicleUpdate } from '../app.model';
import { ObjectResourceMock } from './object-resource.mock';

const progress = [
  { delay: 0, sensorId: 'pnxwxnpk', event: ApiEvent.VEHICLE_UPDATE },
  { delay: 1000, sensorId: undefined, event: ApiEvent.VEHICLE_UPDATE },

  { delay: 1000, sensorId: undefined, event: ApiEvent.VEHICLE_UPDATE },
  { delay: 1000, sensorId: undefined, event: ApiEvent.VEHICLE_UPDATE },
  { delay: 1000, sensorId: undefined, event: ApiEvent.VEHICLE_UPDATE },
  { delay: 1000, sensorId: undefined, event: ApiEvent.VEHICLE_UPDATE },
  { delay: 1000, sensorId: undefined, event: ApiEvent.VEHICLE_UPDATE },
  { delay: 1000, sensorId: undefined, event: ApiEvent.VEHICLE_UPDATE },
  { delay: 1000, sensorId: 'saruefli', event: ApiEvent.VEHICLE_UPDATE, objectId: 'vbisqysg' },
  { delay: 3000, sensorId: undefined, event: ApiEvent.VEHICLE_UPDATE },

  { delay: 1000, sensorId: 'piunnkuf', event: ApiEvent.VEHICLE_UPDATE },
  { delay: 1000, sensorId: undefined, event: ApiEvent.VEHICLE_UPDATE },

  { delay: 1000, sensorId: undefined, event: ApiEvent.VEHICLE_UPDATE },
  { delay: 1000, sensorId: undefined, event: ApiEvent.VEHICLE_UPDATE },
  { delay: 1000, sensorId: 'izktgqna', event: ApiEvent.VEHICLE_UPDATE, objectId: 'hcgrauti' },
  { delay: 3000, sensorId: undefined, event: ApiEvent.VEHICLE_UPDATE },

  { delay: 1000, sensorId: undefined, event: ApiEvent.VEHICLE_UPDATE },
  { delay: 1000, sensorId: 'xzfsgxxh', event: ApiEvent.VEHICLE_UPDATE },
  { delay: 1000, sensorId: undefined, event: ApiEvent.VEHICLE_UPDATE },

  { delay: 1000, sensorId: undefined, event: ApiEvent.VEHICLE_UPDATE },
  { delay: 1000, sensorId: undefined, event: ApiEvent.VEHICLE_UPDATE },
  { delay: 1000, sensorId: undefined, event: ApiEvent.VEHICLE_UPDATE },
  { delay: 1000, sensorId: undefined, event: ApiEvent.VEHICLE_UPDATE },
  { delay: 1000, sensorId: undefined, event: ApiEvent.VEHICLE_UPDATE },
  { delay: 1000, sensorId: 'qwbmjtmf', event: ApiEvent.VEHICLE_UPDATE, objectId: 'kkshvomj' },
  { delay: 3000, sensorId: undefined, event: ApiEvent.VEHICLE_UPDATE },

  { delay: 1000, sensorId: 'quqklxup', event: ApiEvent.VEHICLE_UPDATE },
  { delay: 1000, sensorId: undefined, event: ApiEvent.VEHICLE_UPDATE },

  { delay: 1000, sensorId: undefined, event: ApiEvent.VEHICLE_UPDATE },
  { delay: 1000, sensorId: undefined, event: ApiEvent.VEHICLE_UPDATE },
  { delay: 1000, sensorId: 'zapgjpha', event: ApiEvent.VEHICLE_UPDATE, objectId: 'ycjfzvlk' },
  { delay: 3000, sensorId: undefined, event: ApiEvent.VEHICLE_UPDATE },

  { delay: 1000, sensorId: undefined, event: ApiEvent.VEHICLE_UPDATE },
  { delay: 1000, sensorId: undefined, event: ApiEvent.VEHICLE_UPDATE },
  { delay: 1000, sensorId: undefined, event: ApiEvent.VEHICLE_UPDATE },
  { delay: 1000, sensorId: 'jpgsbunl', event: ApiEvent.VEHICLE_UPDATE },
  { delay: 1000, sensorId: undefined, event: ApiEvent.VEHICLE_UPDATE },

  { delay: 1000, sensorId: undefined, event: ApiEvent.VEHICLE_UPDATE },
  { delay: 1000, sensorId: undefined, event: ApiEvent.VEHICLE_UPDATE },
  { delay: 1000, sensorId: 'pnxwxnpk', event: ApiEvent.VEHICLE_UPDATE },
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
    deviceId: 'Simulated',
    rfids: [],
  };

  private stopProcess: boolean = false;

  constructor(private socketIo: any, private objectResourceMock: ObjectResourceMock) {}

  stopSimulation(): void {
    this.stopProcess = true;
  }

  startSimulation(): void {
    this.stopProcess = false;
    this.simulateScenario();
  }

  private async simulateScenario() {
    for (let { delay, sensorId, event, objectId } of progress) {
      await wait(delay);

      if (this.stopProcess) break;
      this.updateVehicle({ rfids: sensorId ? [sensorId] : [] });
      this.socketIo.emit(event, this.vehicle);
      if (objectId) {
        this.objectResourceMock.objects.find((o) => o.objectId === objectId).resourceIndicator = 1;
      }
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
