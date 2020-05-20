import { AppState } from '../main.store';
import { createSelector } from 'reselect';

export class TooltipsSelectors {
  static selection = createSelector(
    (state: AppState) => state.tooltip.selection,
    (selection) => selection
  );
  static selectionSelected = createSelector(TooltipsSelectors.selection, (selection) => selection.selected);
  static selectionData = createSelector(TooltipsSelectors.selection, (selection) => selection.data);
  static mouse = createSelector(
    (state: AppState) => state.tooltip.mouse,
    (mouse) => mouse
  );
}
