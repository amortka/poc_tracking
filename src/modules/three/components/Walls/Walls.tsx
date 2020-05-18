import React, { useMemo } from 'react';
import { WallD3 } from './WallD3';
import { IVisualizationScene } from '../../../../models/main.model';
import { WallsUtils } from './walls.utils';
import { WallD2 } from './WallD2';
import { VisualizationType } from '../../canvas.model';

interface WallsProps extends Pick<IVisualizationScene, 'walls' | 'points' | 'rooms'> {
  type: VisualizationType;
}

export const Walls: React.FC<WallsProps> = ({ walls, points, type }) => {
  const renderWalls = useMemo(() => {
    switch (type) {
      case VisualizationType.D3:
        return WallsUtils.getWallsWithCoordinates(walls, points).map((w, i) => <WallD3 key={i} {...w} />);
      case VisualizationType.D2:
        return WallsUtils.getWallsWithCoordinates(walls, points).map((w, i) => <WallD2 key={i} {...w} />);
    }
  }, [type, walls, points]);

  return <React.Fragment>{renderWalls}</React.Fragment>;
};
