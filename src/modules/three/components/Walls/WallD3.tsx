import React, { useMemo } from 'react';
import { Vector2, ExtrudeGeometry, Mesh } from 'three';
import { useUpdate } from 'react-three-fiber';
import { IPoint, IWall } from '../../../../models/main.model';
import { VectorUtils } from '../../utils/vector.unitls';
import { CsgUtils } from '../../utils/csg.utils';

interface WallProps extends Omit<IWall, 'start' | 'end'> {
  start: IPoint;
  end: IPoint;
  height?: number;
}

const extrudeSettings = {
  steps: 2,
  bevelEnabled: false,
};

export const WallD3: React.FC<WallProps> = ({ height = 2.7, start, end, thickness, meta }) => {
  const wallStart = useMemo(() => new Vector2(start.x, start.y), [start.x, start.y]);
  const wallEnd = useMemo(() => new Vector2(end.x, end.y), [end.x, end.y]);

  const geometry = useMemo(() => {
    const wallS = VectorUtils.getShapeFromVectors([wallStart, wallEnd], thickness);

    return new ExtrudeGeometry(wallS, { ...extrudeSettings, depth: height });
  }, [wallStart, wallEnd, thickness, height]);

  useUpdate<THREE.Geometry>(
    (wallGeometry) => {
      if (meta?.holes) {
        Object.values(meta.holes).forEach((hole) => {
          const holeStartV = VectorUtils.getVectorToPositionOnSegment(wallStart, wallEnd, hole.start);
          const holeEndV = VectorUtils.getVectorToPositionOnSegment(wallStart, wallEnd, hole.start + hole.width);

          const holeShape = VectorUtils.getShapeFromVectors([holeStartV, holeEndV], thickness);
          const holeGeometry = new ExtrudeGeometry(holeShape, { ...extrudeSettings, depth: hole.height });

          const wallMesh = new Mesh(wallGeometry);
          const holeMesh = new Mesh(holeGeometry);
          holeMesh.position.set(0, 0, hole.fromGround || 0);

          wallGeometry.copy(CsgUtils.subtract(wallMesh, holeMesh).geometry as THREE.Geometry);
        });
      }
    },
    [meta?.holes, wallStart, wallEnd, thickness]
  );

  return (
    <mesh geometry={geometry}>
      <meshPhongMaterial attach="material" color="red" transparent={true} opacity={0.5} depthWrite={false} />
    </mesh>
  );
};
