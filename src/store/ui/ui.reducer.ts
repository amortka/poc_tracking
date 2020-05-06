import { Reducer } from 'redux'
import { UiState } from './ui.model'
import { UiAction } from './ui.model'

export const initialState: UiState = {
  isPending: false,
}

export const uiReducer: Reducer<UiState> = (state = initialState, action) => {
  switch (action.type) {
    case UiAction.PENDING: {
      return { ...state, isPending: action.payload }
    }
    default: {
      return state
    }
  }
}
