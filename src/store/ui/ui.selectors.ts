import { AppState } from '../main.store'
import { createSelector } from 'reselect'

export const uiSelectors = {
  isPending$: createSelector(
    (state: AppState) => state.ui.isPending,
    (isPending) => isPending
  ),
}
