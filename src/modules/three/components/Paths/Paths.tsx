import React, { useMemo } from 'react';
import { IVisualizationScene } from '../../../../models/main.model';
import { PathsUtils } from './paths.utils';
import { PathsDefault } from './PathsDefault';

interface PathsProps extends Pick<IVisualizationScene, 'paths' | 'points'> {}

export const Paths: React.FC<PathsProps> = React.memo(({ paths, points }) => {
  const renderObjectsDefault = useMemo(
    () => PathsUtils.getPathWithCoordinates(paths, points).map((o, i) => <PathsDefault key={i} {...o} />),
    [paths, points]
  );

  return <React.Fragment>{renderObjectsDefault}</React.Fragment>;
});
