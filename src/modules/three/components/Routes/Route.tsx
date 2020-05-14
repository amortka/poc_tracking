import React from 'react';
import { AnimatedVehicle } from '../Vehicle/Vehicle';

interface RouteProps {
  path: THREE.Path;
  segments: { [sensorId: string]: number };
  vehicles?: {
    lastPosition: number;
    nextPosition: number;
  }[];
}

const vehicle = {
  lastPosition: 'qeculymv',
  nextPosition: 'wytjebmg',
};

export const Route: React.FC<RouteProps> = ({ path, segments }) => {
  return (
    <AnimatedVehicle
      lastPosition={vehicle.lastPosition}
      nextPosition={vehicle.nextPosition}
      segments={segments}
      path={path}
    />
  );
};
