import React, { useContext, useMemo } from 'react';
import { ExtrudeGeometry, Shape } from 'three';

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

  return (
    <mesh
      args={[planeGeometry]}
      position-z={fromGround + 0.001}
      onClick={meta.selectable && handleClick}
      onPointerOver={meta.selectable && handlePointerOver}
      onPointerOut={meta.selectable && handlePointerOut}>
      <meshPhongMaterial
        attach="material"
        color={selected ? theme.objects.D2.line : theme.objects.D2.shape}
        transparent={true}
        opacity={0.3}
        depthWrite={false}
      />
    </mesh>
  );
};
