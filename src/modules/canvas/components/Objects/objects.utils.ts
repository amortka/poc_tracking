import { Dictionary } from '../../../../app.model';
import { IObject, IObjectWithPointsCoordinates, IPoint } from '../../canvas.model';
import { Geometry, Shape, Vector3 } from 'three';

export class ObjectsUtils {
  static getObjectsWithCoordinates(
    objects: Dictionary<IObject>,
    points: Dictionary<IPoint>
  ): IObjectWithPointsCoordinates[] {
    return (
      Object.entries(objects).map(([id, o]) => ({ id, ...o, shapePoints: o.shapePoints.map((p) => points[p]) })) || []
    );
  }

  static getLabelPosition(shape: Shape, fromGround: number): Vector3 {
    const objectCenter = new Vector3();

    const geometry = new Geometry().setFromPoints(shape.getPoints());
    geometry.computeBoundingBox();
    geometry.boundingBox.getCenter(objectCenter);
    objectCenter.setZ(fromGround);

    return objectCenter;
  }
}
