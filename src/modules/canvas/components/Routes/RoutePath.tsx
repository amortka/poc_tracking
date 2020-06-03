import { Line, Vector2, Vector3 } from 'three';
import React, { useMemo } from 'react';

import { Color } from '../../canvas.model';
import { useUpdate } from 'react-three-fiber';

export interface RoutePathProps {
  points: Vector2[];
  distanceStart: number; // value 0-1
  distanceEnd: number; // value 0-1
  lineWidth: number;
  colorStart?: Color;
  colorEnd?: Color;
  color?: Color;
  dashed?: boolean;
  dashScale?: number;
  dashSize?: number;
  gapSize?: number;
  opacity?: number;
}

export const RoutePath: React.FC<RoutePathProps> = ({ points, ...props }) => {
  const pointsVec3 = useMemo(() => {
    const fromGround = 0.03;
    return points.map((point) => new Vector3(point.x, point.y, fromGround));
  }, [points]);

  const ref = useUpdate<Line>(
    (line) => {
      line.computeLineDistances();
    },
    [points, props.distanceStart, props.distanceEnd]
  );

  const geometryProps = {
    distanceStart: props.distanceStart,
    distanceEnd: props.distanceEnd,
    colorStart: props.colorStart,
    colorEnd: props.colorEnd,
  };

  const materialProps = {
    color: props.color,
    linewidth: props.lineWidth,
    vertexColors: !props.color,
    dashed: props.dashed,
    gapSize: props.gapSize,
    dashScale: props.dashScale,
    dashSize: props.dashSize,
    defines: props.dashed ? { USE_DASH: '' } : null,
  };

  return (
    <line2 ref={ref}>
      <lineSegmentGeometry
        attach="geometry"
        args={[pointsVec3, geometryProps]}
        points={pointsVec3}
        {...geometryProps}
      />
      <lineMaterial attach="material" {...materialProps} />
    </line2>
  );
};
