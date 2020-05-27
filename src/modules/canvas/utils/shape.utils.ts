import { Shape } from 'three';
import { IPoint } from '../canvas.model';

export class ShapeUtils {
  static getShapeFromPointCoordinates(points: IPoint[]): Shape {
    const pointsCoordinates = [...points, points[0]];

    const shape: Shape = new Shape();

    pointsCoordinates.forEach((p, i) => {
      i === 0 ? shape.moveTo(p.x, p.y) : shape.lineTo(p.x, p.y);
    });

    return shape;
  }
}
