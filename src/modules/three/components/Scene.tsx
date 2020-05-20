import React, { useRef } from 'react';
import { useSceneBoundariesHook } from '../hooks/use-scene-boundaries.hook';
import { CameraControls } from './CameraControls';
import { Object3D } from 'three';

interface SceneProps {}

export const Scene: React.FC<SceneProps> = ({ children }) => {
  const group = useRef<Object3D>();
  const sceneBoundaries = useSceneBoundariesHook(group, []);

  return (
    <group ref={group} position={[0, 0, 0]}>
      <CameraControls boundaries={sceneBoundaries} />
      {children}
    </group>
  );
};
