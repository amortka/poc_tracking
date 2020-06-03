import React from 'react';

import { IPathStateMeta, IVisualizationScene } from '../../canvas.model';
import { PathsElement } from './PathsElement';
import { usePathProps } from './paths.utils';
import { Dictionary } from '../../../../app.model';

interface PathsProps extends Pick<IVisualizationScene, 'paths' | 'points'> {
  state: Dictionary<IPathStateMeta>;
}

export const Paths: React.FC<PathsProps> = React.memo(({ paths, points, state }) => {
  const pathsProps = usePathProps(paths, points);

  return (
    <>
      {pathsProps.map(({ pathId, ...props }) =>
        state[pathId]?.selected ? null : <PathsElement key={pathId} {...props} state={state[pathId]} />
      )}
    </>
  );
});
