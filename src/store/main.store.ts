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
import { pathsReducer } from './paths/paths.reducer';
import { IPathsState } from './paths/paths.model';

/**********************************************************
 * Interfaces
 **********************************************************/
export interface AppState {
  scene: SceneState;

  objects: IObjectsState;
  paths: IPathsState;
  routes: IRoutesState;
  tooltip: TooltipState;
  vehicles: IVehiclesState;

  ui: UiState;
}

/**********************************************************
 * functions
 **********************************************************/
export function makeRootReducer<S = any, A extends Action = Action>(asyncReducers?: Reducer<S, A>) {
  return combineReducers({
    scene: sceneReducer,

    objects: objectsReducer,
    paths: pathsReducer,
    routes: routesReducer,
    tooltip: tooltipsReducer,
    vehicles: vehiclesReducer,

    ui: uiReducer,
    ...asyncReducers,
  });
}
