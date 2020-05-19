import { Action, combineReducers, Reducer } from 'redux';

import { UiState } from './ui/ui.model';
import { uiReducer } from './ui/ui.reducer';

/**********************************************************
 * Interfaces
 **********************************************************/
export interface AppState {
  ui: UiState;
}

/**********************************************************
 * functions
 **********************************************************/
export function makeRootReducer<S = any, A extends Action = Action>(asyncReducers?: Reducer<S, A>) {
  return combineReducers({
    ui: uiReducer,
    ...asyncReducers,
  });
}
