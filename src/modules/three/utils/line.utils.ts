import { IPoint } from '../../../models/main.model';
import * as THREE from 'three';
import { useMemo } from 'react';

export class LineUtils {
  static getShapePointsFromPointCoordinates(points: IPoint[], z: number = 0): THREE.Vector3[] {
    const shapePoints = [...points].map((p) => useMemo(() => new THREE.Vector3(p.x, p.y, z), [p.x, p.y]));
    shapePoints.push(shapePoints[0]);
    return shapePoints;
  }

  static getPathPointsFromPointCoordinates(points: IPoint[], z: number = 0): THREE.Vector3[] {
    return [...points].map((p) => useMemo(() => new THREE.Vector3(p.x, p.y, z), [p.x, p.y]));
  }
}
