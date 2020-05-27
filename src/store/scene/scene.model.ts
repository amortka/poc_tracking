import { IVisualizationScene } from '../../app.model';

export enum SceneAction {
  SET_SCENE = '@@scene/SET_SCENE',
}

export interface SceneState extends IVisualizationScene {}
