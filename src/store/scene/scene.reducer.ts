import { Reducer } from 'redux';
import { SceneAction, SceneState, SelectSceneElementsByPathsIdsPayload } from './scene.model';
import { visualizationSceneMock } from '../../modules/canvas/canvas.mock';
import { ObjectsActions } from '../objects/objects.actions';
import { Color } from '../../modules/canvas/canvas.model';

/**
 * Helpers
 */

// TODO remove this and put to separate reducers
function handleSceneElementSelections(
  state: SceneState,
  selectedPaths: SelectSceneElementsByPathsIdsPayload,
  asyncDispatch: Function
): SceneState {
  const sensorsToSelect = {};
  const objectToSelect: { [key: string]: Color } = {};
  const pathToSelect = {};

  selectedPaths.forEach((selection) => {
    pathToSelect[selection.pathId] = true;

    state.paths[selection.pathId].sensors.forEach(({ sensorId, relationHidden }) => {
      if (!relationHidden) {
        sensorsToSelect[sensorId] = sensorId;
      }
    });

    state.paths[selection.pathId].objects.forEach(({ objectId }) => (objectToSelect[objectId] = selection.color));
  });

  asyncDispatch(ObjectsActions.selectObjects(objectToSelect));

  /// unselect all paths, object and sensors
  for (const pathId in state.paths) {
    state.paths[pathId].meta.selected = Boolean(pathToSelect[pathId]);
  }

  for (const sensorId in state.sensors) {
    state.sensors[sensorId].meta.selected = Boolean(sensorsToSelect[sensorId]);
  }

  state.sensors = { ...state.sensors };
  state.paths = { ...state.paths };

  return state;
}

/**
 * Reducer
 */
export const initialState: SceneState = {
  ...visualizationSceneMock,
};

export const sceneReducer: Reducer<SceneState> = (state = initialState, action) => {
  switch (action.type) {
    case SceneAction.SET_SCENE: {
      return { ...state, ...action.payload };
    }
    case SceneAction.SELECT_SCENE_ELEMENTS_BY_PATHS_IDS: {
      const selectedPaths: SelectSceneElementsByPathsIdsPayload = action.payload;
      return handleSceneElementSelections({ ...state }, selectedPaths, action.asyncDispatch);
    }
    default: {
      return state;
    }
  }
};
