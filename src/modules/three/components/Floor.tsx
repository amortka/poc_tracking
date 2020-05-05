import React, { useRef } from 'react'
import * as THREE from 'three'

export const Floor: React.FC = () => {
  const mesh = useRef<THREE.Mesh>()

  return (
    <mesh ref={mesh}>
      <planeBufferGeometry attach="geometry" args={[100, 100]} />
      <meshStandardMaterial
        side={THREE.DoubleSide}
        attach="material"
        color={'0xe5054d'}
        roughness={0.6}
        metalness={0.1}
      />
    </mesh>
  )
}
