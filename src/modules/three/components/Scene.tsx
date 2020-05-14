import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { CameraControls } from './CameraControls';
import { VisualizationType } from '../canvas.model';

interface SceneProps {
  type: VisualizationType;
}

export const Scene: React.FC<SceneProps> = ({ children, type }) => {
  const group = useRef<THREE.Object3D>();
  const [sceneBoundaries, setSceneBoundaries] = useState<THREE.Box3>(null);

  useEffect(() => {
    const boundaries = new THREE.Box3().setFromObject(group.current);

    boundaries.getCenter(group.current.position).multiplyScalar(-1).multiply(new THREE.Vector3(1, 1, 0));

    // TODO Do not get Box3 from object twice (even after update)
    boundaries.setFromObject(group.current);
    setSceneBoundaries(boundaries);
  }, [group, children]);

  return (
    <group ref={group} position={[0, 0, 0]}>
      <CameraControls boundaries={sceneBoundaries} type={type} />
      {children}
    </group>
  );
};
