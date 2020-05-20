import React, { Reducer, useEffect, useReducer } from 'react';
import { equal } from '../../../../utils/object.utils';
import { EventType } from '../../../canvas/canvas.model';
import { IEventContextPayload } from '../../../canvas/contexts/EventsContext';
import { TooltipProps, TooltipWrapper } from './components/Tooltip';
import { Typography, useTheme } from '@material-ui/core';
import { useMouseMove } from '../../custom-hooks/use-mouse-move.hook';

interface MouseEventTooltipProps {
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
      return { ...state, open: false };
    default:
      // throw new Error();
      return state;
  }
};

export const MouseEventTooltip: React.FC<MouseEventTooltipProps> = React.memo(
  ({ events }) => {
    const [tooltipConfig, dispatchTooltipConfig] = useReducer(tooltipReducer, { template: '', open: false });
    const [mouseCoordinates, setTrackMouse] = useMouseMove();
    const theme = useTheme();

    useEffect(() => {
      if (!events) return;
      dispatchTooltipConfig(events);
    }, [events]);

    useEffect(() => {
      setTrackMouse(tooltipConfig.open);
    }, [tooltipConfig.open, setTrackMouse]);

    return <TooltipWrapper top={mouseCoordinates.y} left={mouseCoordinates.x - theme.spacing(8)} {...tooltipConfig} />;
  },
  (prevProps, nextProps) => equal(prevProps, nextProps)
);
