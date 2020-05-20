import React from 'react';
import { CanvasUtils } from '../utils/canvas.utils';
import { ICanvasTheme } from '../canvas.model';

export const ThemeContext = React.createContext<ICanvasTheme>(CanvasUtils.canvasThemeDefault);
