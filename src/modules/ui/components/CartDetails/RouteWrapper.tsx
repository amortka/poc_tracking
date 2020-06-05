import React from 'react';
import { makeStyles } from '@material-ui/core';

import { CanvasRouteManager } from '../../../canvas-route-menager/CanvasRouteManager';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'block',
    marginBottom: theme.spacing(2),
  },
}));

export const RouteWrapper: React.FC = () => {
  const classes = useStyles();

  return (
    <section className={classes.root}>
      <CanvasRouteManager />
    </section>
  );
};
