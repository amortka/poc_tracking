import React, { useContext, useMemo } from 'react';
import { CircleBufferGeometry } from 'three';
import { IPoint } from '../../../../models/main.model';
import { ThemeContext } from '../../contexts/ThemeContext';
import { VisualizationType } from '../../canvas.model';

const circleRadius = 0.15;
const circleSegments = 16;

interface ISensor {
  position: IPoint;
  type: VisualizationType;
}

export const Sensor: React.FC<ISensor> = ({ position, type }) => {
  const theme = useContext(ThemeContext);
  const geometry = useMemo(() => new CircleBufferGeometry(circleRadius, circleSegments), []);

  return (
    <mesh args={[geometry]} position-x={position.x} position-y={position.y} position-z={0}>
      <meshBasicMaterial attach="material" color={theme.sensor[type]} />
    </mesh>
  );
};
