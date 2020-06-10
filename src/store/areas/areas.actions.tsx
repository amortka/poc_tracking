import { action } from 'typesafe-actions';
import { AreasAction } from './areas.model';

export const AreasActions = {
  updateArea: (payload: { areaId: string; vehicleId: string }) => action(AreasAction.UPDATE_AREA, payload),
};
