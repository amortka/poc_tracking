import './three-extend';
import React, { useEffect, useMemo } from 'react';
import { Object3D } from 'three';
import { Canvas as CanvasThree } from 'react-three-fiber';

import { Lights } from './components/Lights';
import { CanvasUtils } from './utils/canvas.utils';
import { EventsContextProvider, eventsContextService, IEventContextPayload } from './contexts/EventsContext';
import { Floor } from './components/Floor';
import { ICanvasTheme, VisualizationType } from './canvas.model';
import { VehicleAnimation } from '../../models/main.model';
import { ISelection, ISelectionData, IVisualisationState, IVisualizationScene } from '../../models/main.model';
import { Objects } from './components/Objects/Objects';
import { Paths } from './components/Paths/Paths';
import { Scene } from './components/Scene';
import { Sensors } from './components/Sensors/Sensors';
import { Routes1 } from './components/Routes1/Routes';
import { ThemeContext } from './contexts/ThemeContext';
import { Walls } from './components/Walls/Walls';
import { Routes } from './components/Routes/Routes';
import { Selection } from './components/Selection/Selection';
import { CameraControlContextProvider } from './contexts/CameraContext';

interface CanvasProps {
  // events?: (payload: IEventContextPayload) => void;
  selectionDataClb?: (payload: ISelectionData) => void;
  scene: IVisualizationScene;
  selection: ISelection;
  state: IVisualisationState;
  theme?: ICanvasTheme;
  type: VisualizationType;
  events?: (IEventContextPayload) => void;
  vehicles: VehicleAnimation[];
}

Object3D.DefaultUp.set(0, 0, 1);

export const Canvas: React.FC<CanvasProps> = ({
  scene,
  theme = {},
  type,
  events,
  state,
  selectionDataClb,
  selection,
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
            <Lights />
            <Floor type={type} />
            <Scene>
              <Walls walls={scene.walls} points={scene.points} rooms={scene.rooms} type={type} />
              <Objects points={scene.points} objects={scene.objects} type={VisualizationType.D2} />
              <Paths points={scene.points} paths={scene.paths} />
              <Sensors points={scene.points} sensors={scene.sensors} type={type} />

              {/* <Routes1 points={scene.points} paths={scene.paths} vehicles={vehicles} /> */}
              <Routes points={scene.points} paths={scene.paths} vehicles={state.vehicles} routes={state.routes} />

              <Selection selection={selection} selectionDataClb={selectionDataClb} />
            </Scene>
          </ThemeContext.Provider>
        </EventsContextProvider>
      </CameraControlContextProvider>
    </CanvasThree>
  );
};
