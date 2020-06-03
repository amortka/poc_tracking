import React, { useMemo } from 'react';
import { Vector3 } from 'three';

import { GeometryUtils } from '../../utils/geometry.utils';
import { ColorUtils } from '../../utils/color.utils';

interface ObjectResourceIndicatorProps {
  shapePoints;
  fromGround: number;
  value: number;
  width?: number;
  height?: number;
  depth?: number;
}

export const ObjectResourceIndicator: React.FC<ObjectResourceIndicatorProps> = ({
  shapePoints,
  fromGround,
  value,
  width = 0.5,
  height = 0.05,
  depth = 0.25,
}) => {
  const indicatorPosition: Vector3 = useMemo(() => {
    const shapeGeometry = GeometryUtils.getGeometryFromPointCoordinates(shapePoints);
    shapeGeometry.computeBoundingBox();
    const boundingBox = shapeGeometry.boundingBox;
    const xPosition = (boundingBox.max.x - boundingBox.min.x) / 2 + boundingBox.min.x;

    return new Vector3(xPosition, shapeGeometry.boundingBox.min.y - 0.05, fromGround + depth);
  }, [shapePoints, depth, fromGround]);

  const color = useMemo(() => ColorUtils.calculateMiddleColor('red', 'green', value), [value]);

  return (
    <group>
      <mesh position={indicatorPosition}>
        <boxGeometry attach="geometry" args={[width * value, height, depth]} />
        <meshBasicMaterial attach="material" color={color} />
      </mesh>
    </group>
  );
};
