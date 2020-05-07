import React from 'react'
import * as THREE from 'three'
import { IPoint, IWall } from '../../../models/main.model'
import { VectorUtils } from '../../../utils/vectors.unitls'

export interface WallProps extends Omit<IWall, 'start' | 'end'> {
  start: IPoint
  end: IPoint
  height?: number
}

export const Wall: React.FC<WallProps> = ({ height = 2.7, start, end, thickness }) => {
  const shape = VectorUtils.getShapeFromVectors(
    [new THREE.Vector2(start.x, start.y), new THREE.Vector2(end.x, end.y)],
    thickness
  )

  const extrudeSettings = {
    steps: 2,
    depth: height,
    bevelEnabled: false,
  }

  return (
    <mesh>
      <extrudeBufferGeometry attach="geometry" args={[shape, extrudeSettings] as any} />
      <meshPhongMaterial attach="material" color={'red'} opacity={0.9} />
    </mesh>
  )
}
