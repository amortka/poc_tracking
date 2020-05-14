import React from 'react';
import { VehicleAnimation } from '../../../../models/main.model';
import { Vehicle } from '../Vehicle/Vehicle';

interface RouteProps {
  path: THREE.Path;
  vehicles: Pick<VehicleAnimation, 'tag' | 'type' | 'progress'>[];
}

export const Route: React.FC<RouteProps> = ({ path, vehicles }) => {
  return (
    <>
      {vehicles.map(({ tag, type, progress }) => (
        <Vehicle key={tag} progress={progress} path={path} type={type} />
      ))}
    </>
  );
};
