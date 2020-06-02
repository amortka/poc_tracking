import React, { useContext, useMemo } from 'react';
import { BufferGeometry, LineBasicMaterial } from 'three';

import { LineUtils } from '../../utils/line.utils';
import { Color, IPoint } from '../../canvas.model';
import { ThemeContext } from '../../contexts/ThemeContext';
import { useMemoDistinct } from '../../hooks/use-memo-distinct.hook';
import { equal } from '../../../../utils/object.utils';

interface ObjectLineProps {
  shapePoints: IPoint[];
  fromGround: number;
  color: Color;
  selected: boolean;
}
export const ObjectLine: React.FC<ObjectLineProps> = ({ shapePoints, fromGround, selected, color }) => {
  const theme = useContext(ThemeContext);

  const lineGeometry = useMemoDistinct(
    () => {
      const points = LineUtils.getPathPointsFromPointCoordinates(shapePoints, fromGround + 0.002);
      return new BufferGeometry().setFromPoints(points);
    },
    [shapePoints, fromGround],
    equal
  );

  const lineMaterial = useMemo(() => new LineBasicMaterial({ color: selected ? color : theme.objects.D2.line }), [
    selected,
    theme.objects.D2.line,
    color,
  ]);

  return <lineLoop args={[lineGeometry, lineMaterial]} />;
};
