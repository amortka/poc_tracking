import * as THREE from 'three'
import React from 'react'
import { AmbientLight } from './components/AmbientLight'
import { Camera } from './components/Camera'
import { Canvas as CanvasThree } from 'react-three-fiber'
import { Floor } from './components/Floor'
import { Scene } from './components/Scene'
import { Wall } from './components/Wall'

export const Canvas: React.FC = () => {
  THREE.Object3D.DefaultUp.set(0, 0, 1)

  return (
    <CanvasThree
      style={{ background: 'radial-gradient(at 50% 60%, #873740 0%, #272730 40%, #171720 80%, #070710 100%)' }}>
      <AmbientLight />
      <Camera />
      <axesHelper args={[10]} />
      <Scene>
        <Floor />

        <Wall />
      </Scene>
    </CanvasThree>
  )
}
