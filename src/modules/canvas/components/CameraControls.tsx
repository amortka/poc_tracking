import React, { useContext, useEffect } from 'react';
import { useFrame, useThree, useUpdate } from 'react-three-fiber';
import { Box3, OrthographicCamera, Vector3 } from 'three';

import { OrbitControls } from '../libs/OrbitControls/OrbitControls';
import { CameraControlContext } from '../contexts/CameraContext';

const maxPolarAngle = Math.PI / 4;
const enableDamping = true;
const dampingFactor = 0.05;
const minAzimuthAngle = Math.PI / -3;
const maxAzimuthAngle = Math.PI / 3;

interface ICameraControls {
  boundaries: Box3;
  isD3: boolean;
}

function useDimensionToggle(isD3: boolean, controls: OrbitControls) {
  useEffect(() => {
    if (!controls) return;

    if (isD3) {
      controls.enableRotate = true;
      controls.update();
      controls.rotateTo(0.8, -0.7);
    } else {
      controls.enableRotate = false;
      controls.update();
      controls.rotateTo(0, 0);
    }
  }, [isD3, controls]);
}

export const CameraControls: React.FC<ICameraControls> = ({ boundaries, isD3 }) => {
  const { camera, gl } = useThree();
  const [, setOrbitControl] = useContext(CameraControlContext);

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

      const center: Vector3 = boundaries.getCenter(undefined);
      orthoCamera.zoom = zoomToBoundaries;
      orthoCamera.position.z = boundaries.max.z + Math.abs(orthoCamera.bottom);

      controls.panBoundaries = boundaries;
      controls.minZoom = zoomToBoundaries * 0.5;
      controls.maxZoom = zoomToBoundaries * 2;
      controls.dampingFactor = 0.15;

      camera.updateProjectionMatrix();
      camera.updateMatrix();
      controls.update();
      controls.moveTo(center.x, center.y);
      controls.update();

      controls.saveState();
    },
    [boundaries, gl.domElement, camera]
  );

  useDimensionToggle(isD3, controlsRef.current);

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
