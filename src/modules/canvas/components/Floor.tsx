import React, { useContext } from 'react';
import { DoubleSide } from 'three';
import { ThemeContext } from '../contexts/ThemeContext';
import { VisualizationType } from '../canvas.model';

interface FloorProps {
  type: VisualizationType;
}

export const Floor: React.FC<FloorProps> = React.memo(({ type }) => {
  const theme = useContext(ThemeContext);

  return (
    <mesh position-z={-0.1}>
      <planeBufferGeometry attach="geometry" args={[100, 100]} />
      <meshBasicMaterial attach="material" side={DoubleSide} color={theme.floor[type]} />
    </mesh>
  );
});
