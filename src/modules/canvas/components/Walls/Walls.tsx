import React, { useMemo } from 'react';

import { IVisualizationScene, VisualizationType } from '../../canvas.model';
import { WallD2 } from './WallD2';
import { WallD3 } from './WallD3';
import { WallsUtils } from './walls.utils';

interface WallsProps extends Pick<IVisualizationScene, 'walls' | 'points' | 'rooms'> {
  type: VisualizationType;
}

export const Walls: React.FC<WallsProps> = React.memo(({ walls, points, type }) => {
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
});
