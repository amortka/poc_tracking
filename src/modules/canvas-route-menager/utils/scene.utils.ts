import { Dictionary } from '../../../app.model';
import { IObject, IPath, IPoint } from '../../canvas/canvas.model';
import { Vector3 } from 'three';
import { GeometryUtils } from '../../canvas/utils/geometry.utils';

export class SceneUtils {
  static moveObjectCenterToPoint(centerPosition: IPoint, points: Dictionary<IPoint>): Dictionary<IPoint> {
    const shapeCenter = new Vector3();
    const shapeGeometry = GeometryUtils.getGeometryFromPointCoordinates(Object.values(points));
    shapeGeometry.computeBoundingBox();
    shapeGeometry.boundingBox.getCenter(shapeCenter);

    const moveObjectVector = { x: centerPosition.x - shapeCenter.x, y: centerPosition.y - shapeCenter.y };

    for (const pointId in points) {
      points[pointId] = { x: points[pointId].x + moveObjectVector.x, y: points[pointId].y + moveObjectVector.y };
    }

    return points;
  }

  static flattenLineNormalized(pathObjects: IPath['objects'], segmentLength: number): Dictionary<IPoint> {
    const newPathLength = (pathObjects.length + 1) * segmentLength;

    return { pathStart: { x: 0, y: 0 }, pathEnd: { x: newPathLength, y: 0 } };
  }

  static moveObjectsPointsToNormalizedLinePosition(
    pathObjects: IPath['objects'],
    pathLength: number,
    objects: Dictionary<IObject>,
    points: Dictionary<IPoint>
  ): Dictionary<IPoint> {
    const resultPoints: Dictionary<IPoint> = {};

    const objectsLength = pathObjects.length;
    pathObjects.forEach(({ objectId, distance }, index) => {
      const centerPosition: IPoint = SceneUtils.getPointOnNormalizedPathByIndex(pathLength, index, objectsLength);

      const objectPoints: Dictionary<IPoint> = {};
      objects[objectId].shapePoints.forEach((pointId) => {
        Object.assign(objectPoints, { [pointId]: points[pointId] });
      });

      Object.assign(resultPoints, { ...SceneUtils.moveObjectCenterToPoint(centerPosition, objectPoints) });
    });

    return resultPoints;
  }

  static getPointOnNormalizedPathByIndex(pathLength: number, index: number, objectsLength: number): IPoint {
    return { x: (pathLength / (objectsLength + 1)) * (index + 1), y: 0 };
  }
}
