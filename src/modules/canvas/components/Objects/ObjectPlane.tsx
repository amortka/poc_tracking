import React, { useContext, useMemo } from 'react';
import { ExtrudeGeometry, Shape } from 'three';

import { ThemeContext } from '../../contexts/ThemeContext';

interface ObjectPlaneProps {
  fromGround: number;
  geometryShape: Shape;
  height: number;
  selected: boolean;
}
export const ObjectPlane: React.FC<ObjectPlaneProps> = ({ geometryShape, height, fromGround, selected }) => {
  const theme = useContext(ThemeContext);

  const planeGeometry = useMemo(() => new ExtrudeGeometry(geometryShape, { depth: 0, bevelEnabled: false }), [
    geometryShape,
  ]);
  return (
    <mesh args={[planeGeometry]} position-z={fromGround}>
      <meshPhongMaterial attach="material" color={selected ? theme.objects.D2.line : theme.objects.D2.shape} />
    </mesh>
  );
};
