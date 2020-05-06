import { Reducer } from 'redux'
import { VisualisationAction, VisualisationState } from './visualisation.model'
import { productionHallMock } from '../../mocks/main.mock'

export const initialState: VisualisationState = {
  config: productionHallMock,
}

export const visualisationReducer: Reducer<VisualisationState> = (state = initialState, action) => {
  switch (action.type) {
    case VisualisationAction.CONFIG: {
      return { ...state, isPending: action.payload }
    }
    default: {
      return state
    }
  }
}
