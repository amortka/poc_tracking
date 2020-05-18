import React, { useRef } from 'react';
import { useSceneBoundaries } from '../hooks/useSceneBoundaries';
import { CameraControls } from './CameraControls';
import { Object3D } from 'three';

interface SceneProps {}

export const Scene: React.FC<SceneProps> = ({ children }) => {
  const group = useRef<Object3D>();
  const sceneBoundaries = useSceneBoundaries(group, []);

  return (
    <group ref={group} position={[0, 0, 0]}>
      <CameraControls boundaries={sceneBoundaries} />
      {children}
    </group>
  );
};
