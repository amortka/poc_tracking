import React, { useContext, useMemo } from 'react';
import { Box3, Object3D } from 'three';

import { GeometryUtils } from '../../utils/geometry.utils';
import { useUpdate } from 'react-three-fiber';
import { ThemeContext } from '../../contexts/ThemeContext';

interface ObjectResourceIndicatorProps {
  shapePoints;
  fromGround: number;
  value: number;
  width?: number;
  height?: number;
  depth?: number;
  adjustWidthToObjectBox?: boolean;
}

export const ObjectResourceIndicator: React.FC<ObjectResourceIndicatorProps> = ({
  shapePoints,
  fromGround,
  value,
  width = 0.5,
  height = 0.05,
  depth = 0.05,
  adjustWidthToObjectBox = true,
}) => {
  const theme = useContext(ThemeContext);

  const boundingBox: Box3 = useMemo(() => {
    const shapeGeometry = GeometryUtils.getGeometryFromPointCoordinates(shapePoints);
    shapeGeometry.computeBoundingBox();
    return shapeGeometry.boundingBox;
  }, [shapePoints]);

  if (adjustWidthToObjectBox) {
    width = boundingBox.max.x - boundingBox.min.x;
  }

  const firstRef = useUpdate(
    (mesh: Object3D) => {
      mesh.position.set((width * value) / 2, 0, 0);
    },
    [width, value]
  );

  const secondRef = useUpdate(
    (mesh: Object3D) => {
      mesh.position.set((width * (1 - value)) / 2 + width * value, 0, 0);
    },
    [width, value]
  );

  const groupRef = useUpdate(
    (group: Object3D) => {
      const x = (boundingBox.max.x - boundingBox.min.x) / 2 + boundingBox.min.x - width / 2;
      const y = boundingBox.min.y - 0.05;
      const z = fromGround + depth / 1.5;
      group.position.set(x, y, z);
    },
    [boundingBox, depth, fromGround, width]
  );

  const color = useMemo(() => {
    if (value > 0.7) {
      return theme.objects.D2.indicatorMaxColor;
    } else if (value > 0.3) {
      return theme.objects.D2.indicatorMidColor;
    } else {
      return theme.objects.D2.indicatorMinColor;
    }
  }, [
    value,
    theme.objects.D2.indicatorMinColor,
    theme.objects.D2.indicatorMaxColor,
    theme.objects.D2.indicatorMidColor,
  ]);

  return (
    <group ref={groupRef}>
      <mesh ref={firstRef}>
        <boxGeometry attach="geometry" args={[width * value, height, depth]} />
        <meshBasicMaterial attach="material" color={color} />
      </mesh>
      <mesh ref={secondRef}>
        <boxGeometry attach="geometry" args={[width * (1 - value), height, depth]} />
        <meshBasicMaterial attach="material" color={theme.objects.D2.indicatorBackground} />
      </mesh>
    </group>
  );
};
