import React from 'react';
import { RoutePath } from './RoutePath';
import { IRouteWithComputedData } from '../../canvas.model';
import { Vehicle } from '../Vehicle/Vehicle';
import { useRoundedPath } from './utils';

interface RouteProps extends IRouteWithComputedData {}

export const Route: React.FC<RouteProps> = ({ path, selected, progress }) => {
  const [roundedPath, proportion] = useRoundedPath(path, 0.3);
  const fixedProgress = proportion * progress;
  return (
    <>
      <Vehicle path={roundedPath} progress={fixedProgress > 1 ? 1 : fixedProgress} type={undefined} />
      {selected || true ? (
        <RoutePath distanceEnd={progress} distanceStart={0} color={0x11b572} linewidth={0.007} path={path} />
      ) : null}
    </>
  );
};
