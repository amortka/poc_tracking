import React, { useMemo } from 'react';
import { BoxBufferGeometry, MeshBasicMaterial, Vector3, Shape, ExtrudeBufferGeometry, Vector2 } from 'three';
import { useUpdate } from 'react-three-fiber';

interface IVehicle {
  type: string;
  position: THREE.Vector2;
  rotation: THREE.Vector2;
}

const extrudeSettings = {
  steps: 1,
  depth: 0.05,
  bevelEnabled: true,
  bevelThickness: 0.05,
  bevelSize: 0,
  bevelOffset: 0,
  bevelSegments: 1,
};

export const Vehicle: React.FC<IVehicle> = ({ position, rotation }) => {
  const material = useMemo(() => new MeshBasicMaterial({ color: 0xe9842c }), []);

  const geometry = useMemo(() => {
    const length = 0.35,
      width = 0.25;

    const shape = new Shape();
    shape.moveTo(-width / 2, -length / 2);
    shape.lineTo(-width / 2, length / 2.5);
    shape.splineThru([
      new Vector2(-width / 3, length / 2),
      new Vector2(width / 3, length / 2),
      new Vector2(width / 2, length / 2.5),
    ]);
    shape.lineTo(width / 2, -length / 2);
    shape.closePath();

    const geo = new ExtrudeBufferGeometry(shape, extrudeSettings);

    return geo;
  }, []);

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
