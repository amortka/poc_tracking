import React, { Dispatch, SetStateAction, useRef } from 'react';
import { Object3D } from 'three';

import { useSceneBoundariesHook } from '../hooks/use-scene-boundaries.hook';
import { CameraControls } from './Cameras/CameraControls';
import { CameraControlsHorizontal } from './Cameras/CameraControlsHorizontal';

interface SceneProps {
  isD3: boolean;
  setOnZoomIn: Dispatch<SetStateAction<() => void>>;
  setOnZoomOut: Dispatch<SetStateAction<() => void>>;
  setOnZoomFit: Dispatch<SetStateAction<() => void>>;
  horizontalCamera: boolean;
}

export const Scene: React.FC<SceneProps> = ({
  children,
  isD3,
  setOnZoomIn,
  setOnZoomOut,
  setOnZoomFit,
  horizontalCamera,
}) => {
  const group = useRef<Object3D>();
  const sceneBoundaries = useSceneBoundariesHook(group, []);

  return (
    <group ref={group} position={[0, 0, 0]}>
      {horizontalCamera ? (
        <CameraControlsHorizontal boundaries={sceneBoundaries} isD3={isD3} />
      ) : (
        <CameraControls
          boundaries={sceneBoundaries}
          isD3={isD3}
          setOnZoomIn={setOnZoomIn}
          setOnZoomOut={setOnZoomOut}
          setOnZoomFit={setOnZoomFit}
        />
      )}
      {children}
    </group>
  );
};
