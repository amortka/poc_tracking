import React, { useMemo, useContext } from 'react';
import { CircleBufferGeometry, MeshBasicMaterial, InstancedMesh, Object3D } from 'three';
import { ThemeContext } from '../../contexts/ThemeContext';
import { IVisualization } from '../../../../models/main.model';
import { VisualizationType } from '../../canvas.model';

interface ISensors extends Pick<IVisualization, 'sensors' | 'points'> {
  type: VisualizationType;
}

export const Sensors: React.FC<ISensors> = ({ points, sensors, type }) => {
  const theme = useContext(ThemeContext);

  const instancedSensors = useMemo(() => {
    let sensorModels = Object.values(sensors);

    var geometry = new CircleBufferGeometry(0.15, 16);
    var material = new MeshBasicMaterial({ color: theme.sensor[type] });

    const mesh = new InstancedMesh(geometry, material, sensorModels.length);

    const transform = new Object3D();
    sensorModels.forEach(({ point }, index) => {
      const pointPosition = points[point];
      transform.position.set(pointPosition.x, pointPosition.y, 0);
      transform.updateMatrix();

      mesh.setMatrixAt(index++, transform.matrix);
    });

    return mesh;
  }, [points, sensors, theme.sensor, type]);

  return <primitive object={instancedSensors} />;
};
