import { Reducer } from 'redux';
import { TooltipState, TooltipAction } from './tooltips.model';

export const initialState: TooltipState = {
  mouse: null,
  selection: { data: null, selected: {} },
};

export const tooltipsReducer: Reducer<TooltipState> = (state = initialState, action) => {
  switch (action.type) {
    case TooltipAction.SET_MOUSE_DATA: {
      return { ...state, mouse: action.payload };
    }
    case TooltipAction.SET_SELECTION_DATA: {
      return { ...state, selection: { ...state.selection, data: action.payload } };
    }
    case TooltipAction.SET_SELECTION_SELECTED: {
      return { ...state, selection: { ...state.selection, selected: action.payload } };
    }
    case TooltipAction.CLEAR_SELECTION_SELECTED: {
      return { ...state, selection: { ...state.selection, selected: {} } };
    }
    default: {
      return state;
    }
  }
};
