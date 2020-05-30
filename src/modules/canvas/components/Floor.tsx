import React, { useContext, useMemo } from 'react';
import { DoubleSide, PlaneBufferGeometry } from 'three';
import { ThemeContext } from '../contexts/ThemeContext';
import { VisualizationType } from '../canvas.model';

interface FloorProps {
  type: VisualizationType;
}

export const Floor: React.FC<FloorProps> = React.memo(
  ({ type }) => {
    const theme = useContext(ThemeContext);

    // const geometry = useMemo(() => new PlaneBufferGeometry(100, 100), []);

    console.log('Floor');
    return (
      <mesh position-z={-0.1}>
        <planeBufferGeometry attach="geometry" args={[100, 100]} />
        <meshBasicMaterial attach="material" side={DoubleSide} color={theme.floor[type]} />
      </mesh>
    );
  },
  () => true
);
