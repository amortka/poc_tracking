import { action } from 'typesafe-actions'
import { UiAction } from './ui.model'

export const uiActions = {
  setIsPending: (payload: boolean) => action(UiAction.PENDING, payload),
}
