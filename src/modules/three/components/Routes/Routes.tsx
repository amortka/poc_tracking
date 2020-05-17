import React, { useMemo } from 'react';
import { IVisualisationState, IVisualizationScene } from '../../../../models/main.model';
import { Route } from './Route';
import { RoutesUtils } from './routes.utils';

interface RoutesProps
  extends Pick<IVisualizationScene, 'paths' | 'points'>,
    Pick<IVisualisationState, 'routes' | 'vehicles'> {}

export const Routes: React.FC<RoutesProps> = React.memo(({ paths, points, routes, vehicles }) => {
  const renderRoute = useMemo(
    () => RoutesUtils.getRouteWithComputedData(paths, points, vehicles, routes).map((o, i) => <Route key={i} {...o} />),
    [paths, points, vehicles, routes]
  );

  return <React.Fragment>{renderRoute}</React.Fragment>;
});
