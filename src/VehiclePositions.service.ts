import { Dictionary, IPath } from './models/main.model';

interface VehicleEvent {
  tag: string;
  type: string;
  pathId: string;
  sensorId: string;
  event: string;
}

interface VehicleState {
  type: string;
  pathId: string;
  currentProgress: number;
  destinationProgress: number;
}

interface VehicleUpdate {
  pathId: string;
  tag: string;
  type: string;
  progress: number;
}

export class VehiclePositionsService {
  private paths: Dictionary<IPath>;
  private vehicles: Dictionary<VehicleState>;
  private updateFunction: (update: VehicleUpdate) => void;

  constructor(paths: Dictionary<IPath>) {
    this.paths = paths;
    this.vehicles = {};
  }

  onUpdate = (updateFunction: (update: VehicleUpdate) => void) => {
    this.updateFunction = updateFunction;
  };

  handleEvent = (vehicleEvent: VehicleEvent) => {
    if (vehicleEvent.event === 'UPDATE') {
      this.updateVehicle(vehicleEvent);
    }
  };

  start = () => {
    Object.entries(this.vehicles).forEach(([vehicleId, data]) => {
      if (data.currentProgress === data.destinationProgress) return;

      const newProgress = data.currentProgress + 0.001;

      const update = {
        pathId: data.pathId,
        tag: vehicleId,
        type: data.type,
        progress: newProgress < data.destinationProgress ? newProgress : data.destinationProgress,
      };

      this.vehicles[vehicleId].currentProgress = newProgress;

      this.updateFunction(update);
    });

    requestAnimationFrame(this.start);
  };

  private updateVehicle(data: VehicleEvent) {
    const sensorIndex = this.getSensorIndex(data.sensorId, data.pathId);
    const sensorProgress = this.getSensorProgress(sensorIndex, data.pathId);
    const nextSensorProgress = this.getSensorProgress(sensorIndex + 1, data.pathId);

    this.vehicles[data.tag] = {
      type: data.type,
      pathId: data.pathId,
      currentProgress: sensorProgress,
      destinationProgress: nextSensorProgress,
    };
  }

  private getSensorIndex(id: string, pathId: string): number {
    const path = this.paths[pathId];
    const index = path.sensors.findIndex(({ sensorId }) => sensorId === id);

    return index;
  }

  private getSensorProgress(index: number, pathId: string): number {
    const path = this.paths[pathId];
    const distance = path.sensors[index].distance;

    return distance;
  }
}
