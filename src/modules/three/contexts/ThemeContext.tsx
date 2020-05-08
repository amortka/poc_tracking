import React from 'react'
import { CanvasUtils } from '../utils/canvasUtils'
import { ICanvasTheme } from '../canvas.model'

export const ThemeContext = React.createContext<ICanvasTheme>(CanvasUtils.canvasThemeDefault)
