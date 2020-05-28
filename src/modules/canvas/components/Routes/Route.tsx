import React from 'react';
import { RoutePath } from './RoutePath';
import { IRouteWithComputedData } from '../../canvas.model';
import { Vehicle } from '../Vehicle/Vehicle';
import { useAnimationPath, useVehicleUpdate } from './utils';

interface RouteProps extends IRouteWithComputedData {
  points: THREE.Vector2[];
}

export const Route: React.FC<RouteProps> = ({ points, selected, progress }) => {
  const { animationPath, progressToIndexMap } = useAnimationPath(points);
  const { position, rotationTangent } = useVehicleUpdate(animationPath, progress, progressToIndexMap);

  return (
    <>
      <Vehicle position={position} rotation={rotationTangent} type={undefined} />
      {selected || true ? (
        <RoutePath distanceEnd={progress} distanceStart={0} color={0x11b572} linewidth={0.007} points={points} />
      ) : null}
    </>
  );
};
