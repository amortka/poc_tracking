import { IPoint } from '../../../app.model';
import * as THREE from 'three';
import { VectorUtils } from './vector.unitls';

export class GeometryUtils {
  static getGeometryFromPointCoordinates(points: IPoint[]): THREE.Geometry {
    const vectors = VectorUtils.getVectorsArrayFromPointsArray([...points, points[0]]);
    return new THREE.Geometry().setFromPoints(vectors);
  }

  static getGeometryCenterFromPointCoordinates(points: IPoint[]): THREE.Vector2 {
    const geometry = this.getGeometryFromPointCoordinates(points);
    geometry.computeBoundingBox();

    // @ts-ignore
    const centerV = geometry.boundingBox.getCenter();
    return new THREE.Vector2(...centerV.toArray()).add(new THREE.Vector2(points[0].x, points[0].y).negate());
  }
}
