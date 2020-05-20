import shortid from 'shortid';
import { Tween, autoPlay } from 'es6-tween';
import { IPath, Dictionary, IVehicleUpdate } from './models/main.model';

autoPlay(true);

export interface RouteUpdate {
  routeId: string;
  pathId: string;
  tag: string;
  type: string;
  progress: number;
}

interface RouteState {
  vehicleId: string;
  pathId: string;
  currentProgress: number;
  destinationProgress: number;
  tween?: any;
}

export class RoutesProgressService {
  routes: Dictionary<RouteState> = {};
  paths: Dictionary<IPath> = {};
  // TODO probably to remove
  vehicleRouteMap: { [vehicleId: string]: string } = {};

  handleUpdate: (data: RouteUpdate) => void = () => {};

  constructor(paths: Dictionary<IPath>) {
    this.paths = paths;
  }

  onProgressUpdate = (handleUpdate: (data: RouteUpdate) => void) => {
    this.handleUpdate = handleUpdate;
  };

  handleVehicleUpdate = (vehicles: Array<IVehicleUpdate>) => {
    vehicles.forEach((vehicle) => {
      if (vehicle.event === 'UPDATE') {
        const routeId = this.vehicleRouteMap[vehicle.vehicleId];

        if (routeId) {
          this.updateRoute(routeId, vehicle);
        } else {
          this.createRoute(vehicle);
        }
      }
    });
  };

  private createRoute(vehicleUpdate: IVehicleUpdate) {
    const sensorIndex = this.getSensorIndex(vehicleUpdate.sensorId, vehicleUpdate.pathId);
    const sensorProgress = this.getSensorProgress(sensorIndex, vehicleUpdate.pathId);
    const nextSensorProgress = this.getSensorProgress(sensorIndex + 1, vehicleUpdate.pathId);
    const timeBetweenSensors = this.getTimeBetweenSensors(sensorIndex, sensorIndex + 1, vehicleUpdate.pathId);

    const routeId = shortid.generate();

    const tween = new Tween({ progress: sensorProgress })
      .to({ progress: nextSensorProgress }, timeBetweenSensors)
      .on('update', ({ progress }) => this.emitRouteUpdate(progress, routeId));

    this.vehicleRouteMap[vehicleUpdate.vehicleId] = routeId;
    this.routes[routeId] = {
      vehicleId: vehicleUpdate.vehicleId,
      pathId: vehicleUpdate.pathId,
      currentProgress: sensorProgress,
      destinationProgress: nextSensorProgress,
      tween,
    };

    tween.start();
  }

  private updateRoute(routeId: string, vehicleUpdate: IVehicleUpdate) {
    const sensorIndex = this.getSensorIndex(vehicleUpdate.sensorId, vehicleUpdate.pathId);
    const nextSensorProgress = this.getSensorProgress(sensorIndex + 1, vehicleUpdate.pathId);
    const timeBetweenSensors = this.getTimeBetweenSensors(sensorIndex, sensorIndex + 1, vehicleUpdate.pathId);

    const route = this.routes[routeId];
    // debugger
    route.tween.stop();
    const tween = new Tween(route.tween.object)
      .to({ progress: nextSensorProgress }, timeBetweenSensors)
      .on('update', ({ progress }) => this.emitRouteUpdate(progress, routeId));
    route.tween = tween;

    this.routes[routeId] = {
      ...route,
      destinationProgress: nextSensorProgress,
    };

    route.tween.start();
  }

  private emitRouteUpdate(progress: number, routeId: string) {
    const routeData = this.routes[routeId];
    const data: RouteUpdate = {
      routeId: routeId,
      pathId: routeData.pathId,
      tag: routeData.vehicleId,
      type: 'sth',
      progress: progress,
    };

    this.handleUpdate(data);
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

  private getTimeBetweenSensors(sensorIndex: number, nextSensorIndex: number, pathId: string): number {
    return 4000;
  }
}
