import React, { useContext, useMemo } from 'react';
import { BufferGeometry, Line } from 'three';
import { useUpdate } from 'react-three-fiber';

import { IPathStateMeta, IPathWithPointsCoordinates } from '../../canvas.model';
import { LineUtils } from '../../utils/line.utils';
import { ThemeContext } from '../../contexts/ThemeContext';

const fromGround = 0.02;

export interface PathsElementProps extends IPathWithPointsCoordinates {
  state: IPathStateMeta;
}

export const PathsElement: React.FC<PathsElementProps> = ({ points, state }) => {
  const theme = useContext(ThemeContext);

  const geometry = useMemo(() => {
    const pointsVec3 = LineUtils.getPathPointsFromPointCoordinates(points, fromGround);
    return new BufferGeometry().setFromPoints(pointsVec3);
  }, [points]);

  const ref = useUpdate<Line>(
    (line) => {
      line.computeLineDistances();
    },
    [points]
  );

  return (
    // @ts-ignore
    <line ref={ref} geometry={geometry}>
      <lineDashedMaterial
        attach="material"
        color={state?.selected ? theme.paths.selectedLine : theme.objects.D2.line}
        dashSize={theme.paths.dashSize}
        gapSize={theme.paths.gapSize}
        scale={1}
      />
    </line>
  );
};
