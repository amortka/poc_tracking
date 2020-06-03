import React, { useMemo } from 'react';
import { Shape, Vector3 } from 'three';

import { IObjectState } from '../../../../store/objects/objects.model';
import { IObjectWithPointsCoordinates } from '../../canvas.model';
import { ObjectExtruded } from './ObjectExtruded';
import { ObjectLabel } from './ObjectLabel';
import { ObjectLine } from './ObjectLine';
import { ObjectPlane } from './ObjectPlane';
import { ObjectResourceIndicator } from './ObjectResourceIndicator';
import { ObjectsUtils } from './objects.utils';
import { ShapeUtils } from '../../utils/shape.utils';

interface ObjectElementProps extends IObjectWithPointsCoordinates {
  state: IObjectState;
}

export const ObjectElement: React.FC<ObjectElementProps> = ({
  id,
  meta,
  shapePoints,
  fromGround = 0.001,
  height = 0,
  state,
}) => {
  const geometryShape: Shape = useMemo(() => ShapeUtils.getShapeFromPointCoordinates(shapePoints), [shapePoints]);

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
        selected={state?.selected}
      />
      <ObjectPlane
        fromGround={fromGround}
        geometryShape={geometryShape}
        height={height}
        selected={state?.selected}
        color={state?.color}
      />
      <ObjectLine shapePoints={shapePoints} fromGround={fromGround} color={state?.color} selected={state?.selected} />
      {meta && (
        <ObjectLabel
          description={meta.description}
          position={labelPosition}
          selected={state?.selected}
          textRotation={meta.textRotation}
          textSize={meta.textSize}
          title={meta.name}
        />
      )}
      {state?.visibleResourceIndicator && state?.resourceIndicator && (
        <ObjectResourceIndicator fromGround={fromGround} value={state.resourceIndicator} shapePoints={shapePoints} />
      )}
    </group>
  );
};
