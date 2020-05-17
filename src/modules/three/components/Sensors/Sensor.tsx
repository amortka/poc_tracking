import React, { useContext, useMemo } from 'react';
import { CircleBufferGeometry } from 'three';
import { IPoint, ISensor } from '../../../../models/main.model';
import { ThemeContext } from '../../contexts/ThemeContext';
import { VisualizationType } from '../../canvas.model';

interface SensorProps extends Pick<ISensor, 'tag'> {
  position: IPoint;
  type: VisualizationType;
  id: string;
}

const circleRadius = 0.15;
const circleSegments = 16;

export const Sensor: React.FC<SensorProps> = ({ position, type, id, tag }) => {
  const theme = useContext(ThemeContext);
  const geometry = useMemo(() => new CircleBufferGeometry(circleRadius, circleSegments), []);

  return (
    <mesh
      args={[geometry]}
      position-x={position.x}
      position-y={position.y}
      position-z={0}
      name={`SENSOR_${id}`}
      userData={{ position, tag }}>
      <meshBasicMaterial attach="material" color={theme.sensor[type]} />
    </mesh>
  );
};
