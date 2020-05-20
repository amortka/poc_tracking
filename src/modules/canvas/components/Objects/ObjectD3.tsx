import React from 'react';
import { IObjectWithPointsCoordinates } from '../../canvas.model';
import { ShapeUtils } from '../../utils/shape.utils';

export interface ObjectD3Props extends IObjectWithPointsCoordinates {}

export const ObjectD3: React.FC<ObjectD3Props> = React.memo(({ shapePoints, height = 1, meta }) => {
  const objectS = ShapeUtils.getShapeFromPointCoordinates(shapePoints);

  const extrudeSettings = {
    steps: 2,
    depth: height,
    bevelEnabled: false,
  };

  return (
    <mesh>
      <extrudeGeometry attach="geometry" args={[objectS, extrudeSettings]} />
      <meshPhongMaterial attach="material" color={'blue'} transparent={true} opacity={0.5} depthWrite={false} />
    </mesh>
  );
});
