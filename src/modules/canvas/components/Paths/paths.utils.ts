import { Dictionary } from '../../../../app.model';
import { IPath, IPoint } from '../../canvas.model';
import { useMemo } from 'react';

const usePathProps = (paths: Dictionary<IPath>, points: Dictionary<IPoint>) =>
  useMemo(() => {
    const pathWithPoints = Object.entries(paths).map(([pathId, path]) => {
      const pathPoints = path.points.map((pointId) => points[pointId]);
      return { ...path, points: pathPoints, pathId };
    });

    return pathWithPoints || [];
  }, [paths, points]);

export { usePathProps };
