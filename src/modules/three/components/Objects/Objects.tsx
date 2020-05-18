import React, { useMemo } from 'react';
import { IVisualizationScene } from '../../../../models/main.model';
import { VisualizationType } from '../../canvas.model';
import { ObjectsUtils } from './objects.utils';
import { ObjectD3 } from './ObjectD3';
import { ObjectD2 } from './ObjectD2';

interface WallsProps extends Pick<IVisualizationScene, 'objects' | 'points'> {
  type: VisualizationType;
}

export const Objects: React.FC<WallsProps> = React.memo(({ objects, points, type }) => {
  let renderObjects;
  const objectsWithCoordinates = useMemo(() => ObjectsUtils.getObjectsWithCoordinates(objects, points), [
    objects,
    points,
  ]);

  switch (type) {
    case VisualizationType.D3:
      renderObjects = objectsWithCoordinates.map((o, i) => <ObjectD3 key={i} {...o} />);
      break;
    case VisualizationType.D2:
      renderObjects = objectsWithCoordinates.map((o, i) => <ObjectD2 key={i} {...o} />);
      break;
  }
  return <React.Fragment>{renderObjects}</React.Fragment>;
});
