import React, { useContext, useMemo } from 'react';
import { ExtrudeGeometry, MeshBasicMaterial, Shape } from 'three';

import { ThemeContext } from '../../contexts/ThemeContext';
import { Color } from '../../canvas.model';

interface ObjectPlaneProps {
  fromGround: number;
  geometryShape: Shape;
  height: number;
  selected: boolean;
  color: Color;
}
export const ObjectPlane: React.FC<ObjectPlaneProps> = ({ geometryShape, height, fromGround, selected, color }) => {
  const theme = useContext(ThemeContext);

  const planeGeometry = useMemo(() => new ExtrudeGeometry(geometryShape, { depth: 0, bevelEnabled: false }), [
    geometryShape,
  ]);

  const material = useMemo(() => new MeshBasicMaterial({ color: selected ? color : theme.objects.D2.shape }), [
    selected,
    theme.objects.D2.shape,
    color,
  ]);

  return <mesh args={[planeGeometry]} position-z={fromGround} material={material} />;
};
