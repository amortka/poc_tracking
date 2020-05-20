import * as THREE from 'three';
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry';
import { ColorUtils } from '../utils/color.utils';

export interface ILineSegment {
  distanceStart: number; // value 0-1
  distanceEnd: number; // value 0-1
  colorStart?: THREE.Color | string | number;
  colorEnd?: THREE.Color | string | number;
}

export class LineSegmentGeometry extends LineGeometry {
  static defaultSegmentConfig: Required<ILineSegment> = {
    colorEnd: null,
    colorStart: new THREE.Color('white'),
    distanceEnd: 0,
    distanceStart: 0,
  };
  config: Required<ILineSegment>;
  length: number;
  startVector: THREE.Vector3;
  endVector: THREE.Vector3;

  private pointsAndDistanceArray: Array<{ point: THREE.Vector3; distance: number }>;
  private colorStart: THREE.Color;
  private colorEnd: THREE.Color;

  constructor(public points: Array<THREE.Vector3>, segments: ILineSegment) {
    super();
    this.config = { ...LineSegmentGeometry.defaultSegmentConfig, ...segments };
    this.length = this.getLength();

    this.setStartEndVectors();
    this.pointsAndDistanceArray = this.getPointsAndDistanceArray();

    this.setPositions(this.getPositions());
    this.setColors(this.getColors());
  }

  /**
   * Colors
   */
  private getColors(): number[] | Float32Array {
    const result: number[] | Float32Array = [];
    this.colorStart = new THREE.Color(this.config.colorStart);
    this.colorEnd = new THREE.Color(this.config.colorEnd || this.config.colorStart);
    this.pointsAndDistanceArray.forEach((o) => {
      const color = ColorUtils.calculateMiddleColor(this.colorStart, this.colorEnd, o.distance);
      result.push(color.r, color.g, color.b);
    });
    return result;
  }

  /**
   * Positions
   */
  private setStartEndVectors(): void {
    const [startV, endV] = this._getPointsForSegment(this.config.distanceStart, this.config.distanceEnd, this.points);
    this.startVector = startV;
    this.endVector = endV;
  }

  private getPointsAndDistanceArray(): Array<{ point: THREE.Vector3; distance: number }> {
    let pointsAndDistanceOfOriginalPoints = this._getArrayWithPointsAndDistance(this.points, this.length);

    return [
      { point: this.startVector, distance: this.config.distanceStart },
      ...this._cutPointOutOfRange(
        this.config.distanceStart,
        this.config.distanceEnd,
        pointsAndDistanceOfOriginalPoints
      ),
      { point: this.endVector, distance: this.config.distanceEnd },
    ];
  }

  private getPositions(): number[] | Float32Array {
    const result: number[] | Float32Array = [];
    this.pointsAndDistanceArray.forEach((o) => result.push(...o.point.toArray()));
    return result;
  }

  /**
   * Points
   */

  private _cutPointOutOfRange(
    distanceStart,
    distanceEnd,
    pointsAndDistanceArray: Array<{ point: THREE.Vector3; distance: number }>
  ): Array<{ point: THREE.Vector3; distance: number }> {
    const indexOfFirstPoint = pointsAndDistanceArray.findIndex((o) => distanceStart <= o.distance);
    const indexOfLastPoint = pointsAndDistanceArray.findIndex((o) => distanceEnd < o.distance);

    return [...pointsAndDistanceArray].slice(indexOfFirstPoint, indexOfLastPoint);
  }

  private _getArrayWithPointsAndDistance(
    points: Array<THREE.Vector3>,
    length: number
  ): Array<{ point: THREE.Vector3; distance: number }> {
    let result: Array<{ point: THREE.Vector3; distance: number }> = [];

    points.forEach((v, i) => {
      if (i === 0) {
        result.push({ point: v.clone(), distance: 0 });
        return;
      }
      result.push({ point: v.clone(), distance: this._getDistanceOnPathByPoint(points, v, length) });
    });

    result = result.sort((a, b) => a.distance - b.distance);
    return result;
  }

  private _getPointOnPathByDistance(points: Array<THREE.Vector3>, distance: number): THREE.Vector3 {
    if (distance === 0) {
      return points[0].clone();
    } else if (distance === 1) {
      return [...points].pop().clone();
    }

    const target = this.length * distance;
    const [startV, endV, startL] = this._findSegmentOnPathByDistance(points, target);

    const line = new THREE.Line3(startV, endV);
    const distanceOnLine = (target - startL) / line.distance();

    return line.at(distanceOnLine, undefined);
  }

  /**
   * Segments
   */
  private _getPointsForSegment(
    startDistance: number,
    endDistance: number,
    points: Array<THREE.Vector3>
  ): [THREE.Vector3, THREE.Vector3] {
    const startV = this._getPointOnPathByDistance(points, startDistance);
    const endV = this._getPointOnPathByDistance(points, endDistance);
    return [startV, endV];
  }

  private _findSegmentOnPathByDistance(
    points: Array<THREE.Vector3>,
    target: number
  ): [THREE.Vector3, THREE.Vector3, number] {
    let startV: THREE.Vector3;
    let startL: number = 0;
    let endV: THREE.Vector3;

    startV = points
      .find((v, i) => {
        if (i === points.length - 1) return false;
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

  /**
   * Lengths
   */
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

  private _getDistanceOnPathByPoint(points: Array<THREE.Vector3>, point: THREE.Vector3, pathLength: number): number {
    const pointI = points.findIndex((p) => p.toArray().toString() === point.toArray().toString());
    const slicedPathLength = this._getPathLengthByPoints([...points].slice(0, pointI + 1));
    return slicedPathLength / pathLength;
  }
}
