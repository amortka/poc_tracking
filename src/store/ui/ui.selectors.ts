import { AppState } from '../main.store';
import { createSelector } from 'reselect';

export class UiSelectors {
  static isD3 = createSelector(
    (state: AppState) => state.ui.isD3,
    (isD3) => isD3
  );

  static isRealData = createSelector(
    (state: AppState) => state.ui.isRealData,
    (isRealData) => isRealData
  );

  static isPending = createSelector(
    (state: AppState) => state.ui.isPending,
    (isPending) => isPending
  );
}
