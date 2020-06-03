import { Reducer } from 'redux';

import { ISensorsState, SensorAction } from './sensors.model';

/**
 * Helper functions
 */

function handleSensorsSelections(state: ISensorsState, sensorsToSelect: { [key: string]: boolean }): ISensorsState {
  const newState = { ...state };

  // Create object entity if not exist
  for (const sensorId in sensorsToSelect) {
    newState[sensorId] = newState[sensorId] || {};
  }

  // Reselect all object entities
  for (const SensorId in newState) {
    newState[SensorId] = newState[SensorId] || {};
    newState[SensorId] = {
      ...newState[SensorId],
      selected: Boolean(sensorsToSelect[SensorId]),
    };
  }

  return newState;
}

/**
 * Reducer
 */

export const initialState: ISensorsState = {};

export const sensorsReducer: Reducer<ISensorsState> = (state = initialState, action) => {
  switch (action.type) {
    case SensorAction.SELECT_SENSORS: {
      return handleSensorsSelections(state, action.payload);
    }

    default: {
      return state;
    }
  }
};
