import * as THREE from 'three'
import React, { useMemo } from 'react'
import { AmbientLight } from './components/AmbientLight'
import { CameraControls } from './components/CameraControls'
import { Canvas as CanvasThree } from 'react-three-fiber'
import { Floor } from './components/Floor'
import { IVisualisation } from '../../models/main.model'
import { Scene } from './components/Scene'
import { StateUtils } from './utils/state.utils'
import { Walls } from './components/Walls/Walls'
import style from './Canvas.module.css'

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
    <CanvasThree gl2 orthographic className={style.Canvas}>
      <AmbientLight />
      <CameraControls />
      <axesHelper args={[10]} />
      <Floor />

      <Scene>
        <Walls walls={walls} />
      </Scene>
    </CanvasThree>
  )
}
