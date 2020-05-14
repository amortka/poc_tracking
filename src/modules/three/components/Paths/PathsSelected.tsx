import * as THREE from 'three';
import React, { useContext, useRef } from 'react';
import { extend } from 'react-three-fiber';
import { IPathWithPointsCoordinates } from '../../canvas.model';
import { Line2 } from 'three/examples/jsm/lines/Line2.js';
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry.js';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js';
import { LineIndicated, LineUtils } from '../../utils/line.utils';
import { ThemeContext } from '../../contexts/ThemeContext';
import { Color, Vector2 } from 'three';

extend({ Line2, LineMaterial, LineGeometry });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      line2: Partial<Line2>;
      lineGeometry: LineGeometry;
      lineMaterial: LineMaterial;
    }
  }
}

export interface PathsDefaultProps extends IPathWithPointsCoordinates {}

export const PathsSelected: React.FC<PathsDefaultProps> = React.memo(({ points, tag }) => {
  const theme = useContext(ThemeContext);
  const fromGround = useRef(0.03);
  const pointsV = LineUtils.getPathPointsFromPointCoordinates(points, fromGround.current);
  const positionA: number[] = [];
  const colorA: number[] = [];
  pointsV.forEach((v, i) => {
    positionA.push(...v.toArray());

    const color = new THREE.Color();
    if (i % 5 === 0) {
      color.set('#11b572');
    } else if (i % 4 === 0) {
      color.set('blue');
    } else if (i % 3 === 0) {
      color.set('yellow');
    } else if (i % 2 === 0) {
      color.set('green');
    } else {
      color.set('blue');
    }
    colorA.push(color.r, color.g, color.b);
  });

  const lineG = new LineGeometry().setPositions(positionA);
  lineG.setColors(colorA);
  const lineM = new LineMaterial({
    color: 0xaa00ff,
    linewidth: 0.005,
    vertexColors: true,
    dashed: false,
  });

  /////////////////////////////////
  const lineIndicated = new LineIndicated(pointsV, [
    { start: 0, end: 0.04, colorStart: new THREE.Color('red'), colorEnd: new THREE.Color('blue') },
    { start: 0.04, end: 0.14, colorStart: new THREE.Color('red'), colorEnd: new THREE.Color('blue') },
    { start: 0.14, end: 0.23, colorStart: new THREE.Color('red'), colorEnd: new THREE.Color('blue') },
    { start: 0.23, end: 0.32, colorStart: new THREE.Color('red'), colorEnd: new THREE.Color('blue') },
    { start: 0.32, end: 0.41, colorStart: new THREE.Color('red'), colorEnd: new THREE.Color('blue') },
    { start: 0.41, end: 0.49, colorStart: new THREE.Color('red'), colorEnd: new THREE.Color('blue') },
    { start: 0.49, end: 0.47, colorStart: new THREE.Color('red'), colorEnd: new THREE.Color('blue') },
    { start: 0.57, end: 0.66, colorStart: new THREE.Color('red'), colorEnd: new THREE.Color('blue') },
    { start: 0.66, end: 0.76, colorStart: new THREE.Color('red'), colorEnd: new THREE.Color('blue') },
    { start: 0.76, end: 0.84, colorStart: new THREE.Color('red'), colorEnd: new THREE.Color('blue') },
    { start: 0.84, end: 0.93, colorStart: new THREE.Color('red'), colorEnd: new THREE.Color('blue') },
  ]);
  // console.log(lineIndicated);

  return <line2 geometry={lineG} material={lineM} />;
});
