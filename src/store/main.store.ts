import { Action, combineReducers, Reducer } from 'redux'

import { UiState } from './ui/ui.model'
import { uiReducer } from './ui/ui.reducer'
import { visualisationReducer } from './visualisation/visualisation.reducer'
import { VisualisationState } from './visualisation/visualisation.model'

/**********************************************************
 * Interfaces
 **********************************************************/
export interface AppState {
  ui: UiState
  visualisation: VisualisationState
}

/**********************************************************
 * functions
 **********************************************************/
export function makeRootReducer<S = any, A extends Action = Action>(asyncReducers?: Reducer<S, A>) {
  return combineReducers({
    visualisation: visualisationReducer,
    ui: uiReducer,
    ...asyncReducers,
  })
}
