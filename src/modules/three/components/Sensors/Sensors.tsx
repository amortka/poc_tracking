import React, { useMemo } from 'react';
import { IVisualization } from '../../../../models/main.model';
import { VisualizationType } from '../../canvas.model';
import { Sensor } from './Sensor';

interface ISensors extends Pick<IVisualization, 'sensors' | 'points'> {
  type: VisualizationType;
}

export const Sensors: React.FC<ISensors> = ({ points, sensors, type }) => {
  const sensorModels = useMemo(
    () =>
      Object.entries(sensors).map(([sensorId, { point }]) => (
        <Sensor key={sensorId} position={points[point]} type={type} />
      )),
    [points, sensors, type]
  );

  return <>{sensorModels}</>;
};
