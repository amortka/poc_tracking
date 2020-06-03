import { Dictionary } from '../../app.model';
import { IObjectStateMeta } from '../../modules/canvas/canvas.model';

export enum ObjectsAction {
  UPDATE_OBJECTS = '@@objects/UPDATE_OBJECTS',
  SELECT_OBJECTS = '@@objects/SELECT_OBJECTS',
  SET_OBJECT_VISIBLE_RESOURCE_INDICATOR = '@@objects/SET_OBJECT_VISIBLE_RESOURCE_INDICATOR',
  SET_OBJECT_RESOURCE_INDICATOR = '@@objects/SET_OBJECT_RESOURCE_INDICATOR',
}
export interface IObjectState extends IObjectStateMeta {}

export interface IObjectsState extends Dictionary<IObjectState> {}
