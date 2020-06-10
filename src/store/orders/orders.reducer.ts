import { Reducer } from 'redux';
import { OrdersState, OrdersAction } from './orders.model';
import { ordersMock } from '../../mocks/ui.mock';
import { TooltipAction } from '../tooltips/tooltips.model';

export const initialState: OrdersState = {
  list: ordersMock,
  selectedStation: null,
};

export const ordersReducer: Reducer<OrdersState> = (state = initialState, action) => {
  switch (action.type) {
    case TooltipAction.SET_MOUSE_DATA: {
      const { type, object, objectType } = action.payload;

      return type === 'click' && objectType === 'OBJECT'
        ? { ...state, selectedStation: { id: object.id, name: object.meta.name } }
        : { ...state };
    }
    case OrdersAction.CLEAR_SELECTED_STATION: {
      return { ...state, selectedStation: null };
    }
    default: {
      return state;
    }
  }
};
