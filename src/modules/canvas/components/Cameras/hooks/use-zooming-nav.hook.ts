import { OrbitControls } from '../../../libs/OrbitControls/OrbitControls';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { Box3, OrthographicCamera, Vector3, WebGLRenderer } from 'three';

export function useZoomingNav(
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
      setOnZoomIn && setOnZoomIn(() => () => controls.zoomInOut(0.5));
      setOnZoomOut && setOnZoomOut(() => () => controls.zoomInOut(-0.5));
      setOnZoomFit && setOnZoomFit(() => () => centerViewToBoundaries(controls, camera, gl, boundaries));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [controls, setOnZoomIn, setOnZoomOut, setOnZoomFit]
  );
}

export function centerViewToBoundaries(
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

export function centerViewToBoundariesHorizontal(
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
    ) * 0.9;

  const center: Vector3 = boundaries.getCenter(new Vector3());
  orthoCamera.zoom = zoomToBoundaries;
  orthoCamera.position.z = boundaries.max.z + Math.abs(orthoCamera.bottom);
  if (setZoomAndPanBoundaries) {
    controls.enablePan = false;
    controls.panBoundaries = boundaries;
    controls.minZoom = zoomToBoundaries * 1;
    controls.maxZoom = 140;
    controls.dampingFactor = 0.8;
    controls.update();
  }

  camera.updateProjectionMatrix();

  controls.moveTo(center.x + Math.random() / 1000, center.y + Math.random() / 1000);
  controls.update();

  controls.saveState();
}
