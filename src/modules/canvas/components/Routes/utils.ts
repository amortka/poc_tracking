import { useMemo } from 'react';
import { Curve, CurvePath, Path, QuadraticBezierCurve, Vector2, Vector3 } from 'three';
import { Dictionary } from '../../../../app.model';
import { IPoint } from '../../canvas.model';

const mapPointsToPath = (pointIds: string[], points: Dictionary<IPoint>): Vector2[] => {
  return pointIds.map((id) => {
    const point = points[id];
    return new Vector2(point.x, point.y);
  });
};

const roundedCornerLine = (points: Array<Vector2>, radius: number = 0.01) => {
  const minVector = new Vector2();
  let minLength = minVector.subVectors(points[0], points[1]).length();
  for (let i = 1; i < points.length - 1; i++) {
    minLength = Math.min(minLength, minVector.subVectors(points[i], points[i + 1]).length());
  }

  radius = radius > minLength * 0.5 ? minLength * 0.5 : radius; // radius can't be greater than a half of a minimal segment

  const startIndex = 1;
  const endIndex = points.length - 2;

  const curvePaths = new CurvePath<Vector2>();
  let lastKeyEnd = points[0];

  for (let i = startIndex; i <= endIndex; i++) {
    const iStart = i - 1 < 0 ? points.length - 1 : i - 1;
    const iMid = i;
    const iEnd = i + 1 > points.length - 1 ? 0 : i + 1;
    const pStart = points[iStart];
    const pMid = points[iMid];
    const pEnd = points[iEnd];

    const keyStart = new Vector2().subVectors(pStart, pMid).normalize();
    const keyMid = pMid;
    const keyEnd = new Vector2().subVectors(pEnd, pMid).normalize();

    const halfAngle = new Vector3(keyStart.x, keyStart.y, 0).angleTo(new Vector3(keyEnd.x, keyEnd.y, 0)) * 0.5;

    const keyLength = radius / Math.tan(halfAngle);

    keyStart.multiplyScalar(keyLength).add(keyMid);
    keyEnd.multiplyScalar(keyLength).add(keyMid);

    curvePaths.add(new Path([lastKeyEnd, keyStart]));
    curvePaths.add(new QuadraticBezierCurve(keyStart, keyMid, keyEnd));
    lastKeyEnd = keyEnd;
  }

  const endPath = new Path([curvePaths.curves[curvePaths.curves.length - 1].getPoint(2), points[points.length - 1]]);
  curvePaths.curves.push(endPath);

  return curvePaths;
};

const useRoundedPath = (path: Curve<Vector2>, radius?: number): [CurvePath<Vector2>, number] => {
  const [roundedPath, proportion] = useMemo(() => {
    const line = roundedCornerLine(path.getPoints(), radius);
    const proportion = path.getLength() / line.getLength();

    return [line, proportion];
  }, [path, radius]);

  return [roundedPath, proportion];
};

export { mapPointsToPath, useRoundedPath };
