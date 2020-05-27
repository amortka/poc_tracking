import { AppState } from '../main.store';
import { createSelector } from 'reselect';

export const isPending = createSelector(
  (state: AppState) => state.ui.isPending,
  (isPending) => isPending
);

export const isD3 = createSelector(
  (state: AppState) => state.ui.isD3,
  (isD3) => isD3
);

export const isRealData = createSelector(
  (state: AppState) => state.ui.isRealData,
  (isRealData) => isRealData
);
