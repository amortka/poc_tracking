import React, { useMemo, Suspense } from 'react';
import { IVisualizationScene } from '../../../../app.model';
import { VisualizationType } from '../../canvas.model';
import { Sensor } from './Sensor';

interface ISensors extends Pick<IVisualizationScene, 'sensors' | 'points'> {
  type: VisualizationType;
}

export const Sensors: React.FC<ISensors> = ({ points, sensors, type }) => {
  const sensorModels = useMemo(
    () =>
      Object.entries(sensors).map(([sensorId, { point, tag }], index) => (
        <Suspense fallback={null}>
          <Sensor
            key={sensorId}
            position={points[point]}
            type={type}
            id={sensorId}
            tag={tag}
            isOutline={Boolean(index % 2)}
          />
        </Suspense>
      )),
    [points, sensors, type]
  );

  return <>{sensorModels}</>;
};
