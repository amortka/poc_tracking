import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { Canvas } from '../canvas/Canvas';
import { IVisualizationScene, VisualizationType } from '../canvas/canvas.model';
import { ObjectsSelectors } from '../../store/objects/objects.selectors';
import { SceneSelectors } from '../../store/scene/scene.selectors';
import { VehiclesSelectors } from '../../store/vehicles/vehicles.selectors';
import { RoutesSelectors } from '../../store/routes/routes.selectors';
import { SceneUtils } from './utils/scene.utils';
import { useRoutesState } from '../canvas-manager/hooks/use-routes-state.hook';

function useScene(): IVisualizationScene {
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

interface CanvasManagerProps {}

export const CanvasRouteManager: React.FC<CanvasManagerProps> = React.memo(() => {
  const scene = useScene();

  const routesState = useRoutesState();
  const objectsState = useSelector(ObjectsSelectors.objects);
  const vehiclesState = useSelector(VehiclesSelectors.vehicles);

  return (
    <Canvas
      theme={{}}
      scene={scene}
      debug={false}
      type={VisualizationType.D3}
      cameraView3D={false}
      selections={null}
      objectsState={objectsState}
      pathsState={null}
      routesState={routesState}
      sensorsState={null}
      vehiclesState={vehiclesState}
      setOnZoomFit={null}
      setOnZoomIn={null}
      setOnZoomOut={null}
      onMouseEvents={null}
      onSelectionData={null}
    />
  );
});
