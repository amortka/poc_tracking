import './three-extend';
import React, { useEffect, useMemo } from 'react';
import { AmbientLight } from './components/AmbientLight';
import { Canvas as CanvasThree } from 'react-three-fiber';
import { CanvasUtils } from './utils/canvas.utils';
import { equal } from '../../utils/object.utils';
import { EventsContextProvider, eventsContextService } from './contexts/EventsContext';
import { Floor } from './components/Floor';
import { ICanvasTheme, VisualizationType } from './canvas.model';
import { IVisualisationState, IVisualizationScene } from '../../models/main.model';
import { Object3D } from 'three';
import { Objects } from './components/Objects/Objects';
import { Paths } from './components/Paths/Paths';
import { Scene } from './components/Scene';
import { Sensors } from './components/Sensors/Sensors';
import { ThemeContext } from './contexts/ThemeContext';
import { Walls } from './components/Walls/Walls';
import { Routes } from './components/Routes/Routes';

interface CanvasProps {
  scene: IVisualizationScene;
  state: IVisualisationState;
  theme?: ICanvasTheme;
  type: VisualizationType;
  events?: (IEventContextPayload) => void;
}

export const Canvas: React.FC<CanvasProps> = React.memo(
  ({ scene, theme = {}, type, events, state }) => {
    Object3D.DefaultUp.set(0, 0, 1);

    const themeConfig = useMemo(() => CanvasUtils.getCanvasTheme(theme), [theme]);

    useEffect(() => {
      events && eventsContextService.registerCallback(events);
      return eventsContextService.unregisterCallback(events);
    }, [events]);

    return (
      <CanvasThree gl2 orthographic style={{ background: themeConfig.canvasBackground }}>
        <EventsContextProvider>
          <ThemeContext.Provider value={themeConfig}>
            <AmbientLight />
            <Floor type={type} />
            <Scene>
              <Walls walls={scene.walls} points={scene.points} rooms={scene.rooms} type={type} />
              <Objects points={scene.points} objects={scene.objects} type={VisualizationType.D2} />
              <Paths points={scene.points} paths={scene.paths} />
              <Sensors points={scene.points} sensors={scene.sensors} type={type} />
              <Routes points={scene.points} paths={scene.paths} vehicles={state.vehicles} routes={state.routes} />
            </Scene>
          </ThemeContext.Provider>
        </EventsContextProvider>
      </CanvasThree>
    );
  },

  (prevProps, nextProps) =>
    equal(prevProps.scene, nextProps.scene) &&
    equal(prevProps.theme, nextProps.theme) &&
    prevProps.type === nextProps.type
);
