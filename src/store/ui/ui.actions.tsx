import { action } from 'typesafe-actions';
import { UiAction } from './ui.model';

export const uiActions = {
  setIsPending: (payload: boolean) => action(UiAction.PENDING, payload),
  setIsD3: (payload: boolean) => action(UiAction.IS_D3, payload),
};
