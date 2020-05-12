import { IPoint } from '../../../models/main.model';
import * as THREE from 'three';

export class ShapeUtils {
  static getShapeFromPointCoordinates(points: IPoint[]): THREE.Shape {
    const pointsCoordinates = [...points, points[0]];

    const shape: THREE.Shape = new THREE.Shape();

    pointsCoordinates.forEach((p, i) => {
      i === 0 ? shape.moveTo(p.x, p.y) : shape.lineTo(p.x, p.y);
    });

    return shape;
  }
}
