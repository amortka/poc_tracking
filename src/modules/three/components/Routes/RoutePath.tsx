import * as THREE from 'three';
import React from 'react';
import { IPathWithPointsCoordinates } from '../../canvas.model';
import { LineUtils } from '../../utils/line.utils';

export interface RoutePathProps extends IPathWithPointsCoordinates {
  distanceStart: number; // value 0-1
  distanceEnd: number; // value 0-1
  linewidth: number;
  colorStart?: THREE.Color | string | number;
  colorEnd?: THREE.Color | string | number;
  color?: number;
  dashed?: boolean;
  dashScale?: number;
  dashSize?: number;
  gapSize?: number;
  opacity?: number;
}

export const RoutePath: React.FC<RoutePathProps> = React.memo(({ points, tag, ...config }) => {
  const fromGround = 0.03;
  const pointsV = LineUtils.getPathPointsFromPointCoordinates(points, fromGround);

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
      <lineSegmentGeometry attach="geometry" args={[pointsV, geometryConfig]} />
      <lineMaterial attach="material" args={[materialConfig]} />
    </line2>
  );
});
