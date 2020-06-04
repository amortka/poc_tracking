import React, { useContext } from 'react';
import { useFrame, useThree, useUpdate } from 'react-three-fiber';
import { Box3, MOUSE, OrthographicCamera } from 'three';

import { OrbitControls } from '../../libs/OrbitControls/OrbitControls';
import { CameraControlContext } from '../../contexts/CameraContext';
import { centerViewToBoundariesHorizontal } from './hooks/use-zooming-nav.hook';
import { useDimensionToggle } from './hooks/use-dimension-toggle.hook';
import { useSetControlToContext } from './hooks/use-set-control-to-context.hook';

const maxPolarAngle = Math.PI / 4;
const enableDamping = true;
const dampingFactor = 0.05;
const minAzimuthAngle = Math.PI / -3;
const maxAzimuthAngle = Math.PI / 3;

interface ICameraControls {
  boundaries: Box3;
  isD3: boolean;
}

export const CameraControlsHorizontal: React.FC<ICameraControls> = ({ boundaries, isD3 }) => {
  const { camera, gl } = useThree();
  const [, setOrbitControl] = useContext(CameraControlContext);

  const controlsRef = useUpdate<OrbitControls>(
    (controls) => {
      controls.mouseButtons = {
        LEFT: MOUSE.PAN,
        MIDDLE: MOUSE.DOLLY,
        RIGHT: MOUSE.ROTATE,
      };

      if (!boundaries) return;
      const boundariesBox = boundaries.clone();
      boundariesBox.min.setY(0);
      boundariesBox.max.setY(0);

      centerViewToBoundariesHorizontal(controls, camera as OrthographicCamera, gl, boundariesBox, true);
    },
    [boundaries, gl.domElement, camera]
  );

  useDimensionToggle(isD3, controlsRef.current);

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
