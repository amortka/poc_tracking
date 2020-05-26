import React from 'react';
import { Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';

import { equal } from '../../../../utils/object.utils';
import { TooltipsSelectors } from '../../../../store/tooltips/tooltips.selectors';
import { TooltipWrapper } from './components/Tooltip';
import { IPoint } from '../../../canvas/canvas.model';

interface SelectionEventTooltipProps {
  debug?: boolean;
  centerPosition?: IPoint;
}

export const SelectionEventTooltip: React.FC<SelectionEventTooltipProps> = React.memo(
  ({ centerPosition = { x: 0, y: 0 }, debug }) => {
    const selectionData = useSelector(TooltipsSelectors.selectionSelectedData);

    const renderTooltip = Object.keys(selectionData || {}).map((s) => (
      <TooltipWrapper
        key={s}
        top={selectionData[s].coordinates.y + centerPosition.y}
        left={selectionData[s].coordinates.x + centerPosition.x}
        open={true}
        debug={debug}
        template={
          <React.Fragment>
            <Typography color="inherit">{selectionData[s].title}</Typography>
            {selectionData[s].description}
          </React.Fragment>
        }
      />
    ));

    return <>{renderTooltip}</>;
  },
  (prevProps, nextProps) => equal(prevProps, nextProps)
);
