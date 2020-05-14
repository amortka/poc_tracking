import React, { useMemo } from 'react';
import { Path } from 'three';
import { IVisualization } from '../../../../models/main.model';
import { Route } from './Route';
import { mapPointsToPath, mapSensorDictionaryToDistanceMap } from './utils';

interface RoutesProps extends Pick<IVisualization, 'paths' | 'points'> {}

export const Routes: React.FC<RoutesProps> = ({ paths, points }) => {
  const routesProps = useMemo(
    () =>
      Object.entries(paths).map(([pathId, pathData]) => ({
        key: pathId,
        path: new Path(mapPointsToPath(pathData.points, points)),
        segments: mapSensorDictionaryToDistanceMap(pathData.sensors),
      })),
    [paths, points]
  );

  return (
    <>
      {routesProps.map((routeProps) => (
        <Route {...routeProps} />
      ))}
    </>
  );
};
