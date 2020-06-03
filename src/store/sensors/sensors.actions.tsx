import { action } from 'typesafe-actions';
import { SensorAction } from './sensors.model';

export const SensorsActions = {
  selectSensors: (payload: { [key: string]: boolean }) => action(SensorAction.SELECT_SENSORS, payload),
};
