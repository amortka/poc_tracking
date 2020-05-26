import { ApiEvents, IApiVehicleUpdate } from '../../../src/app.model';
import Timeout = NodeJS.Timeout;
import SocketIO from 'socket.io';

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

  private interval: Timeout;

  constructor(private socketIo: SocketIO.Server) {
    this.interval = setInterval(() => this.getApiAndEmit(), 1000);
  }

  clear(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  private getApiAndEmit(): void {
    this.updateVehicle();
    this.socketIo.emit(ApiEvents.VEHICLE_UPDATE, this.vehicle);
  }

  private updateVehicle(): void {
    this.vehicle = { ...this.vehicle, TimeStats: new Date().toString(), Timestamp: Date.now() };
  }
}
