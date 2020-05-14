import { IPoint } from '../../../models/main.model';
import * as THREE from 'three';
import { useMemo } from 'react';
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry';

export class LineUtils {
  static getShapePointsFromPointCoordinates(points: IPoint[], z: number = 0): THREE.Vector3[] {
    const shapePoints = [...points].map((p) => useMemo(() => new THREE.Vector3(p.x, p.y, z), [p.x, p.y]));
    shapePoints.push(shapePoints[0]);
    return shapePoints;
  }

  static getPathPointsFromPointCoordinates(points: IPoint[], z: number = 0): THREE.Vector3[] {
    return [...points].map((p) => useMemo(() => new THREE.Vector3(p.x, p.y, z), [p.x, p.y]));
  }

  static getSeparateLinesFromPointCoordinates(points: IPoint[], z: number = 0): Array<[THREE.Vector3, THREE.Vector3]> {
    const result: Array<[THREE.Vector3, THREE.Vector3]> = [];

    const vectors = this.getPathPointsFromPointCoordinates(points, z);
    vectors.forEach((v, i) => {
      if (i === vectors.length - 1) return;
      result.push([v, vectors[i + 1]]);
    });

    return result;
  }
}

export interface LineSelectedApi {
  geometry: THREE.Vector3[];
  segments: Array<{
    start: number; // 0-1 distance on the path where segment starts
    end: number; // 0-1 distance on the path where segment end
    colorStart: THREE.Color;
    colorEnd: THREE.Color;
    dashed: boolean;
    dashScale: number;
    dashSize: number;
    gapSize: number;
    opacity: number;
    linewidth: number;
  }>;
}

/**
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 */

export class LineIndicated {
  dashed: boolean;
  dashScale: number;
  dashSize: number;
  gapSize: number;
  opacity: number;
  linewidth: number;

  length: number;
  geometry: LineGeometry;

  constructor(
    public points: Array<THREE.Vector3>,
    public segments: Array<{
      start: number; // distance on the path where segment starts
      end: number; // distance on the path where segment end
      colorStart: THREE.Color;
      colorEnd: THREE.Color;
    }>
  ) {
    this.length = this.getLength();
    this.geometry = this.getGeometry();
    this.getArrayWithPointsAndLength();
  }

  private getLength(): number {
    return this._getPathLengthByPoints(this.points);
  }

  private _getPathLengthByPoints(points: Array<THREE.Vector3>): number {
    return [...points].reduce((previousValue, currentValue, index, array) => {
      if (!index) return previousValue;

      return (
        previousValue +
        currentValue
          .clone()
          .add(array[index - 1].clone().negate())
          .length()
      );
    }, 0);
  }

  private getGeometry(): LineGeometry {
    return;
  }

  private getArrayWithPointsAndLength(): Array<{ point: THREE.Vector3; distance: number }> {
    let result: Array<{ point: THREE.Vector3; distance: number }> = [];

    this.points.forEach((v, i) => {
      if (i === 0) {
        result.push({ point: v.clone(), distance: 0 });
        return;
      }
      result.push({ point: v.clone(), distance: this._getDistanceOnPathByPoint(this.points, v, this.length) });
    });

    this.segments.forEach((s, i) => {
      result.push({ point: this._getPointOnPathByDistance(this.points, s.end), distance: s.end });
    });

    result = result.sort((a, b) => a.distance - b.distance);
    console.log(result);
    return result;
  }

  private _getDistanceOnPathByPoint(points: Array<THREE.Vector3>, point: THREE.Vector3, pathLength: number): number {
    const pointI = points.findIndex((p) => p.toArray().toString() === point.toArray().toString());
    const slicedPathLength = this._getPathLengthByPoints([...points].slice(0, pointI + 1));
    return slicedPathLength / pathLength;
  }

  private _getPointsForSegment(startDistance: number, endDistance: number, points: Array<THREE.Vector3>) {
    const startV = this._getPointOnPathByDistance(points, startDistance);
    const endV = this._getPointOnPathByDistance(points, endDistance);

    console.log({ startV, endV });
  }

  private _getPointOnPathByDistance(points: Array<THREE.Vector3>, distance: number): THREE.Vector3 {
    const target = this.length * distance;

    const [startV, endV, startL] = this._findSegmentOnPathByDistance(points, target);

    const line = new THREE.Line3(startV, endV);
    const distanceOnLine = (target - startL) / line.distance();

    return line.at(distanceOnLine, undefined);
  }

  private _findSegmentOnPathByDistance(
    points: Array<THREE.Vector3>,
    target: number
  ): [THREE.Vector3, THREE.Vector3, number] {
    let startI: number;
    let startV: THREE.Vector3;
    let startL: number = 0;
    let endV: THREE.Vector3;

    startV = points
      .find((v, i) => {
        if (i === points.length - 1) return;
        startI = i;

        const nextV = points[i + 1].clone();
        const vectorL = nextV.clone().add(v.clone().negate()).length();
        const isBigger = Boolean(target < vectorL + startL);

        if (!isBigger) {
          startL += vectorL;
        } else {
          endV = nextV;
        }
        return isBigger;
      })
      .clone();

    return [startV, endV, startL];
  }
}
