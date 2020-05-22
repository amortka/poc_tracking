import { AppState } from '../main.store';
import { createSelector } from 'reselect';

export class TooltipsSelectors {
  static selection = createSelector(
    (state: AppState) => state.tooltip.selection,
    (selection) => selection
  );
  static selectionSelected = createSelector(TooltipsSelectors.selection, (selection) => selection.selected);
  static selectionData = createSelector(TooltipsSelectors.selection, (selection) => selection.data);
  static selectionSelectedData = createSelector(
    TooltipsSelectors.selectionSelected,
    TooltipsSelectors.selectionData,
    (selected, data) => {
      if (!data) {
        return {};
      }
      const selectedFullIds = Object.keys(selected).flatMap((key) => selected[key].map((id) => `${key}_${id}`));

      return {
        ...Object.fromEntries(selectedFullIds.map((id) => [id, { ...data[id] }])),
      };
    }
  );
  static mouse = createSelector(
    (state: AppState) => state.tooltip.mouse,
    (mouse) => mouse
  );
}
