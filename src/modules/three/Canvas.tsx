import * as THREE from 'three'
import React, { useMemo } from 'react'
import { AmbientLight } from './components/AmbientLight'
import { Camera } from './components/Camera'
import { Canvas as CanvasThree } from 'react-three-fiber'
import { Floor } from './components/Floor'
import { Scene } from './components/Scene'
import { Walls } from './containers/Walls'
import { IVisualisation } from '../../models/main.model'
import { StateUtils } from './utils/state.utils'

interface CanvasProps {
  config: IVisualisation
}

export const Canvas: React.FC<CanvasProps> = ({ config }) => {
  THREE.Object3D.DefaultUp.set(0, 0, 1)

  const walls = useMemo(() => StateUtils.getWallsDataFromConfig(config.walls, config.points), [
    config.walls,
    config.points,
  ])

  return (
    <CanvasThree
      style={{ background: 'radial-gradient(at 50% 60%, #873740 0%, #272730 40%, #171720 80%, #070710 100%)' }}>
      <AmbientLight />
      <Camera />
      <axesHelper args={[10]} />
      <Scene>
        <Floor />
        <Walls walls={walls} />
      </Scene>
    </CanvasThree>
  )
}
