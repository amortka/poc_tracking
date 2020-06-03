import { action } from 'typesafe-actions';
import { IObjectsState, ObjectsAction } from './objects.model';
import { Color } from '../../modules/canvas/canvas.model';
import { SetObjectResourceIndicatorPayload } from '../scene/scene.model';

export const ObjectsActions = {
  updateObjects: (payload: IObjectsState) => action(ObjectsAction.UPDATE_OBJECTS, payload),
  selectObjects: (payload: { [key: string]: Color }) => action(ObjectsAction.SELECT_OBJECTS, payload),

  setVisibleResourceIndicator: (objectsIds: string[]) =>
    action(ObjectsAction.SET_OBJECT_VISIBLE_RESOURCE_INDICATOR, objectsIds),

  setObjectResourceIndicator: (payload: SetObjectResourceIndicatorPayload) =>
    action(ObjectsAction.SET_OBJECT_RESOURCE_INDICATOR, payload),
};
