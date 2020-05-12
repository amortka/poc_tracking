import React, { useEffect, useMemo } from 'react';
import { Object3D } from 'three';
import { AmbientLight } from './components/AmbientLight';
import { Canvas as CanvasThree } from 'react-three-fiber';
import { Floor } from './components/Floor';
import { ICanvasTheme, VisualizationType } from './canvas.model';
import { IVisualization } from '../../models/main.model';
import { Objects } from './components/Objects/Objects';
import { Scene } from './components/Scene';
import { Walls } from './components/Walls/Walls';
import { CanvasUtils } from './utils/canvasUtils';
import { ThemeContext } from './contexts/ThemeContext';
import { Paths } from './components/Paths/Paths';
import { Sensors } from './components/Sensors/Sensors';
import { EventsContextProvider, eventsContextService } from './contexts/EventsContext';

interface CanvasProps {
  config: IVisualization;
  theme?: ICanvasTheme;
  type: VisualizationType;
  events?: (IEventContextPayload) => void;
}

export const Canvas: React.FC<CanvasProps> = ({ config, theme = {}, type, events }) => {
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
            <Walls walls={config.walls} points={config.points} rooms={config.rooms} type={type} />
            <Objects points={config.points} objects={config.objects} type={VisualizationType.D2} />
            <Paths points={config.points} paths={config.paths} />
            <Sensors points={config.points} sensors={config.sensors} type={type} />
          </Scene>
        </ThemeContext.Provider>
      </EventsContextProvider>
    </CanvasThree>
  );
};
