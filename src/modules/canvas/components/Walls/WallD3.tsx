import React, { useContext, useMemo } from 'react';
import { ExtrudeGeometry } from 'three';

import { Dictionary } from '../../../../app.model';
import { WallsUtils } from './walls.utils';
import { IPoint, IWall } from '../../canvas.model';
import { ThemeContext } from '../../contexts/ThemeContext';

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
  const theme = useContext(ThemeContext);

  const geometry = useMemo(() => {
    const wallS = WallsUtils.getWallShapeFromWallsArrangement(wallId, walls, points);
    const extrudeGeometry = new ExtrudeGeometry(wallS, { ...extrudeSettings, depth: height });
    WallsUtils.makeHoles(extrudeGeometry, wall, extrudeSettings);
    return extrudeGeometry;
  }, [wallId, wall, walls, points, height]);

  return (
    <mesh geometry={geometry}>
      <meshPhongMaterial
        attach="material"
        color={theme.walls.D3}
        transparent={true}
        opacity={0.45}
        depthWrite={false}
      />
    </mesh>
  );
};
