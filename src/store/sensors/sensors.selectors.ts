import { AppState } from '../main.store';
import { createSelector } from 'reselect';

export class SensorsSelectors {
  static sensors = createSelector(
    (state: AppState) => state.sensors,
    (sensors) => sensors
  );
  static getSensor = (sensorId: string) => createSelector(SensorsSelectors.sensors, (sensors) => sensors[sensorId]);
}
