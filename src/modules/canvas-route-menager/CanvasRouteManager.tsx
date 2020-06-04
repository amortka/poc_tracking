import React from 'react';
import { useSelector } from 'react-redux';

import { Canvas } from '../canvas/Canvas';
import { ObjectsSelectors } from '../../store/objects/objects.selectors';
import { useRoutesState } from '../canvas-manager/hooks/use-routes-state.hook';
import { useScene } from './hooks/scene.hook';
import { VehiclesSelectors } from '../../store/vehicles/vehicles.selectors';
import { VisualizationType } from '../canvas/canvas.model';

const routeIdSet = new Set<string>();

interface CanvasManagerProps {}

export const CanvasRouteManager: React.FC<CanvasManagerProps> = React.memo(() => {
  const scene = useScene();
  const routesState = useRoutesState(routeIdSet);
  const objectsState = useSelector(ObjectsSelectors.objects);
  const vehiclesState = useSelector(VehiclesSelectors.vehicles);

  return (
    <Canvas
      theme={{}}
      scene={scene}
      type={VisualizationType.D3}
      cameraView3D={false}
      objectsState={objectsState}
      routesState={routesState}
      vehiclesState={vehiclesState}
      onMouseEvents={null}
      horizontalCamera
    />
  );
});
