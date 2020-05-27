import './three-extend';
import React, { Dispatch, SetStateAction, useEffect, useMemo } from 'react';
import { Object3D } from 'three';
import { Canvas as CanvasThree } from 'react-three-fiber';

import { CameraControlContextProvider } from './contexts/CameraContext';
import { CanvasUtils } from './utils/canvas.utils';
import { Floor } from './components/Floor';
import {
  ICanvasTheme,
  IMouseEventPayload,
  ISelectionData,
  IVisualizationScene,
  IVisualizationState,
  VisualizationType,
} from './canvas.model';
import { Dictionary } from '../../app.model';
import { Lights } from './components/Lights';
import { MouseEventsContextProvider, mouseEventsContextService } from './contexts/MouseEventsContext';
import { Objects } from './components/Objects/Objects';
import { Paths } from './components/Paths/Paths';
import { Routes } from './components/Routes/Routes';
import { Scene } from './components/Scene';
import { Selection } from './components/Selection/Selection';
import { Sensors } from './components/Sensors/Sensors';
import { ThemeContext } from './contexts/ThemeContext';
import { Walls } from './components/Walls/Walls';

interface CanvasProps {
  debug?: boolean;
  onSelectionData?: (payload: Dictionary<ISelectionData>) => void;
  scene: IVisualizationScene;
  state: IVisualizationState;
  theme?: ICanvasTheme;
  type: VisualizationType;
  onMouseEvents?: (eventContextPayload: IMouseEventPayload) => void;
  setOnZoomIn: Dispatch<SetStateAction<() => void>>;
  setOnZoomOut: Dispatch<SetStateAction<() => void>>;
  setOnZoomFit: Dispatch<SetStateAction<() => void>>;
}

Object3D.DefaultUp.set(0, 0, 1);

export const Canvas: React.FC<CanvasProps> = ({
  debug,
  onMouseEvents,
  scene,
  onSelectionData,
  state,
  theme = {},
  type,
  setOnZoomIn,
  setOnZoomOut,
  setOnZoomFit,
}) => {
  const themeConfig = useMemo(() => CanvasUtils.getCanvasTheme(theme), [theme]);

  useEffect(() => {
    onMouseEvents && mouseEventsContextService.registerCallback(onMouseEvents);
    return mouseEventsContextService.unregisterCallback(onMouseEvents);
  }, [onMouseEvents]);

  return (
    <CanvasThree gl2 orthographic style={{ background: themeConfig.canvasBackground }}>
      <CameraControlContextProvider>
        <MouseEventsContextProvider>
          <ThemeContext.Provider value={themeConfig}>
            {debug && <axesHelper args={[5]} />}
            <Lights />
            <Floor type={type} />
            <Scene isD3={state.isD3} setOnZoomIn={setOnZoomIn} setOnZoomOut={setOnZoomOut} setOnZoomFit={setOnZoomFit}>
              <Walls walls={scene.walls} points={scene.points} rooms={scene.rooms} type={type} />
              <Objects points={scene.points} objects={scene.objects} />
              <Paths points={scene.points} paths={scene.paths} />
              <Sensors points={scene.points} sensors={scene.sensors} type={type} />
              <Routes points={scene.points} paths={scene.paths} vehicles={state.vehicles} routes={state.routes} />
              <Selection selection={state.selection} selectionDataClb={onSelectionData} />
            </Scene>
          </ThemeContext.Provider>
        </MouseEventsContextProvider>
      </CameraControlContextProvider>
    </CanvasThree>
  );
};
