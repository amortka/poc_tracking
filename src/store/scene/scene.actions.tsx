import { action } from 'typesafe-actions';
import { SceneAction, SelectSceneElementsByPathsIdsPayload } from './scene.model';

export const SceneActions = {
  setScene: (payload: boolean) => action(SceneAction.SET_SCENE, payload),
  selectSceneElementsByPathsIds: (payload: SelectSceneElementsByPathsIdsPayload) =>
    action(SceneAction.SELECT_SCENE_ELEMENTS_BY_PATHS_IDS, payload),
};
