import React from 'react';
import { IVisualizationScene } from '../../canvas.model';
import { PathsElement } from './PathsElement';
import { usePathProps } from './paths.utils';

interface PathsProps extends Pick<IVisualizationScene, 'paths' | 'points'> {
  selectedPath: string;
}

export const Paths: React.FC<PathsProps> = ({ paths, points, selectedPath }) => {
  const pathsProps = usePathProps(paths, points);

  return (
    <>
      {pathsProps.map(({ pathId, ...props }) =>
        pathId !== selectedPath ? <PathsElement key={pathId} {...props} /> : null
      )}
    </>
  );
};
