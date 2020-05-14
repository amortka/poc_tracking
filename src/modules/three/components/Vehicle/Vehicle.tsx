import React, { useState } from 'react';
import { useFrame } from 'react-three-fiber';

interface IVehicle {
  lastPosition: string;
  nextPosition: string;
  segments: { [sensorId: string]: number };
  path: THREE.Path;
}

const avgSpeed = 0.0001; // dlugostrasy / sredniapredkosc

export const AnimatedVehicle: React.FC<IVehicle> = ({ lastPosition, nextPosition, segments, path }) => {
  const [position, setPosition] = useState<number>(segments[lastPosition]);

  useFrame(() => {
    if (position < segments[nextPosition]) {
      setPosition((current) => {
        const newValue = current + avgSpeed;
        return newValue < segments[nextPosition] ? newValue : current;
      });
    }
  });

  const vPos = path.getPoint(position);

  return (
    <mesh position-x={vPos.x} position-y={vPos.y} rotation-x={Math.PI / 2}>
      <cylinderGeometry attach="geometry" args={[0.15, 0.15, 0.5, 16]} />
      <meshBasicMaterial attach="material" color={0xffff00} />
    </mesh>
  );
};
