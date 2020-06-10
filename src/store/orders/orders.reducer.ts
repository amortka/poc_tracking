import { Reducer } from 'redux';
import { OrdersState, OrdersAction } from './orders.model';
import { ordersMock } from '../../mocks/ui.mock';

export const initialState: OrdersState = {
  ...ordersMock,
};

export const ordersReducer: Reducer<OrdersState> = (state = initialState, action) => {
  switch (action.type) {
    default: {
      return state;
    }
  }
};
