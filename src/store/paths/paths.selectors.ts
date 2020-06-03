import { AppState } from '../main.store';
import { createSelector } from 'reselect';

export class PathsSelectors {
  static paths = createSelector(
    (state: AppState) => state.paths,
    (paths) => paths
  );
  static getPath = (pathId: string) => createSelector(PathsSelectors.paths, (paths) => paths[pathId]);
}
