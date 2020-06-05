import { MutableRefObject, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { Dictionary } from '../../../app.model';
import { IRoute, IVisualizationScene } from '../../canvas/canvas.model';
import { RouteService } from '../services/routes-progress.service';
import { RoutesSelectors } from '../../../store/routes/routes.selectors';

function getRoutesIdChanges(routesId: string[], routesIdSet: Set<string>): string[] {
  const difference = [...routesId].filter((id) => !routesIdSet.has(id));
  routesIdSet.clear();
  routesId.forEach((r) => routesIdSet.add(r));

  return difference;
}

function handleRoutes(
  routesId: string[],
  setStateCallback: (routeId: string, data: IRoute) => void,
  routeServices: MutableRefObject<RouteService[]>,
  routesIdSet: Set<string>
): void {
  getRoutesIdChanges(routesId, routesIdSet).forEach((routeId) =>
    routeServices.current.push(new RouteService(routeId, setStateCallback))
  );
}

export function useRoutesState(routesIdSet: Set<string>): Dictionary<IRoute> {
  const routeServices = useRef<RouteService[]>([]);
  const [routesState, setRoutesState] = useState<Dictionary<IRoute>>(null);
  const routesIds = useSelector(RoutesSelectors.routesIds);

  const updateRouteState = useCallback((routeId: string, data: IRoute) => {
    setRoutesState((state) => ({
      ...state,
      [routeId]: { progress: 0, ...data },
    }));
  }, []);

  useEffect(() => handleRoutes(routesIds, updateRouteState, routeServices, routesIdSet), [
    routesIds,
    updateRouteState,
    routesIdSet,
  ]);

  useEffect(
    () => () => {
      routeServices.current.forEach((service) => service.clear());
      routeServices.current = [];
    },
    []
  );
  return { ...routesState };
}

export function useRoutesStateNormalized(routesIdSet: Set<string>, scene: IVisualizationScene): Dictionary<IRoute> {
  const routesState = useRoutesState(routesIdSet);

  const selectedRouteEntry = Object.entries(routesState).find(([, routeData]) => routeData.selected) || [];

  const selectedRouteId: string = selectedRouteEntry[0];
  const selectedRouteData = selectedRouteEntry[1];
  const selectedRouteProgress = selectedRouteData?.progress;
  const selectedPathId: string = selectedRouteEntry[1]?.path;
  const progressReal = routesState[selectedRouteId]?.progress;

  const routeStateNormalized = useMemo(
    () => {
      if (!selectedRouteId) return routesState;
      const pathObjects = scene.paths[selectedPathId].objects;
      const sectionsLength = (pathObjects?.length || 0) + 1;
      const sectionProgressValue = 1 / sectionsLength;

      const routeStateNormalized = { ...routesState, [selectedRouteId]: { ...routesState[selectedRouteId] } };
      let progressNormalized: number;

      let currentSection: number = pathObjects.findIndex(({ distance }, index) => {
        return progressReal < distance;
      });
      currentSection = currentSection === -1 ? sectionsLength - 1 : currentSection;

      const currentSectionProgress =
        (progressReal - (pathObjects[currentSection - 1]?.distance || 0)) /
        ((pathObjects[currentSection]?.distance || 1) - (pathObjects[currentSection - 1]?.distance || 0));
      progressNormalized = sectionProgressValue * currentSection + sectionProgressValue * currentSectionProgress;

      routeStateNormalized[selectedRouteId].progress = progressNormalized;

      return routeStateNormalized;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedRouteProgress]
  );

  return routeStateNormalized;
}
