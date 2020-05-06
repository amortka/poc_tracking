import { action } from 'typesafe-actions'
import { VisualisationAction } from './visualisation.model'

export const visualisationActions = {
  setIsPending: (payload: boolean) => action(VisualisationAction.CONFIG, payload),
}
