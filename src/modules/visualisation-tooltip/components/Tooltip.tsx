import React, { ReactNode } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles, Theme, useTheme, withStyles } from '@material-ui/core/styles';

const StyledTooltip = withStyles((theme: Theme) => ({
  tooltip: {
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
  },
}))(Tooltip);

const useStyles = makeStyles({
  tooltipSpan: {
    position: 'fixed' as 'fixed',
    display: 'block',
    pointerEvents: 'none',
  },
});

export interface TooltipProps {
  top: number;
  left: number;
  open: boolean;
  template: ReactNode;
}

export const TooltipWrapper: React.FC<TooltipProps> = React.memo(({ top = 0, left = 0, open, template }) => {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <StyledTooltip open={open} arrow title={template}>
      <span className={classes.tooltipSpan} style={{ top: `${top + theme.spacing(2)}px`, left: `${left}px` }} />
    </StyledTooltip>
  );
});
