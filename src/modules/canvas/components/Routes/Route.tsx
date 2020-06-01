import React, { useContext } from 'react';
import { Vector2 } from 'three';

import { IRouteWithComputedData } from '../../canvas.model';
import { RoutePath } from './RoutePath';
import { ThemeContext } from '../../contexts/ThemeContext';
import { Vehicle } from '../Vehicle/Vehicle';
import { useAnimationPath, useVehicleUpdate } from './utils';

interface RouteProps extends IRouteWithComputedData {
  points: Vector2[];
}

export const Route: React.FC<RouteProps> = ({ points, selected, progress, color }) => {
  const theme = useContext(ThemeContext);
  const { animationPath, progressToIndexMap } = useAnimationPath(points);
  const { position, rotationTangent } = useVehicleUpdate(animationPath, progress, progressToIndexMap);

  return (
    <>
      <Vehicle position={position} rotation={rotationTangent} type={undefined} color={color} />
      {selected ? (
        <>
          <RoutePath
            distanceEnd={progress}
            distanceStart={0}
            color={theme.routes.line}
            lineWidth={theme.routes.lineWidth}
            points={points}
            dashed
            dashScale={1}
            dashSize={theme.routes.dashSize}
            gapSize={theme.routes.gapSize}
          />
          <RoutePath
            distanceEnd={1}
            distanceStart={progress}
            color={theme.routes.line}
            lineWidth={theme.routes.lineWidth}
            points={points}
          />
        </>
      ) : null}
    </>
  );
};
