import { ICanvasTheme } from '../canvas.model';
const merge = require('deepmerge');

export class CanvasUtils {
  static canvasThemeDefault: ICanvasTheme = {
    paths: {
      D2: { dashSize: 0.1, gapSize: 0.05, line: '#464c53', selectedLine: '#1a9c68' },
      D3: { dashSize: 0.1, gapSize: 0.05, line: '#464c53', selectedLine: '#1a9c68' },
    },
    canvasBackground: '#2c323a',
    text: {
      color: '#959da2',
    },
    floor: { D2: '#2c323a', D3: '#2c323a' },
    objects: { D2: { line: '#868d94', shape: '#868d94', text: undefined }, D3: { shape: undefined, text: undefined } },
    walls: { D2: { line: '#61676f' }, D3: undefined },
    sensor: { D2: '#464c53', D3: '#464c53' },
  };

  static getCanvasTheme(config: Partial<ICanvasTheme> = {}): ICanvasTheme {
    return merge(this.canvasThemeDefault, config);
  }
}
