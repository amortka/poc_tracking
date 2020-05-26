import React, { Reducer, useEffect, useReducer } from 'react';
import { Typography, useTheme } from '@material-ui/core';

import { equal } from '../../../../utils/object.utils';
import { EventType, IMouseEventPayload } from '../../../canvas/canvas.model';
import { TooltipProps, TooltipWrapper } from './components/Tooltip';
import { useMouseMove } from '../../custom-hooks/use-mouse-move.hook';
import { useSelector } from 'react-redux';
import { TooltipsSelectors } from '../../../../store/tooltips/tooltips.selectors';

interface MouseEventTooltipProps {}

const tooltipReducer: Reducer<Pick<TooltipProps, 'open' | 'template'>, IMouseEventPayload> = (state, action) => {
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
  () => {
    const [mouseCoordinates, setTrackMouse] = useMouseMove();
    const [tooltipConfig, dispatchTooltipConfig] = useReducer(tooltipReducer, { template: '', open: false });
    const mouseEvent = useSelector(TooltipsSelectors.mouse);
    const theme = useTheme();

    useEffect(() => {
      if (!mouseEvent) return;
      dispatchTooltipConfig(mouseEvent);
    }, [mouseEvent]);

    useEffect(() => {
      setTrackMouse(tooltipConfig.open);
    }, [tooltipConfig.open, setTrackMouse]);

    return <TooltipWrapper top={mouseCoordinates.y} left={mouseCoordinates.x - theme.spacing(8)} {...tooltipConfig} />;
  },
  (prevProps, nextProps) => equal(prevProps, nextProps)
);
