import { Query } from '@datorama/akita'
import { VisualisationStore, VisualisationState, visualisationStore } from './visualisation.store'

export class VisualisationQuery extends Query<VisualisationState> {
  public readonly state$ = this.select((state) => state)

  constructor(protected store: VisualisationStore) {
    super(store)
  }
}

export const visualisationQuery = new VisualisationQuery(visualisationStore)
