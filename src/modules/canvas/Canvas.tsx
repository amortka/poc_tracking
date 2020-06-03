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
  IObjectStateMeta,
  IPathStateMeta,
  ISelectionData,
  ISensorStateMeta,
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
import { ThreeMonitor } from './components/ThreeMonitor';

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
  objectsState: Dictionary<IObjectStateMeta>;
  pathsState: Dictionary<IPathStateMeta>;
  sensorsState: Dictionary<ISensorStateMeta>;
}

Object3D.DefaultUp.set(0, 0, 1);

export const Canvas: React.FC<CanvasProps> = ({
  debug,
  onMouseEvents,
  scene,
  onSelectionData,
  state,
  theme = null,
  type,
  setOnZoomIn,
  setOnZoomOut,
  setOnZoomFit,
  objectsState,
  pathsState,
  sensorsState,
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
            <ThreeMonitor debug={debug} />
            <Lights />
            <Floor type={type} />
            <Scene isD3={state.isD3} setOnZoomIn={setOnZoomIn} setOnZoomOut={setOnZoomOut} setOnZoomFit={setOnZoomFit}>
              <Walls walls={scene.walls} points={scene.points} rooms={scene.rooms} type={type} />
              <Objects points={scene.points} objects={scene.objects} state={objectsState} />
              <Paths points={scene.points} paths={scene.paths} state={pathsState} />
              <Sensors points={scene.points} sensors={scene.sensors} state={sensorsState} />
              <Routes points={scene.points} paths={scene.paths} vehicles={state.vehicles} routes={state.routes} />
              <Selection selection={state.selection} selectionDataClb={onSelectionData} />
            </Scene>
          </ThemeContext.Provider>
        </MouseEventsContextProvider>
      </CameraControlContextProvider>
    </CanvasThree>
  );
};
