import React, { Reducer, useEffect, useReducer } from 'react';
import { EventType, IEventContextPayload } from '../three/contexts/EventsContext';
import { TooltipProps, TooltipWrapper } from './components/Tooltip';
import { equal } from '../../utils/object.utils';
import { useMouseMove } from '../../custom-hooks/use-mouse-move.hook';
import { Typography } from '@material-ui/core';

interface VisualisationTooltipProps {
  events: IEventContextPayload;
}

const tooltipReducer: Reducer<Pick<TooltipProps, 'open' | 'template'>, IEventContextPayload> = (state, action) => {
  // console.log({ action });
  if (!action?.type) return;
  switch (action?.type) {
    case EventType.MOUSE_IN:
      const name = (action.object as any)?.meta?.name;
      const description = (action.object as any)?.meta?.description;
      return {
        template: (
          <React.Fragment>
            <Typography color="inherit">{name}</Typography>
            {description}
          </React.Fragment>
        ),
        open: true,
      };
    case EventType.MOUSE_OUT:
      return { template: '', open: false };
    default:
      // throw new Error();
      return state;
  }
};

export const VisualisationTooltip: React.FC<VisualisationTooltipProps> = React.memo(
  ({ events }) => {
    const [tooltipConfig, dispatchTooltipConfig] = useReducer(tooltipReducer, { template: '', open: false });
    const [mouseCoordinates, setTrackMouse] = useMouseMove();

    useEffect(() => {
      if (!events) return;
      dispatchTooltipConfig(events);
    }, [events]);

    useEffect(() => {
      setTrackMouse(tooltipConfig.open);
    }, [tooltipConfig.open, setTrackMouse]);

    return <TooltipWrapper top={mouseCoordinates.y} left={mouseCoordinates.x} {...tooltipConfig} />;
  },
  (prevProps, nextProps) => equal(prevProps, nextProps)
);
