import { Reducer } from 'redux';
import { SceneState } from './scene.model';
import { SceneAction } from './scene.model';
import { visualizationSceneMock } from '../../modules/canvas/canvas.mock';

export const initialState: SceneState = {
  ...visualizationSceneMock,
};

export const sceneReducer: Reducer<SceneState> = (state = initialState, action) => {
  switch (action.type) {
    case SceneAction.SET_SCENE: {
      return { ...state, ...action.payload };
    }
    default: {
      return state;
    }
  }
};
