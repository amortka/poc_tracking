import { Color, Vector3 } from 'three';
import React, { useMemo } from 'react';

export interface RoutePathProps {
  points: THREE.Vector2[];
  distanceStart: number; // value 0-1
  distanceEnd: number; // value 0-1
  linewidth: number;
  colorStart?: Color | string | number;
  colorEnd?: Color | string | number;
  color?: number;
  dashed?: boolean;
  dashScale?: number;
  dashSize?: number;
  gapSize?: number;
  opacity?: number;
}

export const RoutePath: React.FC<RoutePathProps> = ({ points, ...config }) => {
  const pointsVec3 = useMemo(() => {
    const fromGround = 0.03;
    return points.map((point) => new Vector3(point.x, point.y, fromGround));
  }, [points]);

  const geometryConfig = {
    distanceStart: config.distanceStart,
    distanceEnd: config.distanceEnd,
    colorStart: config.colorStart,
    colorEnd: config.colorEnd,
  };

  const materialConfig = {
    color: config.color,
    linewidth: config.linewidth,
    vertexColors: !config.color,
    dashed: config.dashed,
    gapSize: config.gapSize,
    dashScale: config.dashScale,
    dashSize: config.dashSize,
  };

  return (
    <line2>
      <lineSegmentGeometry
        attach="geometry"
        // TODO cannot remove args but still needs to react on any points change
        args={[pointsVec3, geometryConfig]}
        points={pointsVec3}
        {...geometryConfig}
      />
      <lineMaterial attach="material" {...materialConfig} />
    </line2>
  );
};
