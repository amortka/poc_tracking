import React, { Dispatch, SetStateAction, useRef } from 'react';
import { useSceneBoundariesHook } from '../hooks/use-scene-boundaries.hook';
import { CameraControls } from './CameraControls';
import { Object3D } from 'three';

interface SceneProps {
  isD3: boolean;
  setOnZoomIn: Dispatch<SetStateAction<() => void>>;
  setOnZoomOut: Dispatch<SetStateAction<() => void>>;
  setOnZoomFit: Dispatch<SetStateAction<() => void>>;
}

export const Scene: React.FC<SceneProps> = ({ children, isD3, setOnZoomIn, setOnZoomOut, setOnZoomFit }) => {
  const group = useRef<Object3D>();
  const sceneBoundaries = useSceneBoundariesHook(group, []);

  return (
    <group ref={group} position={[0, 0, 0]}>
      <CameraControls
        boundaries={sceneBoundaries}
        isD3={isD3}
        setOnZoomIn={setOnZoomIn}
        setOnZoomOut={setOnZoomOut}
        setOnZoomFit={setOnZoomFit}
      />
      {children}
    </group>
  );
};
