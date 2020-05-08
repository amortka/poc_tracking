import React from 'react'
import { IObjectWithPointsCoordinates } from '../../canvas.model'

export interface ObjectNormalProps extends IObjectWithPointsCoordinates {}

export const ObjectNormal: React.FC<ObjectNormalProps> = React.memo(({ height = 1, meta }) => {
  // const wallStart = useMemo(() => new THREE.Vector2(start.x, start.y), [start.x, start.y])
  // const wallEnd = useMemo(() => new THREE.Vector2(end.x, end.y), [end.x, end.y])

  // const wallS = VectorUtils.getShapeFromVectors([wallStart, wallEnd], thickness)

  const extrudeSettings = {
    steps: 2,
    depth: height,
    bevelEnabled: false,
  }

  return (
    <mesh>
      <extrudeGeometry attach="geometry" args={[null, extrudeSettings]} />
      <meshPhongMaterial attach="material" color={'red'} transparent={true} opacity={0.5} depthWrite={false} />
    </mesh>
  )
})
