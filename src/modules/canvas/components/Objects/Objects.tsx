import React, { useMemo } from 'react';
import { IVisualizationScene } from '../../canvas.model';
import { ObjectsUtils } from './objects.utils';
import { ObjectElement } from './ObjectElement';

interface WallsProps extends Pick<IVisualizationScene, 'objects' | 'points'> {}

export const Objects: React.FC<WallsProps> = ({ objects, points }) => {
  const objectsWithCoordinates = useMemo(() => ObjectsUtils.getObjectsWithCoordinates(objects, points), [
    objects,
    points,
  ]);

  const renderObjects = useMemo(() => {
    return objectsWithCoordinates.map((o) => <ObjectElement key={o.id} {...o} />);
  }, [objectsWithCoordinates]);

  return <React.Fragment>{renderObjects}</React.Fragment>;
};
