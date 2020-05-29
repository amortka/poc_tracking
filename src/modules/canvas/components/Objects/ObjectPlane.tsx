import React, { useContext, useMemo } from 'react';
import { ExtrudeGeometry, MeshBasicMaterial, Shape } from 'three';

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

  const material = useMemo(
    () => new MeshBasicMaterial({ color: selected ? theme.objects.D2.line : theme.objects.D2.shape }),
    [selected, theme.objects.D2.line, theme.objects.D2.shape]
  );

  return <mesh args={[planeGeometry]} position-z={fromGround} material={material} />;
};
