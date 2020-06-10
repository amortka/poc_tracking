import { action } from 'typesafe-actions';
import { RoutesAction } from './routes.model';
import { IRoute } from '../../modules/canvas/canvas.model';

export const RoutesActions = {
  createOrUpdateRoute: (payload: { routeId: string; data: Partial<IRoute> }) =>
    action(RoutesAction.CREATE_OR_UPDATE_ROUTE, payload),
  updateRoute: (payload: { routeId: string; data: Partial<IRoute> }) => action(RoutesAction.UPDATE_ROUTE, payload),
  selectRoutes: (routesIds: string[]) => action(RoutesAction.SELECT_ROUTES, { routesIds }),
  selectRoutesByDeviceId: (deviceId: string) => action(RoutesAction.SELECT_ROUTE_BY_DEVICE_ID, { deviceId }),
};
