import * as THREE from 'three';

export class ColorUtils {
  static calculateMiddleColor(
    color1: THREE.Color | string | number = 'FF0000',
    color2: THREE.Color | string | number = '00FF00',
    ratio: number // value 0-1
  ) {
    const c1 = new THREE.Color(color1);
    const c2 = new THREE.Color(color2);

    const getColorValue = (color: 'r' | 'g' | 'b') => {
      return c1[color] + (c2[color] - c1[color]) * ratio;
    };

    return new THREE.Color().setRGB(getColorValue('r'), getColorValue('g'), getColorValue('b'));
  }
}
