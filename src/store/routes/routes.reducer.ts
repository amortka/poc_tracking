import { Reducer } from 'redux';
import shortid from 'shortid';

import { IRoutesState, RoutesAction } from './routes.model';
import { VehiclesAction } from '../vehicles/vehicles.model';
import { IApiVehicleUpdate } from '../../app.model';
import { routeColors } from '../../modules/ui/config/theme.config';
import { Color } from '../../modules/canvas/canvas.model';
import { SceneActions } from '../scene/scene.actions';
import { SelectSceneElementsByPathsIdsPayload } from '../scene/scene.model';

/**
 * Helpers
 */
function getRouteColor(value: number): Color {
  return routeColors[value % routeColors.length];
}

function createRouteWhenNewVehicleUpdates(state: IRoutesState, action: any): IRoutesState {
  const vehicleUpdate = action.payload as IApiVehicleUpdate;

  // check if vehicle has its routes
  if (Object.values(state).find((route) => route.vehicle === vehicleUpdate.deviceId)) return state;

  const newId = shortid.generate();
  return {
    ...state,
    [newId]: {
      vehicle: vehicleUpdate.deviceId,
      path: 'ojihoybn',
      selected: false,
      color: getRouteColor(Object.keys(state).length),
      tag: `AGV ${vehicleUpdate.deviceId}`, // TODO change when backend will provide create NewRouteEvent
    },
  };
}

function handleRoutesSelection(state: IRoutesState, routesIds: string[]) {
  let newState: IRoutesState = { ...state };
  for (const routeId in newState) {
    newState[routeId].selected = routesIds.indexOf(routeId) > -1;
  }
  return newState;
}

function handleSceneElementsSelection(asyncDispatch: Function, state: IRoutesState, routesIds: string[]) {
  // const pathsIds = [...routesIds].map((routeId) => state[routeId]?.path).filter((r) => !!r);
  const selectionPayload: SelectSceneElementsByPathsIdsPayload = [...routesIds]
    .map((routeId) => ({ pathId: state[routeId]?.path, color: state[routeId]?.color }))
    .filter((r) => !!r.pathId);
  asyncDispatch(SceneActions.selectSceneElementsByPathsIds(selectionPayload));
}

/**
 * Reducer
 */
export const initialState: IRoutesState = {};

export const routesReducer: Reducer<IRoutesState> = (state = initialState, action) => {
  switch (action.type) {
    case RoutesAction.ADD_ROUTE: {
      const newId = shortid.generate();
      return { ...state, [newId]: action.payload };
    }
    case RoutesAction.CREATE_OR_UPDATE_ROUTE: {
      return { ...state, [action.payload.vehicleId]: { ...state[action.payload.vehicleId], ...action.payload.data } };
    }
    case RoutesAction.UPDATE_ROUTE: {
      console.log(action.payload);
      if (!state[action.payload.vehicleId]) return state;
      return { ...state, [action.payload.vehicleId]: { ...state[action.payload.vehicleId], ...action.payload.data } };
    }
    case RoutesAction.SELECT_ROUTES: {
      const routesIds: string[] = action.payload.routesIds;
      handleSceneElementsSelection(action.asyncDispatch, state, routesIds);
      return handleRoutesSelection(state, routesIds);
    }
    case RoutesAction.SELECT_ROUTE_BY_DEVICE_ID: {
      const deviceId: string = action.payload.deviceId;
      const [routesId] = Object.entries(state).find(([routeId, data]) => data.vehicle === deviceId) || [];

      if (!routesId) return state;

      handleSceneElementsSelection(action.asyncDispatch, state, [routesId]);
      return handleRoutesSelection(state, [routesId]);
    }

    // TODO: temporary add creation of route by backend vehicle update where rfid is not empty
    case VehiclesAction.UPDATE_VEHICLE: {
      return createRouteWhenNewVehicleUpdates(state, action);
    }
    default: {
      return state;
    }
  }
};
