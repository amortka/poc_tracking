import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { CameraControls } from './CameraControls';
import { useThree } from 'react-three-fiber';

interface SceneProps {
  axesHelper?: number;
}

export const Scene: React.FC<SceneProps> = ({ children, axesHelper = 5 }) => {
  const group = useRef<THREE.Object3D>();
  const [sceneBoundaries, setSceneBoundaries] = useState<THREE.Box3>(null);
  const { scene } = useThree();

  useEffect(() => {
    const boundaries = new THREE.Box3().setFromObject(group.current);

    boundaries.getCenter(group.current.position).multiplyScalar(-1).multiply(new THREE.Vector3(1, 1, 0));

    // TODO Do not get Box3 from object twice (even after update)
    boundaries.setFromObject(group.current);
    setSceneBoundaries(boundaries);
  }, [group, children]);

  useEffect(() => {
    if (!axesHelper) return;
    const axes = new THREE.AxesHelper(axesHelper);
    scene.add(axes);
  }, [axesHelper]);

  return (
    <group ref={group} position={[0, 0, 0]}>
      <CameraControls boundaries={sceneBoundaries} />
      {children}
    </group>
  );
};
