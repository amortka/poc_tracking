import React, { useEffect, useRef } from 'react';
// HERE
// eslint-disable-next-line  @typescript-eslint/no-unused-vars
import { extend, ReactThreeFiber, useFrame, useResource, useThree, useUpdate } from 'react-three-fiber';
import { OrbitControls } from '../../../libs/OrbitControls/OrbitControls';
import { VisualizationType } from '../canvas.model';

extend({ OrbitControls });

// HERE
declare global {
  namespace JSX {
    interface IntrinsicElements {
      orbitControls: ReactThreeFiber.Object3DNode<OrbitControls, typeof OrbitControls>;
    }
  }
}

const maxPolarAngle = Math.PI / 4;
const enableDamping = true;
const dampingFactor = 0.05;
const minAzimuthAngle = Math.PI / -3;
const maxAzimuthAngle = Math.PI / 3;

interface ICameraControls {
  boundaries: THREE.Box3;
  type: VisualizationType;
}

export const CameraControls: React.FC<ICameraControls> = ({ boundaries, type }) => {
  const controlsRef = useRef<OrbitControls>();
  const { camera, gl } = useThree();

  useEffect(() => {
    if (!boundaries) return;

    const container = gl.domElement;
    const orthoCamera = camera as THREE.OrthographicCamera;
    const zoomToBoundaries =
      Math.min(
        container.offsetWidth / (boundaries.max.x - boundaries.min.x),
        container.offsetHeight / (boundaries.max.y - boundaries.min.y)
      ) * 0.8;

    orthoCamera.zoom = zoomToBoundaries;
    orthoCamera.position.z = boundaries.max.z + Math.abs(orthoCamera.bottom);

    controlsRef.current.panBoundaries = boundaries;
    controlsRef.current.minZoom = zoomToBoundaries * 0.5;
    controlsRef.current.maxZoom = zoomToBoundaries * 2;

    camera.updateProjectionMatrix();
    camera.updateMatrix();
    controlsRef.current.update();
  }, [boundaries, gl.domElement, camera]);

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
