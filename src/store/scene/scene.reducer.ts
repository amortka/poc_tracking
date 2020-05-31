import { Reducer } from 'redux';
import { SceneState } from './scene.model';
import { SceneAction } from './scene.model';
import { visualizationSceneMock } from '../../modules/canvas/canvas.mock';

/**
 * Helpers
 */

function handleSceneElementSelections(state: SceneState, selectedPaths: string[]) {
  const sensorsToSelect = {};
  const objectToSelect = {};
  const pathToSelect = {};
  selectedPaths.forEach((pathId) => {
    pathToSelect[pathId] = pathId;
    state.paths[pathId].sensors.forEach(({ sensorId, relationHidden }) => {
      if (!relationHidden) {
        sensorsToSelect[sensorId] = sensorId;
      }
    });
    state.paths[pathId].objects.forEach(({ objectId }) => {
      objectToSelect[objectId] = objectId;
    });
  });

  /// unselect all paths, object and sensors
  for (const pathId in state.paths) {
    state.paths[pathId].meta.selected = Boolean(pathToSelect[pathId]);
  }
  for (const objectId in state.objects) {
    state.objects[objectId].meta.selected = Boolean(objectToSelect[objectId]);
  }
  for (const sensorId in state.sensors) {
    state.sensors[sensorId].meta.selected = Boolean(sensorsToSelect[sensorId]);
  }

  state.objects = { ...state.objects };
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
      const selectedPaths: string[] = action.payload;
      return handleSceneElementSelections({ ...state }, selectedPaths);
    }
    default: {
      return state;
    }
  }
};
