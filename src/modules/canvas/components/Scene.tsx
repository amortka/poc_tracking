import React, { useRef } from 'react';
import { useSceneBoundariesHook } from '../hooks/use-scene-boundaries.hook';
import { CameraControls } from './CameraControls';
import { Object3D } from 'three';

interface SceneProps {
  isD3: boolean;
}

export const Scene: React.FC<SceneProps> = ({ children, isD3 }) => {
  const group = useRef<Object3D>();
  const sceneBoundaries = useSceneBoundariesHook(group, []);

  return (
    <group ref={group} position={[0, 0, 0]}>
      <CameraControls boundaries={sceneBoundaries} isD3={isD3} />
      {children}
    </group>
  );
};
