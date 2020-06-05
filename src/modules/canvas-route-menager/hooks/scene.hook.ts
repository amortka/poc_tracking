import { useSelector } from 'react-redux';
import { useMemo } from 'react';

import { IVisualizationScene } from '../../canvas/canvas.model';
import { RoutesSelectors } from '../../../store/routes/routes.selectors';
import { SceneSelectors } from '../../../store/scene/scene.selectors';
import { SceneUtils } from '../utils/scene.utils';

export function useScene(): IVisualizationScene {
  const segmentLength = 1;
  const selectedRoute = useSelector(RoutesSelectors.getFirstSelectedRouteStateEntry);
  const selectedPathId: string = selectedRoute[1].path;
  const sceneData = useSelector(SceneSelectors.getRouteVisualisationSceneByPathId(selectedPathId));

  const pathPoints = useMemo(() => SceneUtils.flattenLineNormalized(sceneData.path.objects, segmentLength), [
    sceneData.path.objects,
    segmentLength,
  ]);
  const pathLength = pathPoints.pathEnd.x;

  const objectPoints = useMemo(
    () =>
      SceneUtils.moveObjectsPointsToNormalizedLinePosition(
        sceneData.path.objects,
        pathLength,
        sceneData.objects,
        sceneData.points
      ),
    [sceneData.path.objects, pathLength, sceneData.objects, sceneData.points]
  );

  const sensorPoints = useMemo(() => ({ sensorStart: { x: 0, y: 0 }, sensorEnd: { x: pathLength, y: 0 } }), [
    pathLength,
  ]);
  useMemo(() => {
    const pathPointsKeys = Object.keys(sensorPoints);
    sceneData.sensors.start.point = pathPointsKeys[0];
    sceneData.sensors.end.point = pathPointsKeys[1];
  }, [sensorPoints, sceneData.sensors.start, sceneData.sensors.end]);

  const scene: IVisualizationScene = {
    objects: { ...sceneData.objects },
    paths: { [selectedPathId]: { ...sceneData.path, points: ['pathStart', 'pathEnd'] } },
    points: { ...pathPoints, ...objectPoints, ...sensorPoints },
    sensors: { ...sceneData.sensors },
    walls: {},
  };

  return scene;
}
