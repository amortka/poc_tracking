import { Reducer } from 'redux'
import { VisualisationState } from './visualisation.model'
import { productionHallMock } from '../../mocks/main.mock'

export const initialState: VisualisationState = {
  ...productionHallMock,
}

export const visualisationReducer: Reducer<VisualisationState> = (state = initialState, action) => {
  switch (action.type) {
    default: {
      return state
    }
  }
}
