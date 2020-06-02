import { Reducer } from 'redux';
import {
  SceneAction,
  SceneState,
  SelectSceneElementsByPathsIdsPayload,
  SetObjectResourceIndicatorPayload,
} from './scene.model';
import { visualizationSceneMock } from '../../modules/canvas/canvas.mock';

/**
 * Helpers
 */

function handleSceneElementSelections(
  state: SceneState,
  selectedPaths: SelectSceneElementsByPathsIdsPayload
): SceneState {
  const sensorsToSelect = {};
  const objectToSelect = {};
  const pathToSelect = {};
  selectedPaths.forEach((selection) => {
    pathToSelect[selection.pathId] = true;
    state.paths[selection.pathId].sensors.forEach(({ sensorId, relationHidden }) => {
      if (!relationHidden) {
        sensorsToSelect[sensorId] = sensorId;
      }
    });
    state.paths[selection.pathId].objects.forEach(({ objectId }) => {
      objectToSelect[objectId] = selection.color;
    });
  });

  /// unselect all paths, object and sensors
  for (const pathId in state.paths) {
    state.paths[pathId].meta.selected = Boolean(pathToSelect[pathId]);
  }
  for (const objectId in state.objects) {
    state.objects[objectId].meta.selected = Boolean(objectToSelect[objectId]);
    state.objects[objectId].meta.color = objectToSelect[objectId] || null;
    state.objects[objectId].meta.visibleResourceIndicator = Boolean(objectToSelect[objectId]);
  }
  for (const sensorId in state.sensors) {
    state.sensors[sensorId].meta.selected = Boolean(sensorsToSelect[sensorId]);
  }

  state.objects = { ...state.objects };
  state.sensors = { ...state.sensors };
  state.paths = { ...state.paths };

  return state;
}

function handleShowingObjectsResourceIndicator(state: SceneState, selectedObjects: string[]): SceneState {
  const objectToShowIndicators: { [key: string]: boolean } = {};
  selectedObjects.forEach((o) => (objectToShowIndicators[o] = true));

  for (const objectId in state.objects) {
    state.objects[objectId].meta.visibleResourceIndicator = Boolean(objectToShowIndicators[objectId]);
  }

  state.objects = { ...state.objects };

  return state;
}

function handleSetObjectResourceIndicator(
  state: SceneState,
  objectsWithValue: SetObjectResourceIndicatorPayload
): SceneState {
  objectsWithValue.forEach(
    ({ objectId, resourceIndicator }) => (state.objects[objectId].meta.resourceIndicator = resourceIndicator)
  );
  state.objects = { ...state.objects };

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
      return handleSceneElementSelections({ ...state }, selectedPaths);
    }
    case SceneAction.SET_OBJECT_VISIBLE_RESOURCE_INDICATOR: {
      const selectedObjects: string[] = action.payload;
      return handleShowingObjectsResourceIndicator({ ...state }, selectedObjects);
    }
    case SceneAction.SET_OBJECT_RESOURCE_INDICATOR: {
      const payload: SetObjectResourceIndicatorPayload = action.payload;
      return handleSetObjectResourceIndicator({ ...state }, payload);
    }
    default: {
      return state;
    }
  }
};
