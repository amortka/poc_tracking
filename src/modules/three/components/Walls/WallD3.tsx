import React, { useCallback, useEffect, useMemo } from 'react';
import { ExtrudeGeometry, Geometry } from 'three';
import { useUpdate } from 'react-three-fiber';
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

  const makeHoles = useCallback((wallGeometry) => WallsUtils.makeHoles(wallGeometry, wall, extrudeSettings), [wall]);

  const geometry = useMemo(() => {
    const wallS = WallsUtils.getWallShapeFromWallsArrangement(wallId, walls, points);
    return new ExtrudeGeometry(wallS, { ...extrudeSettings, depth: height });
  }, [wallId, walls, points, height]);

  useEffect(
    () => {
      makeHoles(geometry);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useUpdate<Geometry>(makeHoles, [wall, extrudeSettings]);

  return (
    <mesh geometry={geometry}>
      <meshPhongMaterial attach="material" color="red" transparent={true} opacity={0.5} depthWrite={false} />
    </mesh>
  );
};
