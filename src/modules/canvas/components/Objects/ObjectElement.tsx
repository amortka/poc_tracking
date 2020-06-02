import React, { useMemo } from 'react';
import { Shape, Vector3 } from 'three';

import { IObjectWithPointsCoordinates } from '../../canvas.model';
import { ObjectExtruded } from './ObjectExtruded';
import { ObjectLabel } from './ObjectLabel';
import { ObjectLine } from './ObjectLine';
import { ObjectPlane } from './ObjectPlane';
import { ObjectsUtils } from './objects.utils';
import { ShapeUtils } from '../../utils/shape.utils';
import { ObjectResourceIndicator } from './ObjectResourceIndicator';
import { equal } from '../../../../utils/object.utils';
import { useMemoDistinct } from '../../hooks/use-memo-distinct.hook';

interface ObjectD2Props extends IObjectWithPointsCoordinates {}

export const ObjectElement: React.FC<ObjectD2Props> = ({ id, meta, shapePoints, fromGround = 0.001, height = 0 }) => {
  const geometryShape: Shape = useMemoDistinct(
    () => ShapeUtils.getShapeFromPointCoordinates(shapePoints),
    [shapePoints],
    equal
  );

  const labelPosition: Vector3 = useMemo(() => {
    return ObjectsUtils.getLabelPosition(geometryShape, fromGround / 2).setZ(fromGround + 0.004);
  }, [geometryShape, fromGround]);

  return (
    <group>
      <ObjectExtruded
        fromGround={fromGround}
        geometryShape={geometryShape}
        height={height}
        id={id}
        meta={meta}
        selected={meta.selected}
      />
      <ObjectPlane
        fromGround={fromGround}
        geometryShape={geometryShape}
        height={height}
        selected={meta.selected}
        color={meta.color}
      />
      <ObjectLine shapePoints={shapePoints} fromGround={fromGround} color={meta.color} selected={meta.selected} />
      {meta && (
        <ObjectLabel
          description={meta.description}
          position={labelPosition}
          selected={meta.selected}
          textRotation={meta.textRotation}
          textSize={meta.textSize}
          title={meta.name}
        />
      )}
      {meta?.visibleResourceIndicator && meta?.resourceIndicator && (
        <ObjectResourceIndicator fromGround={fromGround} value={meta.resourceIndicator} shapePoints={shapePoints} />
      )}
    </group>
  );
};
