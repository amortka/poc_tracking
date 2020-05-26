import { Reducer } from 'redux';
import shortid from 'shortid';

import { RoutesState, RoutesAction } from './routes.model';

export const initialState: RoutesState = {
  fqfwxpzw: {
    vehicle: 'trqzbojg',
    path: 'ojihoybn',
    selected: true,
  },
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
