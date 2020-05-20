import React, { useContext, useEffect } from 'react';
import { useFrame, useThree, useUpdate } from 'react-three-fiber';
import { Box3, OrthographicCamera } from 'three';

import { OrbitControls } from '../libs/OrbitControls/OrbitControls';
import { CameraControlContext } from '../contexts/CameraContext';

const maxPolarAngle = Math.PI / 4;
const enableDamping = true;
const dampingFactor = 0.05;
const minAzimuthAngle = Math.PI / -3;
const maxAzimuthAngle = Math.PI / 3;

interface ICameraControls {
  boundaries: Box3;
}

export const CameraControls: React.FC<ICameraControls> = ({ boundaries }) => {
  const { camera, gl } = useThree();
  const [orbitControls, setOrbitControl] = useContext(CameraControlContext);

  const controlsRef = useUpdate<OrbitControls>(
    (controls) => {
      if (!boundaries) return;

      const container = gl.domElement;
      const orthoCamera = camera as OrthographicCamera;
      const zoomToBoundaries =
        Math.min(
          container.offsetWidth / (boundaries.max.x - boundaries.min.x),
          container.offsetHeight / (boundaries.max.y - boundaries.min.y)
        ) * 0.8;

      orthoCamera.zoom = zoomToBoundaries;
      orthoCamera.position.z = boundaries.max.z + Math.abs(orthoCamera.bottom);

      controls.panBoundaries = boundaries;
      controls.minZoom = zoomToBoundaries * 0.5;
      controls.maxZoom = zoomToBoundaries * 2;

      camera.updateProjectionMatrix();
      camera.updateMatrix();
      controls.update();
    },
    [boundaries, gl.domElement, camera]
  );

  useEffect(
    () => {
      if (!controlsRef.current) return;
      setOrbitControl(controlsRef.current);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

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
