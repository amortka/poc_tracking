import React, { Dispatch, SetStateAction, useContext, useEffect } from 'react';
import { useFrame, useThree, useUpdate } from 'react-three-fiber';
import { Box3, MOUSE, OrthographicCamera, Vector3, WebGLRenderer } from 'three';

import { OrbitControls } from '../libs/OrbitControls/OrbitControls';
import { CameraControlContext } from '../contexts/CameraContext';

const maxPolarAngle = Math.PI / 4;
const enableDamping = true;
const dampingFactor = 0.05;
const minAzimuthAngle = Math.PI / -3;
const maxAzimuthAngle = Math.PI / 3;

/**
 * Custom Hooks
 */

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

function useSetControlToContext(controls: OrbitControls, setOrbitControl: Dispatch<OrbitControls>) {
  useEffect(() => {
    if (!controls) return;
    setOrbitControl(controls);
  }, [controls, setOrbitControl]);
}

function useZoomingNav(
  controls: OrbitControls,
  setOnZoomIn: Dispatch<SetStateAction<() => void>>,
  setOnZoomOut: Dispatch<SetStateAction<() => void>>,
  setOnZoomFit: Dispatch<SetStateAction<() => void>>,
  camera: OrthographicCamera,
  gl: WebGLRenderer,
  boundaries: Box3
) {
  useEffect(
    () => {
      if (!controls) return;
      setOnZoomIn(() => () => controls.zoomInOut(0.5));
      setOnZoomOut(() => () => controls.zoomInOut(-0.5));
      setOnZoomFit(() => () => centerViewToBoundaries(controls, camera, gl, boundaries));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [controls, setOnZoomIn, setOnZoomOut, setOnZoomFit]
  );
}

function centerViewToBoundaries(
  controls: OrbitControls,
  camera: OrthographicCamera,
  gl: WebGLRenderer,
  boundaries: Box3,
  setZoomAndPanBoundaries: boolean = false
) {
  if (!boundaries) return;

  const container = gl.domElement;
  const orthoCamera = camera;
  const zoomToBoundaries =
    Math.min(
      container.offsetWidth / (boundaries.max.x - boundaries.min.x),
      container.offsetHeight / (boundaries.max.y - boundaries.min.y)
    ) * 0.8;

  const center: Vector3 = boundaries.getCenter(new Vector3());
  orthoCamera.zoom = zoomToBoundaries;
  orthoCamera.position.z = boundaries.max.z + Math.abs(orthoCamera.bottom);

  if (setZoomAndPanBoundaries) {
    controls.panBoundaries = boundaries;
    controls.minZoom = zoomToBoundaries * 0.5;
    controls.maxZoom = zoomToBoundaries * 6;
    controls.dampingFactor = 0.15;
    controls.update();
  }

  camera.updateProjectionMatrix();

  controls.moveTo(center.x + Math.random() / 100, center.y + Math.random() / 100);
  controls.update();

  controls.saveState();
}

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
