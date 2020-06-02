import React, { useMemo } from 'react';
import { Vector3 } from 'three';

import { useMemoDistinct } from '../../hooks/use-memo-distinct.hook';
import { GeometryUtils } from '../../utils/geometry.utils';
import { equal } from '../../../../utils/object.utils';
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
  const indicatorPosition: Vector3 = useMemoDistinct(
    () => {
      const shapeGeometry = GeometryUtils.getGeometryFromPointCoordinates(shapePoints);
      shapeGeometry.computeBoundingBox();
      const boundingBox = shapeGeometry.boundingBox;
      const xPosition = (boundingBox.max.x - boundingBox.min.x) / 2 + boundingBox.min.x;

      return new Vector3(xPosition, shapeGeometry.boundingBox.min.y - 0.05, fromGround + depth);
    },
    [shapePoints],
    equal
  );

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
