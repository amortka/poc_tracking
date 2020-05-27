import React, { ReactNode } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles, Theme, useTheme, withStyles } from '@material-ui/core/styles';

const StyledTooltip = withStyles((theme: Theme) => ({
  tooltip: {
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
  },
  popper: {
    // zIndex: -1,
  },
}))(Tooltip);

const useStyles = makeStyles({
  tooltipSpan: {
    position: 'absolute' as 'absolute',
    display: 'block',
    pointerEvents: 'none',
  },
});

export interface TooltipProps {
  top: number;
  left: number;
  open: boolean;
  template: ReactNode;
  debug?: boolean;
}

export const TooltipWrapper: React.FC<TooltipProps> = React.memo(({ top = 0, left = 0, open, template, debug }) => {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <StyledTooltip open={open} arrow title={template}>
      <span
        className={classes.tooltipSpan}
        style={{ top: `${top + theme.spacing(2)}px`, left: `${left}px`, border: debug ? '3px solid pink' : 'none' }}
      />
    </StyledTooltip>
  );
});
