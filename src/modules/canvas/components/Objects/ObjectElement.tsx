import React, { useMemo } from 'react';
import { Vector3 } from 'three';

import { IObjectWithPointsCoordinates } from '../../canvas.model';
import { ObjectExtruded } from './ObjectExtruded';
import { ObjectLabel } from './ObjectLabel';
import { ObjectLine } from './ObjectLine';
import { ObjectPlane } from './ObjectPlane';
import { ObjectsUtils } from './objects.utils';
import { ShapeUtils } from '../../utils/shape.utils';

interface ObjectD2Props extends IObjectWithPointsCoordinates {}

export const ObjectElement: React.FC<ObjectD2Props> = ({ meta, shapePoints, fromGround = 0.001, height = 0 }) => {
  const geometryShape = useMemo(() => ShapeUtils.getShapeFromPointCoordinates(shapePoints), [shapePoints]);

  const labelPosition: Vector3 = useMemo(
    () => ObjectsUtils.getLabelPosition(geometryShape, fromGround / 2).setZ(fromGround + 0.004),
    [geometryShape, fromGround]
  );

  return (
    <group>
      <ObjectExtruded
        fromGround={fromGround}
        meta={meta}
        geometryShape={geometryShape}
        height={height}
        selected={meta.selected}
      />
      <ObjectPlane fromGround={fromGround} geometryShape={geometryShape} height={height} selected={meta.selected} />
      <ObjectLine shapePoints={shapePoints} fromGround={fromGround} />
      {meta && (
        <ObjectLabel
          title={meta.name}
          description={meta.description}
          position={labelPosition}
          textSize={meta.textSize}
          textRotation={meta.textRotation}
          selected={meta.selected}
        />
      )}
    </group>
  );
};
