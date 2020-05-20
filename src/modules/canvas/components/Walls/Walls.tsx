import React, { useMemo } from 'react';
import { WallD3 } from './WallD3';
import { IVisualizationScene } from '../../../../app.model';
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
        return Object.keys(walls).map((wallId, i) => (
          <WallD3 key={wallId} wallId={wallId} walls={walls} points={points} />
        ));
      case VisualizationType.D2:
        return WallsUtils.getWallsWithCoordinates(walls, points).map((w, i) => <WallD2 key={i} {...w} />);
    }
  }, [type, walls, points]);

  return <React.Fragment>{renderWalls}</React.Fragment>;
};
