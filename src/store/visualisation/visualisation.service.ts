import { ID } from '@datorama/akita'
import { VisualisationStore, visualisationStore } from './visualisation.store'

export class VisualisationService {
  constructor(private visualisationStore: VisualisationStore) {}
}

export const visualisationService = new VisualisationService(visualisationStore)
