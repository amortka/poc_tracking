import { useMemo } from 'react';
import { CurvePath, Path, QuadraticBezierCurve, Vector2, Vector3 } from 'three';
import { Dictionary } from '../../../../app.model';
import { IPoint } from '../../canvas.model';

const mapPointsToVectors = (pointIds: string[], points: Dictionary<IPoint>): Vector2[] => {
  return pointIds.map((id) => {
    const point = points[id];
    return new Vector2(point.x, point.y);
  });
};

const generateAnimationPaths = (
  points: Array<Vector2>,
  radius: number = 0.01
): { curvedPath: CurvePath<Vector2>; straightPath: CurvePath<Vector2> } => {
  if (points.length === 2) {
    const curvedPath = new CurvePath<Vector2>();
    curvedPath.add(new Path(points));
    return { curvedPath: curvedPath, straightPath: curvedPath };
  }

  // const minVector = new Vector2();
  // let minLength = minVector.subVectors(points[0], points[1]).length();
  // for (let i = 1; i < points.length - 1; i++) {
  //   minLength = Math.min(minLength, minVector.subVectors(points[i], points[i + 1]).length());
  // }
  // radius = radius > minLength * 0.5 ? minLength * 0.5 : radius; // radius can't be greater than a half of a minimal segment

  const startIndex = 1;
  const endIndex = points.length - 2;

  const curvedPath = new CurvePath<Vector2>();
  const straightPath = new CurvePath<Vector2>();
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

    const sharedPath = new Path([lastKeyEnd, keyStart]);
    curvedPath.add(sharedPath);
    straightPath.add(sharedPath);

    curvedPath.add(new QuadraticBezierCurve(keyStart, keyMid, keyEnd));
    straightPath.add(new Path([keyStart, keyMid, keyEnd]));

    lastKeyEnd = keyEnd;
  }

  const endPath = new Path([curvedPath.curves[curvedPath.curves.length - 1].getPoint(1), points[points.length - 1]]);
  curvedPath.curves.push(endPath);
  straightPath.curves.push(endPath);

  // curvedPath.updateArcLengths();
  // straightPath.updateArcLengths();

  return { curvedPath, straightPath };
};

const useAnimationPath = (
  points: Vector2[]
): {
  animationPath: CurvePath<Vector2>;
  routePath: CurvePath<Vector2>;
  progressToIndexMap: number[];
} =>
  useMemo(() => {
    const radius = 0.4;
    const { curvedPath: animationPath, straightPath: routePath } = generateAnimationPaths(points, radius);

    const progressToIndexMap = routePath.curves
      .reduce<number[]>((acc, curve, index) => {
        const curveLength = curve.getLength();

        if (index === 0) {
          return [curveLength];
        } else {
          return [...acc, curveLength + acc[index - 1]];
        }
      }, [])
      .map<number>((localCurveLength) => localCurveLength / routePath.getLength());

    return { animationPath, routePath, progressToIndexMap };
  }, [points]);

const useVehicleUpdate = (
  animationPath: CurvePath<Vector2>,
  progress: number,
  progressToIndexMap: number[]
): { position: Vector2; rotationTangent: Vector2 } => {
  const curveIndex = progressToIndexMap.findIndex((curveProgress) => progress <= curveProgress);
  const curveProgressStart = progressToIndexMap[curveIndex - 1] || 0;
  const curveProgressEnd = progressToIndexMap[curveIndex];
  const curveLocalProgress = (progress - curveProgressStart) / (curveProgressEnd - curveProgressStart);

  const position = animationPath.curves[curveIndex].getPoint(curveLocalProgress);
  const rotationTangent = animationPath.curves[curveIndex].getTangent(curveLocalProgress).normalize();

  return { position, rotationTangent };
};

export { mapPointsToVectors, generateAnimationPaths, useAnimationPath, useVehicleUpdate };
