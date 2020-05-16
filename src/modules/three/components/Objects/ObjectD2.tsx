import React, { useContext, useMemo, useCallback } from 'react';
import { BufferGeometry, ExtrudeGeometry } from 'three';
import { IObjectWithPointsCoordinates } from '../../canvas.model';
import { LineUtils } from '../../utils/line.utils';
import { ThemeContext } from '../../contexts/ThemeContext';
import { ShapeUtils } from '../../utils/shape.utils';
import { GeometryUtils } from '../../utils/geometry.utils';
import { EventType, ObjectType, useEmitEvent } from '../../contexts/EventsContext';
import { Label2D } from './Label2D';

export interface WallProps extends IObjectWithPointsCoordinates {}

const extrudeSettings = { depth: 0, bevelEnabled: false };

export const ObjectD2: React.FC<WallProps> = ({ meta, shapePoints, fromGround = 0.001, ...props }) => {
  const theme = useContext(ThemeContext);
  const emitEvent = useEmitEvent({ meta, shapePoints, fromGround, ...props }, ObjectType.OBJECT);

  const lineGeometry = useMemo(() => {
    const points = LineUtils.getPathPointsFromPointCoordinates(shapePoints, fromGround);
    return new BufferGeometry().setFromPoints(points);
  }, [shapePoints, fromGround]);

  const planeGeometry = useMemo(() => {
    const geometryShape = ShapeUtils.getShapeFromPointCoordinates(shapePoints);

    return new ExtrudeGeometry(geometryShape, extrudeSettings);
  }, [shapePoints]);

  const handleClick = useCallback((e) => emitEvent(EventType.MOUSE_CLICK), [emitEvent]);
  const handlePointerOver = useCallback((e) => emitEvent(EventType.MOUSE_IN), [emitEvent]);
  const handlePointerOut = useCallback((e) => emitEvent(EventType.MOUSE_OUT), [emitEvent]);

  // const shapeCenterV: Vector2 = GeometryUtils.getGeometryCenterFromPointCoordinates(shapePoints);

  // const textNamePositionV = new Vector3(...shapeCenterV.toArray(), 0).add(
  //   new Vector3(shapePoints[0].x, shapePoints[0].y, fromGround + 0.001)
  // );
  // const contextDescriptionPositionV = textNamePositionV.clone().add(new Vector3(0, -0.2, 0));

  return (
    <group>
      {/* {meta ?
        <Label2D title={meta.name} description={meta.description} />
      : null} */}
      <mesh
        args={[planeGeometry]}
        position-z={fromGround}
        onClick={handleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}>
        <meshPhongMaterial
          attach="material"
          color={theme.objects.D2.shape}
          transparent={true}
          opacity={0.3}
          depthWrite={false}
        />
      </mesh>
      <lineLoop args={[lineGeometry]}>
        <lineBasicMaterial attach="material" color={theme.objects.D2.line} />
      </lineLoop>
    </group>
  );
};
