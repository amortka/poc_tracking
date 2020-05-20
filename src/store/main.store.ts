import { Action, combineReducers, Reducer } from 'redux';

import { UiState } from './ui/ui.model';
import { uiReducer } from './ui/ui.reducer';
import { sceneReducer } from './scene/scene.reducer';
import { SceneState } from './scene/scene.model';

/**********************************************************
 * Interfaces
 **********************************************************/
export interface AppState {
  ui: UiState;
  scene: SceneState;
}

/**********************************************************
 * functions
 **********************************************************/
export function makeRootReducer<S = any, A extends Action = Action>(asyncReducers?: Reducer<S, A>) {
  return combineReducers({
    ui: uiReducer,
    scene: sceneReducer,
    ...asyncReducers,
  });
}
