import React, { Dispatch, SetStateAction, useContext } from 'react';
import { useFrame, useThree, useUpdate } from 'react-three-fiber';
import { Box3, MOUSE, OrthographicCamera } from 'three';

import { CameraControlContext } from '../../contexts/CameraContext';
import { centerViewToBoundaries, useZoomingNav } from './hooks/use-zooming-nav.hook';
import { OrbitControls } from '../../libs/OrbitControls/OrbitControls';
import { useDimensionToggle } from './hooks/use-dimension-toggle.hook';
import { useSetControlToContext } from './hooks/use-set-control-to-context.hook';

const maxPolarAngle = Math.PI / 4;
const enableDamping = true;
const dampingFactor = 0.05;
const minAzimuthAngle = Math.PI / -3;
const maxAzimuthAngle = Math.PI / 3;

/**
 * Component
 */

interface ICameraControls {
  boundaries: Box3;
  isD3: boolean;
  setOnZoomIn: Dispatch<SetStateAction<() => void>>;
  setOnZoomOut: Dispatch<SetStateAction<() => void>>;
  setOnZoomFit: Dispatch<SetStateAction<() => void>>;
}

export const CameraControls: React.FC<ICameraControls> = ({
  boundaries,
  isD3,
  setOnZoomIn,
  setOnZoomOut,
  setOnZoomFit,
}) => {
  const { camera, gl } = useThree();
  const [, setOrbitControl] = useContext(CameraControlContext);

  const controlsRef = useUpdate<OrbitControls>(
    (controls) => {
      controls.mouseButtons = {
        LEFT: MOUSE.PAN,
        MIDDLE: MOUSE.DOLLY,
        RIGHT: MOUSE.ROTATE,
      };
      centerViewToBoundaries(controls, camera as OrthographicCamera, gl, boundaries, true);
    },
    [boundaries, gl.domElement, camera]
  );

  useDimensionToggle(isD3, controlsRef.current);

  useZoomingNav(
    controlsRef.current,
    setOnZoomIn,
    setOnZoomOut,
    setOnZoomFit,
    camera as OrthographicCamera,
    gl,
    boundaries
  );

  useSetControlToContext(controlsRef.current, setOrbitControl);

  useFrame(() => controlsRef.current.update());

  return (
    <orbitControls
      ref={controlsRef}
      args={[camera, gl.domElement]}
      enableDamping={enableDamping}
      dampingFactor={dampingFactor}
      minAzimuthAngle={minAzimuthAngle}
      maxAzimuthAngle={maxAzimuthAngle}
      maxPolarAngle={maxPolarAngle}
    />
  );
};
