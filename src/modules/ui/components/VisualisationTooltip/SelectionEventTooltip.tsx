import React, { useMemo } from 'react';
import { Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';

import { TooltipsSelectors } from '../../../../store/tooltips/tooltips.selectors';
import { TooltipWrapper } from './components/Tooltip';
import { IPoint } from '../../../canvas/canvas.model';

interface SelectionEventTooltipProps {
  debug?: boolean;
  centerPosition?: IPoint;
  canvasWrapperBox: DOMRect;
}

export const SelectionEventTooltip: React.FC<SelectionEventTooltipProps> = ({
  centerPosition = { x: 0, y: 0 },
  debug,
  canvasWrapperBox,
}) => {
  const selectionData = useSelector(TooltipsSelectors.selectionSelectedData);
  const canvasWidth = canvasWrapperBox?.width;

  const renderTooltip = useMemo(
    () =>
      Object.keys(selectionData || {}).map((s) => {
        let left = selectionData[s].coordinates?.x + centerPosition.x;
        left = left > canvasWidth ? canvasWidth : left;
        left = left < 0 ? 0 : left;
        return (
          <TooltipWrapper
            key={s}
            top={selectionData[s].coordinates?.y + centerPosition.y}
            left={left}
            open={true}
            debug={debug}
            template={
              <React.Fragment>
                <Typography color="inherit">{selectionData[s].title}</Typography>
                {selectionData[s].description}
              </React.Fragment>
            }
          />
        );
      }),
    [selectionData, canvasWidth, centerPosition.x, centerPosition.y, debug]
  );

  return <>{renderTooltip}</>;
};
