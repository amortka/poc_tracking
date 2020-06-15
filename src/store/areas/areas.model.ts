import { Dictionary } from '../../app.model';

export enum AreasAction {
  UPDATE_AREA = '@@areas/UPDATE_AREA',
}
export interface IAreaState {
  vehiclesId: string[];
}

export interface IAreasState extends Dictionary<IAreaState> {}
