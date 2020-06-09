import { useMemo } from 'react';

import { IRoute, IVisualizationScene } from '../../canvas/canvas.model';
import { Dictionary } from '../../../app.model';
import { useRoutesState } from '../../canvas-manager/hooks/use-routes-state.hook';

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

      const routeStateNormalized = { [selectedRouteId]: { ...routesState[selectedRouteId] } };
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
