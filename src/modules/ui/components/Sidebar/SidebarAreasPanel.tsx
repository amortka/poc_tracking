import React from 'react';
import { useSelector } from 'react-redux';
import {
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  List,
  makeStyles,
  Typography,
  withStyles,
} from '@material-ui/core';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import { Add } from '@material-ui/icons';

import { RoutesSelectors } from '../../../../store/routes/routes.selectors';
import { CartItem } from '../CartItem/CartItem';

const ExpansionPanel = withStyles((theme) => ({
  root: {
    boxShadow: 'inset 12px 0 24px -13px rgba(0, 0, 0, 0.5)',
    margin: `0 0 ${theme.spacing(2)}px  0`,
    '&:before': {
      display: 'none',
    },
  },
}))(MuiExpansionPanel);

const useStyles = makeStyles((theme) => ({
  details: {
    padding: 0,
  },
  list: {
    width: '100%',
  },
  expansionSummary: {
    minHeight: theme.spacing(9),
  },
  expansionPanel: {
    '&.Mui-expanded': {
      margin: `0 0 ${theme.spacing(2)}px  0`,
    },
  },
}));

export interface SidebarAreasPanelProps {
  title: string;
  areaId: string;
}

export const SidebarAreasPanel: React.FC<SidebarAreasPanelProps> = React.memo(({ title, areaId }) => {
  const classes = useStyles();
  const routes = useSelector(RoutesSelectors.getRoutesInArea(areaId));

  return (
    <ExpansionPanel square className={classes.expansionPanel} expanded={true}>
      <ExpansionPanelSummary expandIcon={<Add />} className={classes.expansionSummary}>
        <Typography variant="h6">{title}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.details}>
        <List className={classes.list}>
          {routes.map(([routeId, routeData]) => (
            <CartItem key={routeId} routeId={routeId} {...routeData} />
          ))}
        </List>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
});
