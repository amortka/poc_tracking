import React, { useContext } from 'react';
import { Vector2 } from 'three';

import { IRouteWithComputedData } from '../../canvas.model';
import { RoutePath } from './RoutePath';
import { ThemeContext } from '../../contexts/ThemeContext';
import { useAnimationPath, useVehicleUpdate } from './utils';
import { Vehicle } from '../Vehicle/Vehicle';

interface RouteProps extends IRouteWithComputedData {
  points: Vector2[];
}

export const Route: React.FC<RouteProps> = ({ points, selected, progress, color }) => {
  const { animationPath, progressToIndexMap } = useAnimationPath(points);
  const { position, rotationTangent } = useVehicleUpdate(animationPath, progress, progressToIndexMap);
  const theme = useContext(ThemeContext);

  return (
    <>
      <Vehicle position={position} rotation={rotationTangent} type={undefined} color={color} />
      {selected ? (
        <RoutePath
          distanceEnd={1}
          distanceStart={progress}
          color={theme.routes.line}
          lineWidth={theme.routes.lineWidth}
          points={points}
        />
      ) : null}
    </>
  );
};
