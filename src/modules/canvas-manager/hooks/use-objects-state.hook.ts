import { useSelector } from 'react-redux';
import { useMemo } from 'react';

import { Dictionary } from '../../../app.model';
import { IObjectStateMeta, IPath, IRoute, IVisualizationScene } from '../../canvas/canvas.model';
import { ObjectsSelectors } from '../../../store/objects/objects.selectors';

export function useObjectsState(
  routesState: Dictionary<IRoute>,
  scene: IVisualizationScene
): Dictionary<IObjectStateMeta> {
  const objectsState = useSelector(ObjectsSelectors.objects);

  const selectedRouteEntry = Object.entries(routesState).find(([, routeData]) => routeData.selected) || [];
  const selectedRouteData = selectedRouteEntry[1];
  const selectedPathId: string = selectedRouteEntry[1]?.path;

  const pathObjects: IPath['objects'] = scene.paths[selectedPathId]?.objects;
  const progress: number = selectedRouteData?.progress;

  return useMemo(
    () => {
      if (!pathObjects || typeof progress !== 'number') return objectsState;

      const newObjectsState = { ...objectsState };
      const objectsLength = pathObjects.length;

      pathObjects.forEach(({ objectId, distance }, index) => {
        newObjectsState[objectId] = { ...newObjectsState[objectId] };
        newObjectsState[objectId].selected = (1 / (objectsLength + 1)) * (index + 1) > progress;
      });

      return newObjectsState;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pathObjects, progress]
  );
}
