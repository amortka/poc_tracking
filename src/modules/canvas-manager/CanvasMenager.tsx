import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Canvas } from '../canvas/Canvas';
import { visualizationStateMock } from '../../mocks/main.mock';
import { VisualizationType } from '../canvas/canvas.model';
import { IVisualizationState } from '../../app.model';
import { RoutesProgressService, RouteUpdate } from './services/RoutesProgressService';
import { CommunicationMock } from '../../mocks/communication.mock';
import { SceneSelectors } from '../../store/scene/scene.selectors';
import { tooltipActions } from '../../store/tooltips/tooltips.actions';
import * as uiSelectors from '../../store/ui/ui.selectors';

function useVisualisationState(): IVisualizationState {
  const [state, setState] = useState<IVisualizationState>(visualizationStateMock);
  const updateVehicleState = useCallback((data: RouteUpdate) => {
    setState((state) => ({
      ...state,
      routes: {
        ...state.routes,
        [data.routeId]: {
          ...state.routes[data.routeId],
          path: data.pathId,
          vehicle: data.tag,
          progress: data.progress,
        },
      },
    }));
  }, []);

  useEffect(
    () => {
      const communicationMock = new CommunicationMock({ id: 'trqzbojg', pathId: 'ojihoybn' });
      const routesProgressService = new RoutesProgressService();
      routesProgressService.onProgressUpdate(updateVehicleState);
      communicationMock.simulate(routesProgressService.handleVehicleUpdate);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const isD3 = useSelector(uiSelectors.isD3);

  return { ...state, isD3 };
}

interface CanvasManagerProps {
  setOnZoomIn: Dispatch<SetStateAction<() => void>>;
  setOnZoomOut: Dispatch<SetStateAction<() => void>>;
  setOnZoomFit: Dispatch<SetStateAction<() => void>>;
}

export const CanvasManager: React.FC<CanvasManagerProps> = ({ setOnZoomIn, setOnZoomOut, setOnZoomFit }) => {
  const state = useVisualisationState();
  const scene = useSelector(SceneSelectors.scene);
  const dispatch = useDispatch();
  const dispatchMouseEvent = (payload) => dispatch(tooltipActions.setMouseEvent(payload));
  const dispatchSelectionData = (payload) => dispatch(tooltipActions.setSelectionData(payload));

  return (
    <Canvas
      debug={true}
      onMauseEvents={dispatchMouseEvent}
      onSelectionData={dispatchSelectionData}
      scene={scene}
      setOnZoomFit={setOnZoomFit}
      setOnZoomIn={setOnZoomIn}
      setOnZoomOut={setOnZoomOut}
      state={state}
      type={VisualizationType.D3}
    />
  );
};
