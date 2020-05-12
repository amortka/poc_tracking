import React, { useEffect, useRef, useState } from 'react';
import { Box3, Vector3 } from 'three';
import { CameraControls } from './CameraControls';

export const Scene: React.FC = ({ children }) => {
  const scene = useRef<THREE.Object3D>();
  const [sceneBoundaries, setSceneBoundaries] = useState<Box3>(null);

  useEffect(() => {
    const boundaries = new Box3().setFromObject(scene.current);

    boundaries.getCenter(scene.current.position).multiplyScalar(-1).multiply(new Vector3(1, 1, 0));

    // TODO Do not get Box3 from object twice (even after update)
    boundaries.setFromObject(scene.current);
    setSceneBoundaries(boundaries);
  }, [scene, children]);

  return (
    <group ref={scene} position={[0, 0, 0]}>
      <CameraControls boundaries={sceneBoundaries} />
      {children}
    </group>
  );
};
