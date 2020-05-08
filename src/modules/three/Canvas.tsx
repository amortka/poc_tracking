import * as THREE from 'three'
import React from 'react'
import { AmbientLight } from './components/AmbientLight'
import { CameraControls } from './components/CameraControls'
import { Canvas as CanvasThree } from 'react-three-fiber'
import { Floor } from './components/Floor'
import { IVisualisation } from '../../models/main.model'
import { Scene } from './components/Scene'
import style from './Canvas.module.css'
import { Walls, WallType } from './components/Walls/Walls'

interface CanvasProps {
  config: IVisualisation
}

export const Canvas: React.FC<CanvasProps> = ({ config }) => {
  THREE.Object3D.DefaultUp.set(0, 0, 1)

  return (
    <CanvasThree gl2 orthographic className={style.Canvas}>
      <AmbientLight />
      <CameraControls />
      <axesHelper args={[10]} />
      <Floor />

      <Scene>
        <Walls walls={config.walls} points={config.points} rooms={config.rooms} type={WallType.LINE} />
      </Scene>
    </CanvasThree>
  )
}
