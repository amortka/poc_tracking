import { Action, combineReducers, Reducer } from 'redux';

import { IObjectsState } from './objects/objects.model';
import { IPathsState } from './paths/paths.model';
import { IRoutesState } from './routes/routes.model';
import { ISensorsState } from './sensors/sensors.model';
import { IVehiclesState } from './vehicles/vehicles.model';
import { objectsReducer } from './objects/objects.reducer';
import { pathsReducer } from './paths/paths.reducer';
import { routesReducer } from './routes/routes.reducer';
import { sceneReducer } from './scene/scene.reducer';
import { SceneState } from './scene/scene.model';
import { sensorsReducer } from './sensors/sensors.reducer';
import { tooltipsReducer } from './tooltips/tooltips.reducer';
import { TooltipState } from './tooltips/tooltips.model';
import { uiReducer } from './ui/ui.reducer';
import { UiState } from './ui/ui.model';
import { vehiclesReducer } from './vehicles/vehicles.reducer';
import { OrdersState } from './orders/orders.model';
import { ordersReducer } from './orders/orders.reducer';
import { IAreasState } from './areas/areas.model';
import { areasReducer } from './areas/areas.reducer';

/**********************************************************
 * Interfaces
 **********************************************************/
export interface AppState {
  scene: SceneState;

  areas: IAreasState;
  objects: IObjectsState;
  paths: IPathsState;
  routes: IRoutesState;
  sensors: ISensorsState;
  tooltip: TooltipState;
  vehicles: IVehiclesState;

  ui: UiState;
  orders: OrdersState;
}

/**********************************************************
 * functions
 **********************************************************/
export function makeRootReducer<S = any, A extends Action = Action>(asyncReducers?: Reducer<S, A>) {
  return combineReducers({
    scene: sceneReducer,

    areas: areasReducer,
    objects: objectsReducer,
    paths: pathsReducer,
    routes: routesReducer,
    sensors: sensorsReducer,
    tooltip: tooltipsReducer,
    vehicles: vehiclesReducer,

    ui: uiReducer,
    orders: ordersReducer,
    ...asyncReducers,
  });
}
