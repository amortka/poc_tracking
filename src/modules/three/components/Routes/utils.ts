import { Vector2 } from 'three';
import { IPoint, Dictionary } from '../../../../models/main.model';

const mapPointsToPath = (pointIds: string[], points: Dictionary<IPoint>): THREE.Vector2[] => {
  return pointIds.map((id) => {
    const point = points[id];
    return new Vector2(point.x, point.y);
  });
};

const mapSensorDictionaryToDistanceMap = (
  sensors: Dictionary<{ sensorId: string; distance: number }>
): { [sensorId: string]: number } =>
  Object.values(sensors).reduce((acc, { sensorId, distance }) => ({ ...acc, [sensorId]: distance }), {});

export { mapPointsToPath, mapSensorDictionaryToDistanceMap };
