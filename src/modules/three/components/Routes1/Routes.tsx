import React, { useMemo } from 'react';
import { Path } from 'three';
import { IVisualizationScene, VehicleAnimation } from '../../../../models/main.model';
import { Route1 } from './Route';
import { mapPointsToPath, mapSensorDictionaryToDistanceMap } from './utils';

interface RoutesProps extends Pick<IVisualizationScene, 'paths' | 'points'> {
  // TODO Use shared Vehicle interface
  vehicles: VehicleAnimation[];
}

export const Routes1: React.FC<RoutesProps> = ({ paths, points, vehicles }) => {
  const routesProps = useMemo(
    () =>
      Object.entries(paths).map(([pathId, pathData]) => ({
        pathId,
        path: new Path(mapPointsToPath(pathData.points, points)),
        segments: mapSensorDictionaryToDistanceMap(pathData.sensors),
      })),
    [paths, points]
  );

  const vehiclesProps = useMemo(() => {
    return vehicles.reduce((acc, vehicle) => {
      const { pathId, ...vehicleProps } = vehicle;
      if (!acc[pathId]) acc[pathId] = [];

      acc[pathId].push(vehicleProps);

      return acc;
    }, {});
  }, [vehicles]);

  return (
    <>
      {routesProps.map((route) => (
        <Route1 key={route.pathId} path={route.path} vehicles={vehiclesProps[route.pathId] || []} />
      ))}
    </>
  );
};
