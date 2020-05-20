import React, { useCallback, useEffect, useState } from 'react';

import { Canvas } from '../canvas/Canvas';
import { visualizationSceneMock, visualizationStateMock } from '../../mocks/main.mock';
import { VisualizationType } from '../canvas/canvas.model';
import { IEventContextPayload } from '../canvas/contexts/EventsContext';
import { IVisualizationState } from '../../app.model';
import { RoutesProgressService, RouteUpdate } from './services/RoutesProgressService';
import { CommunicationMock } from '../../mocks/communication.mock';
import { useSelector } from 'react-redux';
import { sceneSelectors } from '../../store/scene/scene.selectors';

export const CanvasManager: React.FC = ({ children }) => {
  const [state, setState] = useState<IVisualizationState>(visualizationStateMock);
  const [events, setEvents] = useState<IEventContextPayload>(null);
  const [selection, setSelection] = useState(null);

  const scene = useSelector(sceneSelectors.scene);

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
    const routesProgressService = new RoutesProgressService(visualizationSceneMock.paths);
    routesProgressService.onProgressUpdate(updateVehicleState);
    communicationMock.simulate(routesProgressService.handleVehicleUpdate);
  }, []);

  return (
    <Canvas
      selectionDataClb={setSelection}
      scene={scene}
      state={state}
      type={VisualizationType.D3}
      events={setEvents}
      debug={true}
    />
  );
};
