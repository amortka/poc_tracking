import { Reducer } from 'redux';

import { IPathsState, PathAction } from './paths.model';
import { Color } from '../../modules/canvas/canvas.model';

/**
 * Helper functions
 */

function handlePathsSelections(state: IPathsState, pathsToSelect: { [key: string]: Color }): IPathsState {
  const newState = { ...state };

  // Create object entity if not exist
  for (const pathId in pathsToSelect) {
    newState[pathId] = newState[pathId] || {};
  }

  // Reselect all object entities
  for (const pathId in newState) {
    newState[pathId] = newState[pathId] || {};
    newState[pathId] = {
      ...newState[pathId],
      color: pathsToSelect[pathId] ? pathsToSelect[pathId] : newState[pathId]?.color,
      selected: Boolean(pathsToSelect[pathId]),
    };
  }

  return newState;
}

/**
 * Reducer
 */

export const initialState: IPathsState = {};

export const pathsReducer: Reducer<IPathsState> = (state = initialState, action) => {
  switch (action.type) {
    case PathAction.SELECT_PATHS: {
      return handlePathsSelections(state, action.payload);
    }

    default: {
      return state;
    }
  }
};
