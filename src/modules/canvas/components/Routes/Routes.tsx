import React, { useMemo } from 'react';
import { Route } from './Route';
import { mapPointsToVectors } from './utils';
import { IVisualizationScene, IVisualizationState } from '../../canvas.model';

interface RoutesProps
  extends Pick<IVisualizationScene, 'paths' | 'points'>,
    Pick<IVisualizationState, 'routes' | 'vehicles'> {
  horizontalCamera: boolean;
}

const routesSet = new Set();
export const Routes: React.FC<RoutesProps> = ({ paths, points, routes, vehicles, horizontalCamera }) => {
  const routesIds = Object.keys(routes);
  routesIds.forEach((id) => routesSet.add(id));
  console.log({ routesSet });

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
      {routes &&
        Object.entries(routes).map(([routeId, routeData]) => {
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
