import { Reducer } from 'redux';

import { SceneAction, SceneState, SelectSceneElementsByPathsIdsPayload } from './scene.model';
import { visualizationSceneMock } from '../../modules/canvas/canvas.mock';
import { ObjectsActions } from '../objects/objects.actions';
import { Color } from '../../modules/canvas/canvas.model';
import { PathsActions } from '../paths/paths.actions';
import { SensorsActions } from '../sensors/sensors.actions';

/**
 * Helpers
 */

function handleSceneElementSelections(
  state: SceneState,
  selectedPaths: SelectSceneElementsByPathsIdsPayload,
  asyncDispatch: Function
): void {
  const sensorsToSelect: { [key: string]: boolean } = {};
  const objectToSelect: { [key: string]: Color } = {};
  const pathToSelect: { [key: string]: Color } = {};

  selectedPaths.forEach((selection) => {
    pathToSelect[selection.pathId] = 'green'; // TODO possibility to provide custom colors for paths

    state.paths[selection.pathId].sensors.forEach(({ sensorId, relationHidden }) => {
      if (!relationHidden) {
        sensorsToSelect[sensorId] = true;
      }
    });

    state.paths[selection.pathId].objects.forEach(({ objectId }) => (objectToSelect[objectId] = selection.color));
  });

  asyncDispatch(ObjectsActions.selectObjects(objectToSelect));
  asyncDispatch(PathsActions.selectPaths(pathToSelect));
  asyncDispatch(SensorsActions.selectSensors(sensorsToSelect));
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
      handleSceneElementSelections({ ...state }, action.payload, action.asyncDispatch);
      return state;
    }
    default: {
      return state;
    }
  }
};
