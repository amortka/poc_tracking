import React, { useMemo } from 'react';
import { Route } from './Route';
import { mapPointsToVectors } from './utils';
import { IVisualizationScene, IVisualizationState } from '../../canvas.model';

interface RoutesProps
  extends Pick<IVisualizationScene, 'paths' | 'points'>,
    Pick<IVisualizationState, 'routes' | 'vehicles'> {
  horizontalCamera: boolean;
}

export const Routes: React.FC<RoutesProps> = ({ paths, points, routes, vehicles, horizontalCamera }) => {
  const routePaths = useMemo(
    () =>
      Object.entries(paths).reduce(
        (acc, [pathId, pathData]) => ({
          ...acc,
          [pathId]: mapPointsToVectors(pathData.points, points),
        }),
        {}
      ),
    [paths, points]
  );

  return (
    <>
      {Object.entries(routes).map(([routeId, routeData]) => {
        return (
          <Route
            key={routeId}
            points={routePaths[routeData.path]}
            vehicle={vehicles[routeData.vehicle]}
            progress={routeData.progress}
            selected={routeData.selected}
            color={routeData.color}
            horizontalCamera={horizontalCamera}
          />
        );
      })}
    </>
  );
};
