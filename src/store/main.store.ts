import { Action, combineReducers, Reducer } from 'redux';

import { routesReducer } from './routes/routes.reducer';
import { RoutesState } from './routes/routes.model';
import { sceneReducer } from './scene/scene.reducer';
import { SceneState } from './scene/scene.model';
import { tooltipsReducer } from './tooltips/tooltips.reducer';
import { TooltipState } from './tooltips/tooltips.model';
import { uiReducer } from './ui/ui.reducer';
import { UiState } from './ui/ui.model';
import { vehiclesReducer } from './vehicles/vehicles.reducer';
import { IVehiclesState } from './vehicles/vehicles.model';

/**********************************************************
 * Interfaces
 **********************************************************/
export interface AppState {
  routes: RoutesState;
  scene: SceneState;
  tooltip: TooltipState;
  ui: UiState;
  vehicles: IVehiclesState;
}

/**********************************************************
 * functions
 **********************************************************/
export function makeRootReducer<S = any, A extends Action = Action>(asyncReducers?: Reducer<S, A>) {
  return combineReducers({
    routes: routesReducer,
    scene: sceneReducer,
    tooltip: tooltipsReducer,
    ui: uiReducer,
    vehicles: vehiclesReducer,
    ...asyncReducers,
  });
}
