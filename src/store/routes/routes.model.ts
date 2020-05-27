import { Dictionary, IRoute } from '../../app.model';

export enum RoutesAction {
  ADD_ROUTE = '@@routes/ADD_ROUTE',
  UPDATE_ROUTE = '@@routes/UPDATE_ROUTE',
}

export interface RoutesState extends Dictionary<IRoute> {}
