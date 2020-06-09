import { Reducer } from 'redux';
import { UiState } from './ui.model';
import { UiAction } from './ui.model';
import { isAppInitiallyUseRealBackend } from '../../utils/env.utils';
import { RoutesActions } from '../routes/routes.actions';
import { RealDeviceId } from '../../modules/server-handler/RealBackend';
import { MockedDeviceId } from '../../modules/server-handler/MockedBackend';

export const initialState: UiState = {
  isPending: false,
  isD3: false,
  isRealData: isAppInitiallyUseRealBackend(),
};

export const uiReducer: Reducer<UiState> = (state = initialState, action) => {
  switch (action.type) {
    case UiAction.PENDING: {
      return { ...state, isPending: action.payload };
    }
    case UiAction.IS_D3: {
      return { ...state, isD3: action.payload };
    }
    case UiAction.IS_REAL_DATA: {
      action.asyncDispatch(RoutesActions.selectRoutesByDeviceId(action.payload ? RealDeviceId : MockedDeviceId));
      return { ...state, isRealData: action.payload };
    }
    default: {
      return state;
    }
  }
};
