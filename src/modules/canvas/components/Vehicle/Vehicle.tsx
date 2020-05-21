import React, { useMemo } from 'react';
import { CylinderBufferGeometry, MeshBasicMaterial, BoxGeometry, BoxBufferGeometry, Vector3, Object3D } from 'three';
import { useUpdate } from 'react-three-fiber';

interface IVehicle {
  type: string;
  path: THREE.Path | THREE.CurvePath<THREE.Vector2>;
  progress: number;
}

export const Vehicle: React.FC<IVehicle> = ({ progress, path }) => {
  const position = path.getPoint(progress);

  const geometry = useMemo(() => new BoxBufferGeometry(0.25, 0.5, 0.25), []);
  const material = useMemo(() => new MeshBasicMaterial({ color: 0xffff00 }), []);

  // TODO Predict vehicle direction based on vehicle length and sensor (on vehicle) position
  const ref = useUpdate<THREE.Mesh>(
    (mesh) => {
      const up = new Vector3(0, 1, 0);
      let axis = new Vector3();
      const tangent2d = path.getTangent(progress).normalize();
      const tangent3d = new Vector3(tangent2d.x, tangent2d.y, 0);

      axis = axis.crossVectors(up, tangent3d).normalize();

      const radians = Math.acos(up.dot(tangent3d));

      mesh.quaternion.setFromAxisAngle(axis, radians);
    },
    [progress, path]
  );

  return <mesh ref={ref} args={[geometry, material]} position-x={position.x} position-y={position.y} />;
};
