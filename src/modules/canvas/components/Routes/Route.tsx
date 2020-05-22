import React, { useMemo } from 'react';
import { Vector2, Vector3, CurvePath, QuadraticBezierCurve3, QuadraticBezierCurve, Path } from 'three';
import { RoutePath } from './RoutePath';
import { IRouteWithComputedData } from '../../canvas.model';
import { Vehicle } from '../Vehicle/Vehicle';

interface RouteProps extends IRouteWithComputedData {}

const roundedCornerLine = (points: Array<THREE.Vector2>, radius: number = 0.01) => {
  const minVector = new Vector2();
  let minLength = minVector.subVectors(points[0], points[1]).length();
  for (let i = 1; i < points.length - 1; i++) {
    minLength = Math.min(minLength, minVector.subVectors(points[i], points[i + 1]).length());
  }

  radius = radius > minLength * 0.5 ? minLength * 0.5 : radius; // radius can't be greater than a half of a minimal segment

  const startIndex = 1;
  const endIndex = points.length - 2;

  const curvePaths = new CurvePath<THREE.Vector2>();
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

export const Route: React.FC<RouteProps> = ({ path, selected, progress }) => {
  const [roundedPath, proportion] = useMemo(() => {
    const line = roundedCornerLine(path.getPoints(), 0.3);
    const proportion = path.getLength() / line.getLength();

    return [line, proportion];
  }, [path]);

  return (
    <>
      <Vehicle path={roundedPath} progress={proportion * progress} type={undefined} />
      {selected || true ? (
        <RoutePath distanceEnd={progress} distanceStart={0} color={0x11b572} linewidth={0.007} path={path} />
      ) : null}
    </>
  );
};
