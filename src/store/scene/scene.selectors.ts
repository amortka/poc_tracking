import { AppState } from '../main.store';
import { createSelector } from 'reselect';

export const sceneSelectors = {
  scene: createSelector(
    (state: AppState) => state.scene,
    (scene) => scene
  ),
};
