import React, { useMemo } from 'react'
import * as THREE from 'three'
import { IPoint, IWall } from '../../../../models/main.model'
import { VectorUtils } from './vector.unitls'
import { CsgUtils } from '../../utils/csg.utils'

export interface WallProps extends Omit<IWall, 'start' | 'end'> {
  start: IPoint
  end: IPoint
  height?: number
}

export const Wall: React.FC<WallProps> = React.memo(({ height = 2.7, start, end, thickness, meta }) => {
  const wallStart = useMemo(() => new THREE.Vector2(start.x, start.y), [start.x, start.y])
  const wallEnd = useMemo(() => new THREE.Vector2(end.x, end.y), [end.x, end.y])

  const wallS = VectorUtils.getShapeFromVectors([wallStart, wallEnd], thickness)

  const extrudeSettings = {
    steps: 2,
    depth: height,
    bevelEnabled: false,
  }

  let wallG = new THREE.ExtrudeGeometry(wallS, extrudeSettings)

  if (meta?.holes) {
    Object.values(meta.holes).forEach((hole) => {
      const holeStartV = VectorUtils.getVectorToPositionOnSegment(wallStart, wallEnd, hole.start)
      const holeEndV = VectorUtils.getVectorToPositionOnSegment(wallStart, wallEnd, hole.start + hole.width)

      const holeS = VectorUtils.getShapeFromVectors([holeStartV, holeEndV], thickness)
      const holeG = new THREE.ExtrudeGeometry(holeS, { ...extrudeSettings, depth: hole.height })

      const wallM = new THREE.Mesh(wallG)
      const holeM = new THREE.Mesh(holeG)
      holeM.position.set(0, 0, hole.fromGround || 0)

      wallG.copy(CsgUtils.subtract(wallM, holeM).geometry as THREE.Geometry)
    })
  }

  return (
    <mesh geometry={wallG}>
      <meshPhongMaterial attach="material" color={'red'} transparent={true} opacity={0.5} depthWrite={false} />
    </mesh>
  )
})
