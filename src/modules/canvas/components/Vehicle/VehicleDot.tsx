import React, { useContext } from 'react';
import { Object3D, Vector2 } from 'three';
import { useUpdate } from 'react-three-fiber';

import { Color } from '../../canvas.model';
import { ThemeContext } from '../../contexts/ThemeContext';

interface VehicleProps {
  position: Vector2;
  color?: Color;
}

export const VehicleDot: React.FC<VehicleProps> = React.memo(({ position, color }) => {
  const theme = useContext(ThemeContext);

  const groupRef = useUpdate(
    (object: Object3D) => {
      object.rotation.set(Math.PI / 2, 0, 0);
      object.position.set(position.x, position.y, 0.15);
    },
    [position]
  );

  return (
    <group ref={groupRef}>
      <mesh>
        <cylinderGeometry attach="geometry" args={[0.12, 0.12, 0.1, 16]} />
        <meshBasicMaterial attach="material" color={color || theme.paths.selectedLine} transparent opacity={0.3} />
      </mesh>
      <mesh>
        <cylinderGeometry attach="geometry" args={[0.05, 0.05, 0.1, 16]} />
        <meshBasicMaterial attach="material" color={color || theme.paths.selectedLine} />
      </mesh>
    </group>
  );
});
