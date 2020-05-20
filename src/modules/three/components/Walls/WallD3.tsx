import React, { useMemo } from 'react';
import { ExtrudeGeometry } from 'three';

import { Dictionary, IPoint, IWall } from '../../../../models/main.model';
import { WallsUtils } from './walls.utils';

interface WallProps {
  wallId: string;
  walls: Dictionary<IWall>;
  points: Dictionary<IPoint>;
  height?: number;
}

const extrudeSettings = {
  steps: 2,
  bevelEnabled: false,
};

export const WallD3: React.FC<WallProps> = ({ wallId, walls, points, height = 2.7 }) => {
  const wall = useMemo(() => WallsUtils.getWallWithPointsCoordinates(wallId, walls, points), [wallId, walls, points]);

  const geometry = useMemo(() => {
    const wallS = WallsUtils.getWallShapeFromWallsArrangement(wallId, walls, points);
    const extrudeGeometry = new ExtrudeGeometry(wallS, { ...extrudeSettings, depth: height });
    WallsUtils.makeHoles(extrudeGeometry, wall, extrudeSettings);
    return extrudeGeometry;
  }, [wallId, wall, walls, points, height]);

  return (
    <mesh geometry={geometry}>
      <meshPhongMaterial attach="material" color="red" transparent={true} opacity={0.5} depthWrite={false} />
    </mesh>
  );
};
