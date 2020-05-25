import { Reducer } from 'redux';
import { UiState } from './ui.model';
import { UiAction } from './ui.model';

export const initialState: UiState = {
  isPending: false,
  isD3: false,
};

export const uiReducer: Reducer<UiState> = (state = initialState, action) => {
  switch (action.type) {
    case UiAction.PENDING: {
      return { ...state, isPending: action.payload };
    }
    case UiAction.IS_D3: {
      return { ...state, isD3: action.payload };
    }
    default: {
      return state;
    }
  }
};