import { Vector3 } from 'three';
import { IPoint } from '../../../app.model';

export class LineUtils {
  static getShapePointsFromPointCoordinates(points: IPoint[], z: number = 0): THREE.Vector3[] {
    const shapePoints = [...points].map((p) => new Vector3(p.x, p.y, z));
    shapePoints.push(shapePoints[0]);
    return shapePoints;
  }

  static getPathPointsFromPointCoordinates(points: IPoint[], z: number = 0): THREE.Vector3[] {
    return [...points].map((p) => new Vector3(p.x, p.y, z));
  }
}
