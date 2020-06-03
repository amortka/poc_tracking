import { MutableRefObject, useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { Dictionary } from '../../../app.model';
import { IRoute } from '../../canvas/canvas.model';
import { RouteService } from '../services/routes-progress.service';
import { RoutesSelectors } from '../../../store/routes/routes.selectors';

let routesIdSet: Set<string> = new Set();

function getRoutesIdChanges(routesId: string[]): string[] {
  const difference = [...routesId].filter((id) => !routesIdSet.has(id));
  routesIdSet = new Set(routesId);

  return difference;
}

function handleRoutes(
  routesId: string[],
  setStateCallback: (routeId: string, data: IRoute) => void,
  routeServices: MutableRefObject<RouteService[]>
): void {
  getRoutesIdChanges(routesId).forEach((routeId) =>
    routeServices.current.push(new RouteService(routeId, setStateCallback))
  );
}

export function useRoutesState(): Dictionary<IRoute> {
  const routeServices = useRef<RouteService[]>([]);
  const [routesState, setRoutesState] = useState<Dictionary<IRoute>>(null);
  const routesIds = useSelector(RoutesSelectors.routesIds);

  const updateRouteState = useCallback((routeId: string, data: IRoute) => {
    setRoutesState((state) => ({
      ...state,
      [routeId]: { progress: 0, ...data },
    }));
  }, []);

  useEffect(() => handleRoutes(routesIds, updateRouteState, routeServices), [routesIds, updateRouteState]);

  useEffect(
    () => () => {
      routeServices.current.forEach((service) => service.clear());
      routeServices.current = [];
    },
    []
  );
  return { ...routesState };
}
