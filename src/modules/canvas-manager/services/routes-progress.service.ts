import { autoPlay, Tween } from 'es6-tween';

import { IPath, IRoute } from '../../canvas/canvas.model';
import { IRouteState } from '../../../store/routes/routes.model';
import { IVehicleState } from '../../../store/vehicles/vehicles.model';
import { RoutesSelectors } from '../../../store/routes/routes.selectors';
import { SceneSelectors } from '../../../store/scene/scene.selectors';
import { store } from '../../../store/store.config';
import { VehiclesSelectors } from '../../../store/vehicles/vehicles.selectors';

autoPlay(true);

export class RouteService {
  private readonly path: IPath;
  private readonly route: IRoute;

  private routeState: IRouteState;
  private vehicleState: IVehicleState;

  private subscription: any;

  private tween: typeof Tween;

  constructor(private routeId: string, private setStateCallback: (routeId: string, data: IRoute) => void) {
    const storeState = store.getState();

    this.routeState = RoutesSelectors.getRoute(routeId)(storeState);
    this.path = SceneSelectors.getPath(this.routeState.path)(storeState);
    this.route = { ...this.routeState, progress: 0 };

    this.handleStoreStateChanges();
  }

  clear() {
    this.subscription();
  }

  private handleStoreStateChanges() {
    this.subscription = store.subscribe(() => {
      const storeState = store.getState();
      this.routeState = RoutesSelectors.getRoute(this.routeId)(storeState);
      const vehicleState = VehiclesSelectors.getVehicle(this.routeState.vehicle)(storeState);

      if (this.vehicleState?.lastUpdateTime !== vehicleState.lastUpdateTime) {
        this.vehicleState = vehicleState;
        this.updateProgress();
      }

      if (this.routeState.selected !== this.route.selected) {
        this.setStateCallback(this.routeId, { ...this.route, selected: this.routeState.selected });
      }
    });
  }

  private updateProgress() {
    const sensorIndex = this.getSensorIndex(this.vehicleState.currentRfIds[0], this.path);
    const sensorProgress = this.getSensorProgress(sensorIndex, this.path);
    const nextSensorProgress = this.getSensorProgress(sensorIndex + 1, this.path);
    const timeBetweenSensors = this.getTimeBetweenSensors(sensorIndex, sensorIndex + 1, this.path);

    if (!this.tween) {
      this.tween = new Tween({ progress: sensorProgress });
    } else {
      this.tween.stop();
      this.tween = new Tween(this.tween.object);
    }

    this.tween
      .to({ progress: nextSensorProgress }, timeBetweenSensors)
      .on('update', ({ progress }) => this.emitRouteUpdate(progress));

    this.tween.start();
  }

  private getSensorIndex(id: string, path: IPath): number {
    return path.sensors.findIndex(({ sensorId }) => sensorId === id);
  }
  private getSensorProgress(index: number, path: IPath): number {
    return path.sensors[index]?.distance;
  }

  // TODO: check if this should be removed
  private getTimeBetweenSensors(sensorIndex: number, nextSensorIndex: number, path: IPath): number {
    return 4000;
  }

  private emitRouteUpdate(progress: number) {
    this.route.progress = progress;
    this.setStateCallback(this.routeId, { ...this.route });
  }
}
