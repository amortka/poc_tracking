import React, { useContext, useMemo } from 'react';
import { BufferGeometry, LineBasicMaterial, MeshBasicMaterial } from 'three';

import { LineUtils } from '../../utils/line.utils';
import { Color, IPoint } from '../../canvas.model';
import { ThemeContext } from '../../contexts/ThemeContext';

interface ObjectLineProps {
  shapePoints: IPoint[];
  fromGround: number;
  color: Color;
  selected: boolean;
}
export const ObjectLine: React.FC<ObjectLineProps> = ({ shapePoints, fromGround, selected, color }) => {
  const theme = useContext(ThemeContext);

  const lineGeometry = useMemo(() => {
    const points = LineUtils.getPathPointsFromPointCoordinates(shapePoints, fromGround + 0.002);
    return new BufferGeometry().setFromPoints(points);
  }, [shapePoints, fromGround]);

  const lineMaterial = useMemo(() => new LineBasicMaterial({ color: selected ? color : theme.objects.D2.line }), [
    selected,
    theme.objects.D2.line,
    color,
  ]);

  return <lineLoop args={[lineGeometry, lineMaterial]} />;
};
