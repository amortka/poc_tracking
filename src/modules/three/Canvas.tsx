import React, { useMemo } from 'react'
import { Object3D } from 'three'
import { AmbientLight } from './components/AmbientLight'
import { Canvas as CanvasThree } from 'react-three-fiber'
import { Floor } from './components/Floor'
import { ICanvasTheme, VisualizationType } from './canvas.model'
import { IVisualization } from '../../models/main.model'
import { Objects } from './components/Objects/Objects'
import { Scene } from './components/Scene'
import { Walls } from './components/Walls/Walls'
import { CanvasUtils } from './utils/canvasUtils'
import { ThemeContext } from './contexts/ThemeContext'
import { Paths } from './components/Paths/Paths'
import { Sensors } from './components/Sensors/Sensors'

interface CanvasProps {
  config: IVisualization
  theme?: ICanvasTheme
  type: VisualizationType
}

export const Canvas: React.FC<CanvasProps> = ({ config, theme = {}, type }) => {
  Object3D.DefaultUp.set(0, 0, 1)

  const themeConfig = useMemo(() => CanvasUtils.getCanvasTheme(theme), [theme])

  return (
    <CanvasThree gl2 orthographic style={{ background: themeConfig.canvasBackground }}>
      <ThemeContext.Provider value={themeConfig}>
        <AmbientLight />
        <Floor type={type} />
        <Scene>
          <Walls walls={config.walls} points={config.points} rooms={config.rooms} type={type} />
          <Objects points={config.points} objects={config.objects} type={type} />
          <Paths points={config.points} paths={config.paths} />
          <Sensors points={config.points} sensors={config.sensors} type={type} />
        </Scene>
      </ThemeContext.Provider>
    </CanvasThree>
  )
}
