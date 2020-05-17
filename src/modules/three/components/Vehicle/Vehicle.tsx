import React, { useMemo } from 'react';
import { CylinderBufferGeometry, MeshBasicMaterial } from 'three';

interface IVehicle {
  type: string;
  path: THREE.Path;
  progress: number;
}

export const Vehicle: React.FC<IVehicle> = ({ progress, path }) => {
  const position = path.getPoint(progress);

  const geometry = useMemo(() => new CylinderBufferGeometry(0.15, 0.15, 0.5, 16), []);
  const material = useMemo(() => new MeshBasicMaterial({ color: 0xffff00 }), []);

  // TODO Predict vehicle direction based on vehicle length and sensor (on vehicle) position

  return <mesh args={[geometry, material]} position-x={position.x} position-y={position.y} rotation-x={Math.PI / 2} />;
};
