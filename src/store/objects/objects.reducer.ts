import { Reducer } from 'redux';
import { IObjectsState, ObjectsAction } from './objects.model';
import { Color } from '../../modules/canvas/canvas.model';
import { SetObjectResourceIndicatorPayload } from '../scene/scene.model';

/**
 * Helper functions
 */

function handleObjectsSelections(state: IObjectsState, objectsToSelect: { [key: string]: Color }): IObjectsState {
  const newState = { ...state };

  // Create object entity if not exist
  for (const objectId in objectsToSelect) {
    newState[objectId] = newState[objectId] || {};
  }

  // Reselect all object entities
  for (const objectId in newState) {
    newState[objectId] = newState[objectId] || {};
    newState[objectId] = {
      ...newState[objectId],
      color: objectsToSelect[objectId] ? objectsToSelect[objectId] : newState[objectId]?.color,
      selected: Boolean(objectsToSelect[objectId]),
      visibleResourceIndicator: Boolean(objectsToSelect[objectId]),
    };
  }

  return newState;
}

function handleShowingObjectsResourceIndicator(state: IObjectsState, selectedObjects: string[]): IObjectsState {
  const newState = { ...state };

  // Create object entity if not exist
  selectedObjects.forEach((objectId) => {
    newState[objectId] = newState[objectId] || {};
  });

  const objectToShowIndicators: { [key: string]: boolean } = {};
  selectedObjects.forEach((o) => (objectToShowIndicators[o] = true));

  for (const objectId in newState) {
    newState[objectId].visibleResourceIndicator = Boolean(objectToShowIndicators[objectId]);
  }

  return newState;
}

function handleSetObjectResourceIndicator(
  state: IObjectsState,
  objectsWithValue: SetObjectResourceIndicatorPayload
): IObjectsState {
  const newState = { ...state };

  // Create object entity if not exist
  objectsWithValue.forEach(({ objectId }) => {
    newState[objectId] = newState[objectId] || {};
  });

  objectsWithValue.forEach(
    ({ objectId, resourceIndicator }) => (newState[objectId].resourceIndicator = resourceIndicator)
  );

  return newState;
}

/**
 * Reducer
 */

export const initialState: IObjectsState = {};

export const objectsReducer: Reducer<IObjectsState> = (state = initialState, action) => {
  switch (action.type) {
    case ObjectsAction.UPDATE_OBJECTS: {
      // TODO implement
      return { ...action.payload };
    }

    case ObjectsAction.SELECT_OBJECTS: {
      return handleObjectsSelections(state, action.payload);
    }

    case ObjectsAction.SET_OBJECT_VISIBLE_RESOURCE_INDICATOR: {
      const selectedObjects: string[] = action.payload;
      return handleShowingObjectsResourceIndicator({ ...state }, selectedObjects);
    }
    case ObjectsAction.SET_OBJECT_RESOURCE_INDICATOR: {
      const payload: SetObjectResourceIndicatorPayload = action.payload;
      return handleSetObjectResourceIndicator({ ...state }, payload);
    }

    default: {
      return state;
    }
  }
};
