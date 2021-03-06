import React, { useContext, useMemo } from 'react';
import { Vector3, BufferGeometry } from 'three';
import { ThemeContext } from '../../contexts/ThemeContext';
import { IPoint, IWall } from '../../canvas.model';

interface WallProps extends Omit<IWall, 'start' | 'end'> {
  start: IPoint;
  end: IPoint;
}

export const WallD2: React.FC<WallProps> = ({ start, end }) => {
  const theme = useContext(ThemeContext);

  const geometry = useMemo(() => {
    const points = [new Vector3(start.x, start.y, 0), new Vector3(end.x, end.y, 0)];
    return new BufferGeometry().setFromPoints(points);
  }, [start.x, start.y, end.x, end.y]);

  return (
    // @ts-ignore
    <line geometry={geometry}>
      <lineBasicMaterial attach="material" color={theme.walls.D2.line} />
    </line>
  );
};
