import React, { useContext, useMemo } from 'react';
import { ExtrudeGeometry, MeshPhongMaterial, Shape } from 'three';

import { IObjectWithPointsCoordinates } from '../../canvas.model';
import { ThemeContext } from '../../contexts/ThemeContext';
import { useMouseEvent } from '../../hooks/use-mouse-event.hook';

interface ObjectExtrudedProps {
  id: string;
  fromGround: number;
  meta: IObjectWithPointsCoordinates['meta'];
  geometryShape: Shape;
  height: number;
  selected: boolean;
}
export const ObjectExtruded: React.FC<ObjectExtrudedProps> = ({
  id,
  geometryShape,
  height,
  fromGround,
  selected,
  meta,
}) => {
  const theme = useContext(ThemeContext);
  const [handleClick, handlePointerOver, handlePointerOut] = useMouseEvent({ id, meta: meta as any });

  const planeGeometry = useMemo(() => new ExtrudeGeometry(geometryShape, { depth: height, bevelEnabled: false }), [
    geometryShape,
    height,
  ]);

  const material = useMemo(
    () =>
      new MeshPhongMaterial({
        transparent: true,
        opacity: 0.3,
        depthWrite: false,
        color: selected ? theme.objects.D2.line : theme.objects.D2.shape,
      }),
    [selected, theme.objects.D2.line, theme.objects.D2.shape]
  );

  return (
    <mesh
      args={[planeGeometry]}
      position-z={fromGround + 0.001}
      onClick={meta.selectable && handleClick}
      onPointerOver={meta.selectable && handlePointerOver}
      onPointerOut={meta.selectable && handlePointerOut}
      material={material}
    />
  );
};
