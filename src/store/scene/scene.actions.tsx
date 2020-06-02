import { action } from 'typesafe-actions';
import { SceneAction, SelectSceneElementsByPathsIdsPayload, SetObjectResourceIndicatorPayload } from './scene.model';

export const SceneActions = {
  setScene: (payload: boolean) => action(SceneAction.SET_SCENE, payload),

  selectSceneElementsByPathsIds: (payload: SelectSceneElementsByPathsIdsPayload) =>
    action(SceneAction.SELECT_SCENE_ELEMENTS_BY_PATHS_IDS, payload),

  setVisibleResourceIndicator: (objectsIds: string[]) =>
    action(SceneAction.SET_OBJECT_VISIBLE_RESOURCE_INDICATOR, objectsIds),

  setObjectResourceIndicator: (payload: SetObjectResourceIndicatorPayload) =>
    action(SceneAction.SET_OBJECT_RESOURCE_INDICATOR, payload),
};
