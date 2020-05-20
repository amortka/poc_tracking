import React, { useMemo } from 'react';
import { IVisualisationState, IVisualizationScene } from '../../../../models/main.model';
import { Route } from './Route';
import { Path } from 'three';
import { mapPointsToPath } from './utils';

interface RoutesProps
  extends Pick<IVisualizationScene, 'paths' | 'points'>,
    Pick<IVisualisationState, 'routes' | 'vehicles'> {}

export const Routes: React.FC<RoutesProps> = ({ paths, points, routes, vehicles }) => {
  const routePaths = useMemo(
    () =>
      Object.entries(paths).reduce(
        (acc, [pathId, pathData]) => ({
          ...acc,
          [pathId]: new Path(mapPointsToPath(pathData.points, points)),
        }),
        {}
      ),
    [paths, points]
  );

  return (
    <>
      {Object.entries(routes).map(([routeId, routeData]) => (
        <Route
          key={routeId}
          path={routePaths[routeData.path]}
          vehicle={vehicles[routeData.vehicle]}
          progress={routeData.progress}
          selected={routeData.selected}
        />
      ))}
    </>
  );
};
