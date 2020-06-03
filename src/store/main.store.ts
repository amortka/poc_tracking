import { Action, combineReducers, Reducer } from 'redux';

import { IObjectsState } from './objects/objects.model';
import { IRoutesState } from './routes/routes.model';
import { IVehiclesState } from './vehicles/vehicles.model';
import { objectsReducer } from './objects/objects.reducer';
import { routesReducer } from './routes/routes.reducer';
import { sceneReducer } from './scene/scene.reducer';
import { SceneState } from './scene/scene.model';
import { tooltipsReducer } from './tooltips/tooltips.reducer';
import { TooltipState } from './tooltips/tooltips.model';
import { uiReducer } from './ui/ui.reducer';
import { UiState } from './ui/ui.model';
import { vehiclesReducer } from './vehicles/vehicles.reducer';

/**********************************************************
 * Interfaces
 **********************************************************/
export interface AppState {
  routes: IRoutesState;
  scene: SceneState;
  tooltip: TooltipState;
  ui: UiState;
  vehicles: IVehiclesState;
  objects: IObjectsState;
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
    objects: objectsReducer,
    ...asyncReducers,
  });
}
