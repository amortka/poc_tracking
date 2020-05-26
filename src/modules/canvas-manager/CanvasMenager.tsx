import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as uiSelectors from '../../store/ui/ui.selectors';
import { Canvas } from '../canvas/Canvas';
import { IRoute, IVisualizationState, VisualizationType } from '../canvas/canvas.model';
import { RouteService } from './services/routes-progress.service';
import { RoutesSelectors } from '../../store/routes/routes.selectors';
import { SceneSelectors } from '../../store/scene/scene.selectors';
import { tooltipActions } from '../../store/tooltips/tooltips.actions';
import { visualizationStateMock } from '../../mocks/main.mock';

let routesIdSet: Set<string> = new Set();

function getRoutesIdChanges(routesId: string[]): string[] {
  const difference = [...routesId].filter((id) => !routesIdSet.has(id));
  routesIdSet = new Set(routesId);

  return difference;
}

function handleRoutes(routesId: string[], setStateCallback: (routeId: string, data: IRoute) => void): () => void {
  getRoutesIdChanges(routesId).forEach((routeId) => new RouteService(routeId, setStateCallback));
  return () => {
    console.log('TODO: implement clearing subscriptions');
  };
}

function useVisualisationState(): IVisualizationState {
  const [visualisationState, setVisualisationState] = useState<IVisualizationState>(visualizationStateMock);
  const routesIds = useSelector(RoutesSelectors.routesIds);
  const isD3 = useSelector(uiSelectors.isD3);

  const updateRouteState = useCallback((routeId: string, data: IRoute) => {
    setVisualisationState((state) => ({
      ...state,
      routes: {
        ...state.routes,
        [routeId]: {
          ...state.routes[routeId],
          progress: data.progress,
        },
      },
    }));
  }, []);

  useEffect(() => {
    const clearFunction = handleRoutes(routesIds, updateRouteState);
    // TODO: implement unsubscribe when route disappears
    return () => clearFunction();
  }, [routesIds, updateRouteState]);

  return { ...visualisationState, isD3 };
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
      onMouseEvents={dispatchMouseEvent}
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
