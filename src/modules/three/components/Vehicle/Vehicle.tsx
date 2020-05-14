import React from 'react';

interface IVehicle {
  type: string;
  path: THREE.Path;
  progress: number;
}

export const Vehicle: React.FC<IVehicle> = React.memo(({ progress, path }) => {
  const position = path.getPoint(progress);

  // TODO Predict vehicle direction based on vehicle length and sensor (on vehicle) position

  return (
    <mesh position-x={position.x} position-y={position.y} rotation-x={Math.PI / 2}>
      <cylinderGeometry attach="geometry" args={[0.15, 0.15, 0.5, 16]} />
      <meshBasicMaterial attach="material" color={0xffff00} />
    </mesh>
  );
});
