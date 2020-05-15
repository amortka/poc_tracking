import React, { useRef } from 'react'
import * as THREE from 'three'

export const Scene: React.FC = (props) => {
  const scene = useRef<THREE.Object3D>()

  return (
    <group ref={scene} position={[0, 0, 0]}>
      {props.children}
    </group>
  )
}
