import React, { useMemo } from 'react';
import { IVisualization } from '../../../../models/main.model';
import { PathsUtils } from './Paths.utils';
import { PathsDefault } from './PathsDefault';
import { PathsSelected } from './PathsSelected';

interface WallsProps extends Pick<IVisualization, 'paths' | 'points'> {}

export const Paths: React.FC<WallsProps> = React.memo(({ paths, points }) => {
  const renderObjectsSelected = useMemo(
    () =>
      PathsUtils.getPathWithCoordinates(paths, points).map((o, i) => (
        <PathsSelected
          key={i}
          distanceEnd={0.9}
          distanceStart={0.1}
          colorStart={'blue'}
          colorEnd={'red'}
          linewidth={0.003}
          {...o}
        />
      )),
    [paths, points]
  );
  const renderObjectsDefault = useMemo(
    () => PathsUtils.getPathWithCoordinates(paths, points).map((o, i) => <PathsDefault key={i} {...o} />),
    [paths, points]
  );

  return (
    <React.Fragment>
      {renderObjectsDefault}
      {renderObjectsSelected}
    </React.Fragment>
  );
});
