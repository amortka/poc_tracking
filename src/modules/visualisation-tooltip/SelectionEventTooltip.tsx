import React, { useMemo } from 'react';
import { equal } from '../../utils/object.utils';
import { ISelectionTooltip } from '../../models/main.model';
import { TooltipWrapper } from './components/Tooltip';
import { Typography } from '@material-ui/core';

interface SelectionEventTooltipProps {
  objects: ISelectionTooltip[];
}

export const SelectionEventTooltip: React.FC<SelectionEventTooltipProps> = React.memo(
  ({ objects = [] }) => {
    const renderTooltip = useMemo(
      () =>
        objects.map((o) => (
          <TooltipWrapper
            top={o.coordinates.y}
            left={o.coordinates.x}
            open={true}
            template={
              <React.Fragment>
                <Typography color="inherit">{o.title}</Typography>
                {o.description}
              </React.Fragment>
            }
          />
        )),
      [objects]
    );

    return <>{renderTooltip}</>;
  },
  (prevProps, nextProps) => equal(prevProps, nextProps)
);
