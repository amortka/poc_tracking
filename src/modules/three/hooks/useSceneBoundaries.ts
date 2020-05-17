import { useState, useEffect } from 'react';
import { Box3, Vector3 } from 'three';

export const useSceneBoundaries = (scene: React.MutableRefObject<THREE.Object3D>, dependents: any[]): THREE.Box3 => {
  const [sceneBoundaries, setSceneBoundaries] = useState<THREE.Box3>(null);

  useEffect(() => {
    console.log('useSceneBoundaries');
    const boundaries = new Box3();

    boundaries
      .setFromObject(scene.current)
      .getCenter(scene.current.position)
      .multiplyScalar(-1)
      .multiply(new Vector3(1, 1, 0));

    boundaries.setFromObject(scene.current);
    setSceneBoundaries(boundaries);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependents);

  return sceneBoundaries;
};
