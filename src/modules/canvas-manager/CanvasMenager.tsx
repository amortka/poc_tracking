import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Canvas } from '../canvas/Canvas';
import { visualizationStateMock } from '../../mocks/main.mock';
import { VisualizationType } from '../canvas/canvas.model';
import { IVisualizationState } from '../../app.model';
import { RoutesProgressService, RouteUpdate } from './services/RoutesProgressService';
import { CommunicationMock } from '../../mocks/communication.mock';
import { SceneSelectors } from '../../store/scene/scene.selectors';
import { tooltipActions } from '../../store/tooltips/tooltips.actions';

export const CanvasManager: React.FC = () => {
  const [state, setState] = useState<IVisualizationState>(visualizationStateMock);

  const scene = useSelector(SceneSelectors.scene);
  const dispatch = useDispatch();
  const dispatchMouseEvent = (payload) => dispatch(tooltipActions.setMouseEvent(payload));
  const dispatchSelectionData = (payload) => dispatch(tooltipActions.setSelectionData(payload));

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

  useEffect(() => {
    const communicationMock = new CommunicationMock({ id: 'trqzbojg', pathId: 'ojihoybn' });
    const routesProgressService = new RoutesProgressService();
    routesProgressService.onProgressUpdate(updateVehicleState);
    communicationMock.simulate(routesProgressService.handleVehicleUpdate);
  }, []);

  return (
    <Canvas
      onSelectionData={dispatchSelectionData}
      scene={scene}
      state={state}
      type={VisualizationType.D3}
      onMauseEvents={dispatchMouseEvent}
      debug={true}
    />
  );
};
