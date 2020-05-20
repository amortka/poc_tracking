import { Vector2 } from 'three';
import { IPoint, Dictionary } from '../../../../app.model';

const mapPointsToPath = (pointIds: string[], points: Dictionary<IPoint>): THREE.Vector2[] => {
  return pointIds.map((id) => {
    const point = points[id];
    return new Vector2(point.x, point.y);
  });
};

export { mapPointsToPath };
