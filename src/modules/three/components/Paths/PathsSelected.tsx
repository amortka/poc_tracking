import * as THREE from 'three';
import React, { useRef } from 'react';
import { IPathWithPointsCoordinates } from '../../canvas.model';
import { LineUtils } from '../../utils/line.utils';

export interface PathsDefaultProps extends IPathWithPointsCoordinates {
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

export const PathsSelected: React.FC<PathsDefaultProps> = React.memo(({ points, tag, ...config }) => {
  const fromGround = useRef(0.03);
  const pointsV = LineUtils.getPathPointsFromPointCoordinates(points, fromGround.current);

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
