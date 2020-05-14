import React from 'react';
import { RoutePath } from './RoutePath';
import { IRouteWithComputedData } from '../../canvas.model';

interface RouteProps extends IRouteWithComputedData {}

export const Route: React.FC<RouteProps> = React.memo(({ path, selected }) => {
  return (
    <>
      {/*{ Here VehicleComponent}*/}
      {selected && <RoutePath distanceEnd={0.9} distanceStart={0} color={0x11b572} linewidth={0.003} {...path} />}
    </>
  );
});
