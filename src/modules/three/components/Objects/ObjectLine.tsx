import React, { useMemo } from 'react'
import * as THREE from 'three'
import { IObjectWithPointsCoordinates } from '../../canvas.model'
import { LineUtils } from '../../utils/line.utils'

export interface WallProps extends IObjectWithPointsCoordinates {}

export const ObjectLine: React.FC<WallProps> = React.memo(({ meta, shapePoints, fromGround = 0.1 }) => {
  const points = LineUtils.getShapePointsFromPointCoordinates(shapePoints, fromGround)

  const geometry = useMemo(() => new THREE.BufferGeometry().setFromPoints(points), [points])

  return (
    // @ts-ignore
    <line geometry={geometry}>
      <lineBasicMaterial attach="material" color={'red'} />
    </line>
  )
})
