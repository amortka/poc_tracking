import React, { useMemo } from 'react';
import { IVisualizationScene } from '../../../../models/main.model';
import { VisualizationType } from '../../canvas.model';
import { Sensor } from './Sensor';

interface ISensors extends Pick<IVisualizationScene, 'sensors' | 'points'> {
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
