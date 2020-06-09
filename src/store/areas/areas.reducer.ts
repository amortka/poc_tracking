import { Reducer } from 'redux';

import { AreasAction, IAreasState } from './areas.model';

/**
 * Helper functions
 */

function updateArea(state: IAreasState, vehicleId: string, areaId: string): IAreasState {
  const newState = { ...state, [areaId]: state[areaId] || { vehiclesId: [] } };

  Object.entries(state).forEach(([aId, areaData]) => {
    if (aId !== areaId) {
      areaData.vehiclesId = areaData.vehiclesId.filter((vId) => vId !== vehicleId);
    }
    if (aId === areaId && areaData.vehiclesId.indexOf(vehicleId) === -1) {
      areaData.vehiclesId.push(vehicleId);
    }

    newState[aId] = { ...areaData };
  });

  return newState;
}
/**
 * Reducer
 */

export const initialState: IAreasState = {};

export const areasReducer: Reducer<IAreasState> = (state = initialState, action) => {
  switch (action.type) {
    case AreasAction.UPDATE_AREA: {
      const { vehicleId, areaId } = action.payload as { areaId: string; vehicleId: string };
      return updateArea(state, vehicleId, areaId);
    }
    default: {
      return state;
    }
  }
};
