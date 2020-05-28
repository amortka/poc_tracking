import React, { useContext, useMemo } from 'react';
import { BufferGeometry } from 'three';

import { LineUtils } from '../../utils/line.utils';
import { IPoint } from '../../canvas.model';
import { ThemeContext } from '../../contexts/ThemeContext';

interface ObjectLineProps {
  shapePoints: IPoint[];
  fromGround: number;
}
export const ObjectLine: React.FC<ObjectLineProps> = ({ shapePoints, fromGround }) => {
  const theme = useContext(ThemeContext);

  const lineGeometry = useMemo(() => {
    const points = LineUtils.getPathPointsFromPointCoordinates(shapePoints, fromGround + 0.002);
    return new BufferGeometry().setFromPoints(points);
  }, [shapePoints, fromGround]);
  return (
    <lineLoop args={[lineGeometry]}>
      <lineBasicMaterial attach="material" color={theme.objects.D2.line} />
    </lineLoop>
  );
};
