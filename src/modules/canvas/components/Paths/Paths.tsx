import React, { useMemo } from 'react';
import { PathsUtils } from './paths.utils';
import { PathsElement } from './PathsElement';
import { IVisualizationScene } from '../../canvas.model';

interface PathsProps extends Pick<IVisualizationScene, 'paths' | 'points'> {}

export const Paths: React.FC<PathsProps> = React.memo(({ paths, points }) => {
  const renderObjectsDefault = useMemo(
    () => PathsUtils.getPathWithCoordinates(paths, points).map((o, i) => <PathsElement key={i} {...o} />),
    [paths, points]
  );

  return <React.Fragment>{renderObjectsDefault}</React.Fragment>;
});
