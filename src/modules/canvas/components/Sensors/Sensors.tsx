import React, { useMemo } from 'react';
import { IVisualizationScene, VisualizationType } from '../../canvas.model';
import { Sensor } from './Sensor';

interface ISensors extends Pick<IVisualizationScene, 'sensors' | 'points'> {
  type: VisualizationType;
}

export const Sensors: React.FC<ISensors> = ({ points, sensors, type }) => {
  const sensorModels = useMemo(
    () =>
      Object.entries(sensors).map(([sensorId, { point, tag }]) => (
        <Sensor key={sensorId} position={points[point]} type={type} id={sensorId} tag={tag} />
      )),
    [points, sensors, type]
  );

  return <>{sensorModels}</>;
};
