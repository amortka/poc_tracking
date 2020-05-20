import React from 'react';
import { RoutePath } from './RoutePath';
import { IRouteWithComputedData } from '../../canvas.model';
import { Vehicle } from '../Vehicle/Vehicle';

interface RouteProps extends IRouteWithComputedData {}

export const Route: React.FC<RouteProps> = ({ path, selected, progress }) => {
  return (
    <>
      <Vehicle path={path} progress={progress} type={undefined} />
      {selected ? (
        <RoutePath distanceEnd={progress} distanceStart={0} color={0x11b572} linewidth={0.007} path={path} />
      ) : null}
    </>
  );
};
