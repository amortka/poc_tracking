import { Reducer } from 'redux';
import shortid from 'shortid';

import { RoutesState, RoutesAction } from './routes.model';
import { visualizationStateMock } from '../../mocks/main.mock';

export const initialState: RoutesState = {
  ...visualizationStateMock.routes,
};

export const routesReducer: Reducer<RoutesState> = (state = initialState, action) => {
  switch (action.type) {
    case RoutesAction.ADD_ROUTE: {
      const newId = shortid.generate();
      return { ...state, [newId]: action.payload };
    }
    case RoutesAction.UPDATE_ROUTE: {
      return { ...state, [action.payload.vehicleId]: { ...state[action.payload.vehicleId], ...action.payload.data } };
    }
    default: {
      return state;
    }
  }
};
