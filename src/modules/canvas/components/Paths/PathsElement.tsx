import React, { useContext, useEffect, useMemo, useRef } from 'react';
import { BufferGeometry, Line } from 'three';

import { IPathWithPointsCoordinates } from '../../canvas.model';
import { LineUtils } from '../../utils/line.utils';
import { ThemeContext } from '../../contexts/ThemeContext';

export interface PathsElementProps extends IPathWithPointsCoordinates {}

export const PathsElement: React.FC<PathsElementProps> = React.memo(({ points, tag, meta }) => {
  const lineRef = useRef<Line>(null);
  const fromGround = useRef(0.02);

  const theme = useContext(ThemeContext);
  const pointsV = LineUtils.getPathPointsFromPointCoordinates(points, fromGround.current);

  const lineG = useMemo(() => new BufferGeometry().setFromPoints(pointsV), [pointsV]);

  useEffect(() => {
    lineRef?.current.computeLineDistances();
  }, [lineRef, points]);

  return (
    // @ts-ignore
    <line ref={lineRef} geometry={lineG}>
      <lineDashedMaterial
        attach="material"
        color={meta.selected ? theme.paths.selectedLine : theme.objects.D2.line}
        dashSize={theme.paths.dashSize}
        gapSize={theme.paths.gapSize}
        scale={1}
      />
    </line>
  );
});
