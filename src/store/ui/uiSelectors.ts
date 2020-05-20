import { AppState } from '../main.store';
import { createSelector } from 'reselect';

export class UiSelectors {
  static isPending$ = createSelector(
    (state: AppState) => state.ui.isPending,
    (isPending) => isPending
  );
}
