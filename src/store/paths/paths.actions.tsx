import { action } from 'typesafe-actions';
import { IPathsState, PathAction } from './paths.model';

import { Color } from '../../modules/canvas/canvas.model';

export const PathsActions = {
  updatePaths: (payload: IPathsState) => action(PathAction.UPDATE_PATHS, payload),
  selectPaths: (payload: { [key: string]: Color }) => action(PathAction.SELECT_PATHS, payload),
};
