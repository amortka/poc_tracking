import React, { useMemo } from 'react';
import { BoxBufferGeometry, MeshBasicMaterial, Vector3 } from 'three';
import { useUpdate } from 'react-three-fiber';

interface IVehicle {
  type: string;
  position: THREE.Vector2;
  rotation: THREE.Vector2;
}

export const Vehicle: React.FC<IVehicle> = ({ position, rotation }) => {
  const geometry = useMemo(() => new BoxBufferGeometry(0.25, 0.5, 0.25), []);
  const material = useMemo(() => new MeshBasicMaterial({ color: 0xffff00, opacity: 0.3, transparent: true }), []);

  // TODO Predict vehicle direction based on vehicle length and sensor (on vehicle) position
  const ref = useUpdate<THREE.Mesh>(
    (mesh) => {
      const up = new Vector3(0, 1, 0);
      let axis = new Vector3();
      const tangent3d = new Vector3(rotation.x, rotation.y, 0);

      axis = axis.crossVectors(up, tangent3d).normalize();

      const radians = Math.acos(up.dot(tangent3d));

      mesh.quaternion.setFromAxisAngle(axis, radians);
    },
    [rotation]
  );

  return (
    <mesh ref={ref} args={[geometry, material]} position-x={position.x} position-y={position.y} position-z={0.15} />
  );
};
