import * as THREE from 'three'
import React, { useMemo } from 'react'
import { AmbientLight } from './components/AmbientLight'
import { CameraControls } from './components/CameraControls'
import { Canvas as CanvasThree } from 'react-three-fiber'
import { Floor } from './components/Floor'
import { ICanvasTheme, VisualisationType } from './canvas.model'
import { IVisualisation } from '../../models/main.model'
import { Objects } from './components/Objects/Objects'
import { Scene } from './components/Scene'
import { Walls } from './components/Walls/Walls'
import { CanvasUtils } from './utils/canvasUtils'
import { ThemeContext } from './contexts/ThemeContext'

interface CanvasProps {
  config: IVisualisation
  theme?: ICanvasTheme
  type: VisualisationType
}

export const Canvas: React.FC<CanvasProps> = ({ config, theme = {}, type }) => {
  THREE.Object3D.DefaultUp.set(0, 0, 1)
  const themeConfig = useMemo(() => CanvasUtils.getCanvasTheme(theme), [theme])

  return (
    <CanvasThree gl2 orthographic style={{ background: themeConfig.canvasBackground }}>
      <ThemeContext.Provider value={themeConfig}>
        <AmbientLight />
        <CameraControls />
        <axesHelper args={[10]} />
        <Floor type={type} />

        <Scene>
          <Walls walls={config.walls} points={config.points} rooms={config.rooms} type={type} />
          <Objects points={config.points} objects={config.objects} type={type} />
        </Scene>
      </ThemeContext.Provider>
    </CanvasThree>
  )
}
