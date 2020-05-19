import './three-extend';
import React, { useEffect, useMemo } from 'react';
import { Object3D } from 'three';
import { Canvas as CanvasThree } from 'react-three-fiber';

import { CanvasUtils } from './utils/canvas.utils';

import { ICanvasTheme, VisualizationType } from './canvas.model';

import { ISelectionData, IVisualisationState, IVisualizationScene, VehicleAnimation } from '../../models/main.model';

import { EventsContextProvider, eventsContextService, IEventContextPayload } from './contexts/EventsContext';
import { CameraControlContextProvider } from './contexts/CameraContext';
import { ThemeContext } from './contexts/ThemeContext';

import { Lights } from './components/Lights';
import { Floor } from './components/Floor';
import { Objects } from './components/Objects/Objects';
import { Paths } from './components/Paths/Paths';
import { Routes } from './components/Routes/Routes';
import { Scene } from './components/Scene';
import { Selection } from './components/Selection/Selection';
import { Sensors } from './components/Sensors/Sensors';
import { Walls } from './components/Walls/Walls';

interface CanvasProps {
  debug?: boolean;
  selectionDataClb?: (payload: ISelectionData) => void;
  scene: IVisualizationScene;
  state: IVisualisationState;
  theme?: ICanvasTheme;
  type: VisualizationType;
  events?: (eventContextPayload: IEventContextPayload) => void;
}

Object3D.DefaultUp.set(0, 0, 1);

export const Canvas: React.FC<CanvasProps> = ({ debug, events, scene, selectionDataClb, state, theme = {}, type }) => {
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
              <Objects points={scene.points} objects={scene.objects} type={type} />
              <Paths points={scene.points} paths={scene.paths} />
              <Sensors points={scene.points} sensors={scene.sensors} type={type} />
              <Routes points={scene.points} paths={scene.paths} vehicles={state.vehicles} routes={state.routes} />
              <Selection selection={state.selection} selectionDataClb={selectionDataClb} />
            </Scene>
          </ThemeContext.Provider>
        </EventsContextProvider>
      </CameraControlContextProvider>
    </CanvasThree>
  );
};
