import { Dictionary } from '../../app.model';
import { IPathStateMeta } from '../../modules/canvas/canvas.model';

export enum PathAction {
  UPDATE_PATHS = '@@paths/UPDATE_PATHS',
  SELECT_PATHS = '@@paths/SELECT_PATHS',
}
export interface IPathState extends IPathStateMeta {}

export interface IPathsState extends Dictionary<IPathState> {}
