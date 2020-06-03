import { autoPlay, Tween } from 'es6-tween';

import { IPath, IRoute } from '../../canvas/canvas.model';
import { IRouteState } from '../../../store/routes/routes.model';
import { IVehicleState } from '../../../store/vehicles/vehicles.model';
import { RoutesSelectors } from '../../../store/routes/routes.selectors';
import { SceneSelectors } from '../../../store/scene/scene.selectors';
import { store } from '../../../store/store.config';
import { VehiclesSelectors } from '../../../store/vehicles/vehicles.selectors';

autoPlay(true);

// Current route length: 27.22m
const vehicleAvgSpeed = 2; // m/s

export class RouteService {
  private readonly path: IPath;
  private readonly route: IRoute;
  private readonly isLoopedPath: boolean;

  private routeState: IRouteState;
  private vehicleState: IVehicleState;

  private nextPredictedSensorIndex: number = 0;

  private subscription: any;

  private tween: typeof Tween;

  constructor(private routeId: string, private setStateCallback: (routeId: string, data: IRoute) => void) {
    const storeState = store.getState();

    this.routeState = RoutesSelectors.getRoute(routeId)(storeState);
    this.path = SceneSelectors.getPath(this.routeState.path)(storeState);
    this.isLoopedPath = this.path.sensors[0].sensorId === this.path.sensors[this.path.sensors.length - 1].sensorId;
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

      const didSensorChanged = this.vehicleState?.currentRfIds[0] !== vehicleState.currentRfIds[0];
      const didVehicleAppearOnSensor = vehicleState.currentRfIds[0] && didSensorChanged;
      const didVehicleDisappearFromSensor = !vehicleState.currentRfIds[0] && didSensorChanged;

      // Case 1 RFID appear
      if (didVehicleAppearOnSensor) {
        this.handleVehicleAppearOnSensor(vehicleState.currentRfIds[0]);
      }

      // Case 2 RFID disappear
      if (didVehicleDisappearFromSensor) {
        this.handleVehicleDisappearFromSensor(this.vehicleState.currentRfIds[0]);
      }

      this.vehicleState = vehicleState;

      if (this.routeState.selected !== this.route.selected) {
        this.route.selected = this.routeState.selected;
        this.setStateCallback(this.routeId, { ...this.route, selected: this.routeState.selected });
      }
    });
  }

  private handleVehicleAppearOnSensor(sensorId: string) {
    const sensorIndex = this.getSensorIndex(sensorId, this.path);
    const nextSensorIndex = sensorIndex + 1;
    const sensorProgress = this.getSensorProgress(sensorIndex, this.path);

    const nextSensorProgress = this.getSensorProgress(nextSensorIndex, this.path);
    const timeBetweenSensors = this.getTimeForProgress(nextSensorProgress - sensorProgress, this.path);

    const didVehicleAppearOnPredictedSensor = sensorIndex === this.nextPredictedSensorIndex;
    const isVehiclePresent = Boolean(this.tween);

    // Case 1 If vehicle not present then display it
    // Case 2 If vehicle appear on non predicted RFID then "teleport" it to that position
    if (!isVehiclePresent || !didVehicleAppearOnPredictedSensor) {
      this.tween = new Tween({ progress: sensorProgress })
        .to({ progress: nextSensorProgress }, timeBetweenSensors)
        .on('update', ({ progress }) => this.emitRouteUpdate(progress));

      this.emitRouteUpdate(sensorProgress);
      return;
    }

    // Case 3 If vehicle appear on predicted RFID but without disappear from the last one
    // TODO
    // Resolved: updating nextPredictedSensorIndex only when disappear from sensor (cannot appear on predicted without disappear from initial)

    // Case 4 If vehicle appear in next predicted RFID then update animation destination (but left actual position)
    // TODO How it should behave when actual position is more than one sensor behind actual sensor
    //   and when position is ahead of the actual sensor
  }

  private handleVehicleDisappearFromSensor(prevSensorId: string) {
    // Case 1 If route not in loop and vehicle disappear from last sensor
    // TODO

    // Case 2 If route in loop and vehicle disappear from the any sensor
    const sensorIndex = this.getSensorIndex(prevSensorId, this.path);
    const nextSensorIndex = sensorIndex + 1;
    const nextSensorProgress = this.getSensorProgress(nextSensorIndex, this.path);
    const currentProgress = this.tween.object.progress;

    const progressDiff = nextSensorProgress - (currentProgress % 1);
    const timeBetweenSensors = this.getTimeForProgress(progressDiff, this.path);

    this.tween.stop();
    this.tween = new Tween(this.tween.object);
    this.tween
      .to({ progress: currentProgress + progressDiff }, timeBetweenSensors)
      .on('update', ({ progress }) => this.emitRouteUpdate(progress % 1));

    this.tween.start();

    this.nextPredictedSensorIndex = nextSensorIndex;
  }

  private getSensorIndex(id: string, path: IPath): number {
    return path.sensors.findIndex(({ sensorId }) => sensorId === id);
  }
  private getSensorProgress(index: number, path: IPath): number {
    return path.sensors[index]?.distance;
  }

  private getTimeForProgress(progress: number, path: IPath): number {
    const time = (path.length * progress) / vehicleAvgSpeed;

    // Return milliseconds
    return time * 1000;
  }

  private emitRouteUpdate(progress: number) {
    this.route.progress = progress;
    this.setStateCallback(this.routeId, { ...this.route });
  }
}
