import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

export const Scene: React.FC = (props) => {
  const scene = useRef<THREE.Object3D>()

  useEffect(() => {
    new THREE.Box3()
      .setFromObject(scene.current)
      .getCenter(scene.current.position)
      .multiplyScalar(-1)
      .multiply(new THREE.Vector3(1, 1, 0))
  }, [scene])

  return (
    <group ref={scene} position={[0, 0, 0]}>
      {props.children}
    </group>
  )
}
