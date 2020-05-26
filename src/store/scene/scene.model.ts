import { IVisualizationScene } from '../../modules/canvas/canvas.model';

export enum SceneAction {
  SET_SCENE = '@@scene/SET_SCENE',
}

export interface SceneState extends IVisualizationScene {}
