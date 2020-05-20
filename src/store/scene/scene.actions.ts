import { action } from 'typesafe-actions';
import { SceneAction } from './scene.model';

export const SceneActions = {
  setScene: (payload: boolean) => action(SceneAction.SET_SCENE, payload),
};
