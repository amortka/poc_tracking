import React, { Dispatch, MutableRefObject, SetStateAction, useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as uiSelectors from '../../store/ui/ui.selectors';
import { Canvas } from '../canvas/Canvas';
import { IRoute, IVisualizationState, VisualizationType } from '../canvas/canvas.model';
import { isProduction } from '../../utils/env.utils';
import { RouteService } from './services/routes-progress.service';
import { RoutesSelectors } from '../../store/routes/routes.selectors';
import { SceneSelectors } from '../../store/scene/scene.selectors';
import { tooltipActions } from '../../store/tooltips/tooltips.actions';
import { visualizationStateMock } from '../../mocks/main.mock';
import { ObjectsSelectors } from '../../store/objects/objects.selectors';

let routesIdSet: Set<string> = new Set();

function getRoutesIdChanges(routesId: string[]): string[] {
  const difference = [...routesId].filter((id) => !routesIdSet.has(id));
  routesIdSet = new Set(routesId);

  return difference;
}

function handleRoutes(
  routesId: string[],
  setStateCallback: (routeId: string, data: IRoute) => void,
  routeServices: MutableRefObject<RouteService[]>
): void {
  getRoutesIdChanges(routesId).forEach((routeId) =>
    routeServices.current.push(new RouteService(routeId, setStateCallback))
  );
}

function useVisualizationState(): IVisualizationState {
  const routeServices = useRef<RouteService[]>([]);
  const [visualizationState, setVisualizationState] = useState<IVisualizationState>(visualizationStateMock);
  const routesIds = useSelector(RoutesSelectors.routesIds);
  const isD3 = useSelector(uiSelectors.isD3);

  const updateRouteState = useCallback((routeId: string, data: IRoute) => {
    setVisualizationState((state) => ({
      ...state,
      routes: {
        ...state.routes,
        [routeId]: { progress: 0, ...data },
      },
    }));
  }, []);

  useEffect(() => handleRoutes(routesIds, updateRouteState, routeServices), [routesIds, updateRouteState]);

  useEffect(
    () => () => {
      routeServices.current.forEach((service) => service.clear());
      routeServices.current = [];
    },
    []
  );
  return { ...visualizationState, isD3 };
}

interface CanvasManagerProps {
  setOnZoomIn: Dispatch<SetStateAction<() => void>>;
  setOnZoomOut: Dispatch<SetStateAction<() => void>>;
  setOnZoomFit: Dispatch<SetStateAction<() => void>>;
}

export const CanvasManager: React.FC<CanvasManagerProps> = ({ setOnZoomIn, setOnZoomOut, setOnZoomFit }) => {
  const state = useVisualizationState();
  const scene = useSelector(SceneSelectors.scene);
  const objectsState = useSelector(ObjectsSelectors.objects);
  const dispatch = useDispatch();
  const dispatchMouseEvent = (payload) => dispatch(tooltipActions.setMouseEvent(payload));
  const dispatchSelectionData = (payload) => dispatch(tooltipActions.setSelectionData(payload));

  return (
    <Canvas
      debug={!isProduction()}
      onMouseEvents={dispatchMouseEvent}
      onSelectionData={dispatchSelectionData}
      scene={scene}
      setOnZoomFit={setOnZoomFit}
      setOnZoomIn={setOnZoomIn}
      setOnZoomOut={setOnZoomOut}
      state={state}
      type={VisualizationType.D3}
      objectsState={objectsState}
    />
  );
};
