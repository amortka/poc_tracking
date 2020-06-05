import { IVisualizationScene } from '../../canvas/canvas.model';
import { useSelector } from 'react-redux';
import { RoutesSelectors } from '../../../store/routes/routes.selectors';
import { SceneSelectors } from '../../../store/scene/scene.selectors';
import { useMemo } from 'react';
import { SceneUtils } from '../utils/scene.utils';

export function useScene(): IVisualizationScene {
  const selectedRoute = useSelector(RoutesSelectors.getFirstSelectedRouteEntry);
  const selectedPathId: string = selectedRoute[1].path;
  const sceneData = useSelector(SceneSelectors.getRouteVisualisationSceneByPathId(selectedPathId));

  const pathPoints = useMemo(() => SceneUtils.flattenLine(sceneData.path.points, sceneData.points), [
    sceneData.path.points,
    sceneData.points,
  ]);
  const objectPoints = useMemo(
    () =>
      SceneUtils.moveObjectsPointsToLinePosition(
        sceneData.path.objects,
        sceneData.path.length,
        sceneData.objects,
        sceneData.points
      ),
    [sceneData.path.objects, sceneData.path.length, sceneData.objects, sceneData.points]
  );

  const sensorPoints = useMemo(() => ({ sensorStart: { x: 0, y: 0 }, sensorEnd: { x: sceneData.path.length, y: 0 } }), [
    sceneData.path.length,
  ]);
  useMemo(() => {
    const pathPointsKeys = Object.keys(sensorPoints);
    sceneData.sensors.start.point = pathPointsKeys[0];
    sceneData.sensors.end.point = pathPointsKeys[1];
  }, [sensorPoints, sceneData.sensors.start, sceneData.sensors.end]);

  const scene: IVisualizationScene = {
    objects: { ...sceneData.objects },
    paths: { [selectedPathId]: sceneData.path },
    points: { ...sceneData.points, ...pathPoints, ...objectPoints, ...sensorPoints },
    sensors: { ...sceneData.sensors },
    walls: {},
  };

  return scene;
}
