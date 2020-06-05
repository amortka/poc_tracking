import { Dictionary } from '../../../app.model';
import { IObject, IPath, IPoint } from '../../canvas/canvas.model';
import { Vector3 } from 'three';
import { GeometryUtils } from '../../canvas/utils/geometry.utils';

export class SceneUtils {
  static moveObjectsPointsToLinePosition(
    pathObjects: IPath['objects'],
    pathLength: number,
    objects: Dictionary<IObject>,
    points: Dictionary<IPoint>
  ): Dictionary<IPoint> {
    const resultPoints: Dictionary<IPoint> = {};
    pathObjects.forEach(({ objectId, distance }) => {
      const centerPosition: IPoint = SceneUtils.getPointOnPathByDistance(pathLength, distance);

      const objectPoints: Dictionary<IPoint> = {};
      objects[objectId].shapePoints.forEach((pointId) => {
        Object.assign(objectPoints, { [pointId]: points[pointId] });
      });

      Object.assign(resultPoints, { ...SceneUtils.moveObjectCenterToPoint(centerPosition, objectPoints) });
    });

    return resultPoints;
  }

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

  static getPointOnPathByDistance(pathLength: number, distance: number): IPoint {
    return { x: distance * pathLength, y: 0 };
  }

  static flattenLine(pointsIds: string[], points: Dictionary<IPoint>): Dictionary<IPoint> {
    const result: Dictionary<IPoint> = pointsIds.reduce((dictionary, currentPointId, currentIndex, pointsArray) => {
      if (!currentIndex) {
        dictionary[currentPointId] = { x: 0, y: 0 };
        return dictionary;
      }

      const firstPoint = points[pointsArray[currentIndex - 1]];
      const secondPoint = points[currentPointId];

      const length: number = new Vector3(secondPoint.x - firstPoint.x, secondPoint.y - firstPoint.y, 0).length();
      dictionary[currentPointId] = { x: dictionary[pointsIds[currentIndex - 1]].x + length, y: 0 };
      return dictionary;
    }, {});
    return result;
  }
}
