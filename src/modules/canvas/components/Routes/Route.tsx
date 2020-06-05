import React, { useContext } from 'react';
import { Vector2 } from 'three';

import { IRouteWithComputedData } from '../../canvas.model';
import { RoutePath } from './RoutePath';
import { ThemeContext } from '../../contexts/ThemeContext';
import { Vehicle } from '../Vehicle/Vehicle';
import { useAnimationPath, useVehicleUpdate } from './utils';
import { useMoveCameraToPosition } from '../Cameras/hooks/use-move-camera-to.position.hook';
import { VehicleDot } from '../Vehicle/VehicleDot';

interface RouteProps extends IRouteWithComputedData {
  points: Vector2[];
  horizontalCamera: boolean;
}

export const Route: React.FC<RouteProps> = ({ points, selected, progress = 0, color, horizontalCamera }) => {
  const theme = useContext(ThemeContext);
  const { animationPath, progressToIndexMap } = useAnimationPath(points);
  const { position, rotationTangent } = useVehicleUpdate(animationPath, progress, progressToIndexMap);

  useMoveCameraToPosition(horizontalCamera, position);

  return (
    <>
      {horizontalCamera ? (
        <VehicleDot position={position} />
      ) : (
        <Vehicle position={position} rotation={rotationTangent} color={color} />
      )}
      {selected ? (
        <>
          <RoutePath
            distanceEnd={progress}
            distanceStart={0}
            color={theme.routes.line}
            lineWidth={theme.routes.lineWidth}
            points={points}
            dashed={true}
            gapSize={theme.routes.gapSize}
            dashScale={theme.routes.dashScale}
            dashSize={theme.routes.dashSize}
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
