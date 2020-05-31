import React, { useMemo } from 'react';
import { MeshBasicMaterial, Vector2 } from 'three';
import { Color } from '../../canvas.model';
import { useVehicleGeometry, useVehicleUpdate } from './utils';

interface VehicleProps {
  type: string;
  position: Vector2;
  rotation: Vector2;
  color: Color;
}

export const Vehicle: React.FC<VehicleProps> = ({ position, rotation, color }) => {
  const material = useMemo(() => new MeshBasicMaterial({ color }), [color]);
  const geometry = useVehicleGeometry();

  const ref = useVehicleUpdate(rotation);

  return (
    <mesh ref={ref} args={[geometry, material]} position-x={position.x} position-y={position.y} position-z={0.15} />
  );
};
