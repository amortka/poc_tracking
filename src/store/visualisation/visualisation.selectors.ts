import { AppState } from '../main.store'
import { createSelector } from 'reselect'

export const visualisationSelectors = {
  config$: createSelector(
    (state: AppState) => state.visualisation.config,
    (config) => config
  ),
}
