import React, { useContext, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { IObjectWithPointsCoordinates } from '../../canvas.model'
import { LineUtils } from '../../utils/line.utils'
import { ThemeContext } from '../../contexts/ThemeContext'
import { ShapeUtils } from '../../utils/shape.utils'
import { Text } from '../Text'
import { GeometryUtils } from '../../utils/geometry.utils'

export interface WallProps extends IObjectWithPointsCoordinates {}

export const ObjectLine: React.FC<WallProps> = React.memo(({ meta, shapePoints, fromGround = 0.001 }) => {
  const groupRef = useRef(null)

  const theme = useContext(ThemeContext)
  const points = LineUtils.getPathPointsFromPointCoordinates(shapePoints, fromGround)

  const lineG = useMemo(() => new THREE.BufferGeometry().setFromPoints(points), [points])
  const shapeG = ShapeUtils.getShapeFromPointCoordinates(shapePoints)

  const extrudeSettings = { depth: 0, bevelEnabled: false }

  const shapeCenterV: THREE.Vector2 = GeometryUtils.getGeometryCenterFromPointCoordinates(shapePoints)
  const textNamePositionV = new THREE.Vector3(...shapeCenterV.toArray(), 0).add(
    new THREE.Vector3(shapePoints[0].x, shapePoints[0].y, fromGround + 0.001)
  )

  const contextDescriptionPositionV = textNamePositionV.clone().add(new THREE.Vector3(0, -0.2, 0))

  return (
    <group ref={groupRef}>
      <mesh position={[0, 0, fromGround]}>
        <extrudeGeometry attach="geometry" args={[shapeG, extrudeSettings]} />
        <meshPhongMaterial
          attach="material"
          color={theme.objects.D2.shape}
          transparent={true}
          opacity={0.3}
          depthWrite={false}
        />
      </mesh>
      // @ts-ignore
      <lineLoop geometry={lineG}>
        <lineBasicMaterial attach="material" color={theme.objects.D2.line} />
      </lineLoop>
      {meta?.name && <Text label={meta.name} position={textNamePositionV} />}
      {meta?.name && (
        <Text label={meta.description} position={contextDescriptionPositionV} geometryConfig={{ size: 0.1 }} />
      )}
    </group>
  )
})
