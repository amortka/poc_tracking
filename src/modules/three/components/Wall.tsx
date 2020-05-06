import React, { useRef } from 'react'
import * as THREE from 'three'

export interface WallProps {
  // export interface WallProps extends IWall{
}

export const Wall: React.FC<WallProps> = () => {
  const mesh = useRef<THREE.Object3D>()

  return (
    <mesh ref={mesh} position={[0, 0, 0.5]}>
      <boxGeometry attach="geometry" args={[1, 1, 1]} />
      <meshPhongMaterial attach="material" color={'red'} />
    </mesh>
  )
}
