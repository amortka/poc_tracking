import { Dictionary } from '../../app.model';
import { ISensorStateMeta } from '../../modules/canvas/canvas.model';

export enum SensorAction {
  SELECT_SENSORS = '@@sensors/SELECT_SENSORS',
}

export interface ISensorState extends ISensorStateMeta {}

export interface ISensorsState extends Dictionary<ISensorState> {}
