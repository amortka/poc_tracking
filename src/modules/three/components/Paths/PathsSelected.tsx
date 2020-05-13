import React, { useContext, useRef } from 'react';
import { IPathWithPointsCoordinates } from '../../canvas.model';
import { Line2 } from 'three/examples/jsm/lines/Line2.js';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js';
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry.js';
import { extend } from 'react-three-fiber';
import { ThemeContext } from '../../contexts/ThemeContext';
import { LineUtils } from '../../utils/line.utils';

extend({ Line2, LineMaterial, LineGeometry });

export interface PathsDefaultProps extends IPathWithPointsCoordinates {}

export const PathsSelected: React.FC<PathsDefaultProps> = React.memo(({ points, tag }) => {
  const theme = useContext(ThemeContext);

  const fromGround = useRef(0.02);
  const pointsV = LineUtils.getPathPointsFromPointCoordinates(points, fromGround.current);
  const positionArray: number[] = [];
  pointsV.forEach((v) => positionArray.push(...v.toArray()));

  const lineG = new LineGeometry().setPositions(positionArray);
  // geometry.setColors(colors);
  const lineM = new LineMaterial({
    color: 0xaa00ff,
    linewidth: 0.005,
    vertexColors: true,
    dashed: false,
  });

  const line2 = new Line2(lineG, lineM);
  line2.computeLineDistances();
  line2.scale.set(1, 1, 1);

  return (
    // @ts-ignore
    <line2 geometry={lineG} material={lineM} />
  );
});
