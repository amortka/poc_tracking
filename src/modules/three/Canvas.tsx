import './three-extend';
import React, { useEffect, useMemo } from 'react';
import { Object3D } from 'three';
import { Canvas as CanvasThree } from 'react-three-fiber';

import { CameraControlContextProvider } from './contexts/CameraContext';
import { CanvasUtils } from './utils/canvas.utils';
import { EventsContextProvider, eventsContextService, IEventContextPayload } from './contexts/EventsContext';
import { Floor } from './components/Floor';
import { ICanvasTheme, VisualizationType } from './canvas.model';
import { ISelectionData, IVisualisationState, IVisualizationScene, VehicleAnimation } from '../../models/main.model';
import { Lights } from './components/Lights';
import { Objects } from './components/Objects/Objects';
import { Paths } from './components/Paths/Paths';
import { Routes } from './components/Routes/Routes';
import { Routes1 } from './components/Routes1/Routes';
import { Scene } from './components/Scene';
import { Selection } from './components/Selection/Selection';
import { Sensors } from './components/Sensors/Sensors';
import { ThemeContext } from './contexts/ThemeContext';
import { Walls } from './components/Walls/Walls';

interface CanvasProps {
  debug?: boolean;
  selectionDataClb?: (payload: ISelectionData) => void;
  scene: IVisualizationScene;
  state: IVisualisationState;
  theme?: ICanvasTheme;
  type: VisualizationType;
  events?: (eventContextPayload: IEventContextPayload) => void;
  vehicles: VehicleAnimation[];
}

Object3D.DefaultUp.set(0, 0, 1);

export const Canvas: React.FC<CanvasProps> = ({
  debug,
  events,
  scene,
  selectionDataClb,
  state,
  theme = {},
  type,
  vehicles,
}) => {
  const themeConfig = useMemo(() => CanvasUtils.getCanvasTheme(theme), [theme]);

  useEffect(() => {
    events && eventsContextService.registerCallback(events);
    return eventsContextService.unregisterCallback(events);
  }, [events]);

  return (
    <CanvasThree gl2 orthographic style={{ background: themeConfig.canvasBackground }}>
      <CameraControlContextProvider>
        <EventsContextProvider>
          <ThemeContext.Provider value={themeConfig}>
            {debug && <axesHelper args={[5]} />}
            <Lights />
            <Floor type={type} />
            <Scene>
              <Walls walls={scene.walls} points={scene.points} rooms={scene.rooms} type={type} />
              <Objects points={scene.points} objects={scene.objects} type={VisualizationType.D2} />
              <Paths points={scene.points} paths={scene.paths} />
              <Sensors points={scene.points} sensors={scene.sensors} type={type} />

              <Routes1 points={scene.points} paths={scene.paths} vehicles={vehicles} />
              <Routes points={scene.points} paths={scene.paths} vehicles={state.vehicles} routes={state.routes} />

              <Selection selection={state.selection} selectionDataClb={selectionDataClb} />
            </Scene>
          </ThemeContext.Provider>
        </EventsContextProvider>
      </CameraControlContextProvider>
    </CanvasThree>
  );
};
