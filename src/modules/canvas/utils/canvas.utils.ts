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
    objects: { D2: { line: '#979fa4', shape: '#41464e', text: '#979fa4', textSelected: '#ffffff' } },
    walls: { D2: { line: '#61676f' }, D3: '#6a6e75' },
    sensor: { D2: '#464c53', D3: '#464c53' },
  };

  static getCanvasTheme(config: Partial<ICanvasTheme> = {}): ICanvasTheme {
    return merge(this.canvasThemeDefault, config);
  }
}
