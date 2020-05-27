import React, { useContext, useMemo } from 'react';
import { DoubleSide, PlaneBufferGeometry } from 'three';
import { ThemeContext } from '../contexts/ThemeContext';
import { VisualizationType } from '../canvas.model';

interface FloorProps {
  type: VisualizationType;
}

export const Floor: React.FC<FloorProps> = ({ type }) => {
  const theme = useContext(ThemeContext);

  const geometry = useMemo(() => new PlaneBufferGeometry(100, 100), []);

  return (
    <mesh args={[geometry]} position-z={-0.1}>
      <meshBasicMaterial attach="material" side={DoubleSide} color={theme.floor[type]} />
    </mesh>
  );
};
