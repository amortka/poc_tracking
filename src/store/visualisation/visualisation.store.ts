import { Store, StoreConfig } from '@datorama/akita'
import { IVisualisation } from '../../models/main.model'
import { visualisationMock } from '../../mocks/main.mock'

export interface VisualisationState extends IVisualisation {}

export function createInitialState(): VisualisationState {
  return {
    ...visualisationMock,
  }
}

@StoreConfig({ name: 'visualisation' })
export class VisualisationStore extends Store<VisualisationState> {
  constructor() {
    super(createInitialState())
  }
}

export const visualisationStore = new VisualisationStore()
