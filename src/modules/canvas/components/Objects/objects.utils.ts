import { Dictionary, IObject, IPoint } from '../../../../app.model';
import { IObjectWithPointsCoordinates } from '../../canvas.model';
import { Geometry, Vector3 } from 'three';

export class ObjectsUtils {
  static getObjectsWithCoordinates(
    objects: Dictionary<IObject>,
    points: Dictionary<IPoint>
  ): IObjectWithPointsCoordinates[] {
    return Object.values(objects).map((o) => ({ ...o, shapePoints: o.shapePoints.map((p) => points[p]) })) || [];
  }

  static getLabelPosition(geometry: Geometry, fromGround: number): Vector3 {
    const objectCenter = new Vector3();

    geometry.computeBoundingBox();
    geometry.boundingBox.getCenter(objectCenter);
    objectCenter.setZ(objectCenter.z + fromGround);

    return objectCenter;
  }
}
