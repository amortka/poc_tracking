import { action } from 'typesafe-actions';
import { RoutesAction } from './routes.model';
import { IRoute } from '../../modules/canvas/canvas.model';

export const RoutesActions = {
  addRoute: (payload: IRoute) => action(RoutesAction.ADD_ROUTE, payload),
  updateRoute: (payload: { routeId: string; data: IRoute }) => action(RoutesAction.UPDATE_ROUTE, payload),
};
