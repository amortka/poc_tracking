import React, { Dispatch, SetStateAction } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Canvas } from '../canvas/Canvas';
import { VisualizationType } from '../canvas/canvas.model';
import { isProduction } from '../../utils/env.utils';
import { ObjectsSelectors } from '../../store/objects/objects.selectors';
import { PathsSelectors } from '../../store/paths/paths.selectors';
import { SceneSelectors } from '../../store/scene/scene.selectors';
import { SensorsSelectors } from '../../store/sensors/sensors.selectors';
import { tooltipActions } from '../../store/tooltips/tooltips.actions';
import { TooltipsSelectors } from '../../store/tooltips/tooltips.selectors';
import { UiSelectors } from '../../store/ui/ui.selectors';
import { VehiclesSelectors } from '../../store/vehicles/vehicles.selectors';
import { useRoutesState } from './hooks/use-routes-state.hook';

interface CanvasManagerProps {
  setOnZoomIn: Dispatch<SetStateAction<() => void>>;
  setOnZoomOut: Dispatch<SetStateAction<() => void>>;
  setOnZoomFit: Dispatch<SetStateAction<() => void>>;
}

export const CanvasManager: React.FC<CanvasManagerProps> = ({ setOnZoomIn, setOnZoomOut, setOnZoomFit }) => {
  const scene = useSelector(SceneSelectors.scene);

  const cameraView3D = useSelector(UiSelectors.isD3);
  const selections = useSelector(TooltipsSelectors.selectionSelected);

  const routesState = useRoutesState();
  const objectsState = useSelector(ObjectsSelectors.objects);
  const pathsState = useSelector(PathsSelectors.paths);
  const sensorsState = useSelector(SensorsSelectors.sensors);
  const vehiclesState = useSelector(VehiclesSelectors.vehicles);

  const dispatch = useDispatch();
  const dispatchMouseEvent = (payload) => dispatch(tooltipActions.setMouseEvent(payload));
  const dispatchSelectionData = (payload) => dispatch(tooltipActions.setSelectionData(payload));

  return (
    <Canvas
      scene={scene}
      debug={!isProduction()}
      type={VisualizationType.D3}
      cameraView3D={cameraView3D}
      selections={selections}
      objectsState={objectsState}
      pathsState={pathsState}
      routesState={routesState}
      sensorsState={sensorsState}
      vehiclesState={vehiclesState}
      setOnZoomFit={setOnZoomFit}
      setOnZoomIn={setOnZoomIn}
      setOnZoomOut={setOnZoomOut}
      onMouseEvents={dispatchMouseEvent}
      onSelectionData={dispatchSelectionData}
    />
  );
};
