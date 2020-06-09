import { Dictionary } from '../../app.model';
import { IRoute } from '../../modules/canvas/canvas.model';

export interface IRouteState extends Omit<IRoute, 'progress'> {}

export enum RoutesAction {
  ADD_ROUTE = '@@routes/ADD_ROUTE',
  UPDATE_ROUTE = '@@routes/UPDATE_ROUTE',
  SELECT_ROUTES = '@@routes/SELECT_ROUTE',
  SELECT_ROUTE_BY_DEVICE_ID = '@@routes/SELECT_ROUTE_BY_DEVICE_ID',
}

export interface IRoutesState extends Dictionary<IRouteState> {}
