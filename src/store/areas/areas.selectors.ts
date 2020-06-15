import { AppState } from '../main.store';
import { createSelector } from 'reselect';

export class AreasSelectors {
  static areas = createSelector(
    (state: AppState) => state.areas,
    (areas) => areas
  );
  static getArea = (areaId: string) => createSelector(AreasSelectors.areas, (areas) => areas[areaId]);
}
