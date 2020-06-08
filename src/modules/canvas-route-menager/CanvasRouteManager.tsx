import React, { useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';

import { Canvas } from '../canvas/Canvas';
import { ICanvasTheme, VisualizationType } from '../canvas/canvas.model';
import { ISensorsState } from '../../store/sensors/sensors.model';
import { PathsSelectors } from '../../store/paths/paths.selectors';
import { useObjectsState } from './hooks/use-objects-state.hook';
import { useRoutesStateNormalized } from './hooks/use-routes-state-normalized';
import { useScene } from './hooks/scene.hook';
import { VehiclesSelectors } from '../../store/vehicles/vehicles.selectors';

const theme: Partial<ICanvasTheme> = {
  canvasBackground: '#3b434d',
  routes: { lineWidth: 0.025, line: '#212830' },
  floor: { D3: '#3b434d' },
};

interface CanvasManagerProps {}

export const CanvasRouteManager: React.FC<CanvasManagerProps> = React.memo(() => {
  const routeIdSet = useRef<Set<string>>(new Set<string>());

  const scene = useScene();
  const routesState = useRoutesStateNormalized(routeIdSet.current, scene);
  const objectsState = useObjectsState(routesState, scene);

  const pathsState = useSelector(PathsSelectors.paths);
  const vehiclesState = useSelector(VehiclesSelectors.vehicles);
  const sensorsState: ISensorsState = useMemo(() => ({ start: { selected: true }, end: { selected: true } }), []);

  return (
    <Canvas
      theme={theme}
      scene={scene}
      type={VisualizationType.D3}
      cameraView3D={false}
      sensorsState={sensorsState}
      objectsState={objectsState}
      pathsState={pathsState}
      routesState={routesState}
      vehiclesState={vehiclesState}
      onMouseEvents={null}
      horizontalCamera
    />
  );
});
