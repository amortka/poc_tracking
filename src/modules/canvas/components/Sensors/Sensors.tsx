import React, { Suspense } from 'react';

import { ISensorStateMeta, IVisualizationScene } from '../../canvas.model';
import { Sensor } from './Sensor';
import { Dictionary } from '../../../../app.model';

interface ISensors extends Pick<IVisualizationScene, 'sensors' | 'points'> {
  state: Dictionary<ISensorStateMeta>;
}

export const Sensors: React.FC<ISensors> = React.memo(({ points, sensors, state }) => {
  return (
    <>
      {Object.entries(sensors).map(([sensorId, { point, tag, meta }]) => (
        <Suspense fallback={null} key={sensorId}>
          <Sensor
            position={points[point]}
            id={sensorId}
            tag={tag}
            selected={state[sensorId]?.selected}
            selectable={meta.selectable}
          />
        </Suspense>
      ))}
    </>
  );
});
