import { AppState } from '../main.store';
import { createSelector } from 'reselect';

export class SceneSelectors {
  static scene = createSelector(
    (state: AppState) => state.scene,
    (scene) => scene
  );
  static paths = createSelector(SceneSelectors.scene, (scene) => scene.paths);
}
