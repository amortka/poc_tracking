import { ICanvasTheme } from '../canvas.model'
const merge = require('deepmerge')

export class CanvasUitls {
  static canvasThemeDefault: ICanvasTheme = {
    canvasBackground: '#2c323a',
    floor: { D2: '#2c323a', D3: '#2c323a' },
    objects: { D2: { plane: undefined, shape: undefined, text: undefined }, D3: { shape: undefined, text: undefined } },
    walls: { D2: undefined, D3: undefined },
  }

  static getCanvasTheme(config: Partial<ICanvasTheme> = {}): ICanvasTheme {
    return merge(this.canvasThemeDefault, config)
  }
}
