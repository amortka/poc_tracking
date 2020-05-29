import { Reducer } from 'redux';
import shortid from 'shortid';

import { IRoutesState, RoutesAction } from './routes.model';
import { VehiclesAction } from '../vehicles/vehicles.model';
import { IApiVehicleUpdate } from '../../app.model';
import { routeColors } from '../../modules/ui/config/theme.config';
import { Color } from '../../modules/canvas/canvas.model';

/**
 * Functions
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
      tag: 'Milkrun ABC', // TODO change when backend will provide create NewRouteEvent
    },
  };
}

function handleRoutesSelection(state: IRoutesState, action: any) {
  let newState: IRoutesState = { ...state };
  for (const routeId in newState) {
    newState[routeId].selected = (action.payload.routesId as string[]).indexOf(routeId) > -1;
  }
  return newState;
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
    case RoutesAction.UPDATE_ROUTE: {
      return { ...state, [action.payload.vehicleId]: { ...state[action.payload.vehicleId], ...action.payload.data } };
    }
    case RoutesAction.SELECT_ROUTES: {
      return handleRoutesSelection(state, action);
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
