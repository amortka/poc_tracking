import React, { useMemo } from 'react';

import { IVisualizationScene } from '../../canvas.model';
import { ObjectsUtils } from './objects.utils';
import { ObjectElement } from './ObjectElement';
import { IObjectsState } from '../../../../store/objects/objects.model';

interface WallsProps extends Pick<IVisualizationScene, 'objects' | 'points'> {
  state: IObjectsState;
}

export const Objects: React.FC<WallsProps> = React.memo(({ objects, points, state }) => {
  const objectsWithCoordinates = useMemo(() => ObjectsUtils.getObjectsWithCoordinates(objects, points), [
    objects,
    points,
  ]);

  return (
    <>
      {objectsWithCoordinates.map((o) => (
        <ObjectElement key={o.id} {...o} state={state[o.id]} />
      ))}
    </>
  );
});
