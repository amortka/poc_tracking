import React from 'react';
import { equal } from '../../utils/object.utils';
import { IPoint, ISelectionData } from '../../models/main.model';
import { TooltipWrapper } from './components/Tooltip';
import { Typography } from '@material-ui/core';

interface SelectionEventTooltipProps {
  selection: ISelectionData;
  debug?: boolean;
  centerPosition?: IPoint;
}

export const SelectionEventTooltip: React.FC<SelectionEventTooltipProps> = React.memo(
  ({ selection, centerPosition = { x: 0, y: 0 }, debug }) => {
    const renderTooltip = Object.keys(selection || {}).map((s) => (
      <TooltipWrapper
        key={s}
        top={selection[s].coordinates.y + centerPosition.y}
        left={selection[s].coordinates.x + centerPosition.x}
        open={true}
        debug={debug}
        template={
          <React.Fragment>
            <Typography color="inherit">{selection[s].title}</Typography>
            {selection[s].description}
          </React.Fragment>
        }
      />
    ));

    return <>{renderTooltip}</>;
  },
  (prevProps, nextProps) => equal(prevProps, nextProps)
);
