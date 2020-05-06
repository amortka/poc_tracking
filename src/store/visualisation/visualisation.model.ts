import { IProductionHall } from '../../models/main.model'

export enum VisualisationAction {
  CONFIG = '@@visualisation/CONFIG',
}

export interface VisualisationState {
  readonly config: IProductionHall
}
