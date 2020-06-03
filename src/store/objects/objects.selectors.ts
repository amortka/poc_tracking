import { AppState } from '../main.store';
import { createSelector } from 'reselect';

export class ObjectsSelectors {
  static objects = createSelector(
    (state: AppState) => state.objects,
    (objects) => objects
  );
  static getObject = (objectId: string) => createSelector(ObjectsSelectors.objects, (objects) => objects[objectId]);
}
