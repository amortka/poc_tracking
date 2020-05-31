import { useMemo } from 'react';
import { Shape, Vector2, ExtrudeBufferGeometry, Vector3 } from 'three';
import { useUpdate } from 'react-three-fiber';

const extrudeSettings = {
  steps: 1,
  depth: 0.05,
  bevelEnabled: true,
  bevelThickness: 0.05,
  bevelSize: 0,
  bevelOffset: 0,
  bevelSegments: 1,
};

const useVehicleGeometry = () =>
  useMemo(() => {
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

const useVehicleUpdate = (rotation: THREE.Vector2) =>
  useUpdate<THREE.Mesh>(
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

export { useVehicleGeometry, useVehicleUpdate };
