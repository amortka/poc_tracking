import { Visualisation } from '../../models/main.model'

export enum VisualisationAction {
  CONFIG = '@@visualisation/CONFIG',
}

export interface VisualisationState extends Visualisation {}
