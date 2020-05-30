import React from 'react';
import {
  makeStyles,
  Typography,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  withStyles,
  List,
} from '@material-ui/core';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import { Add } from '@material-ui/icons';
import { CartItem } from '../CartItem/CartItem';
import { cartsMock } from '../../../../mocks/ui.mock';

const ExpansionPanel = withStyles({
  root: {
    boxShadow: 'inset 12px 0 24px -13px rgba(0, 0, 0, 0.5)',
    margin: '0 0 15px 0',
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: '0 0 15px 0',
    },
  },
  expanded: {},
})(MuiExpansionPanel);

const useStyles = makeStyles({
  paper: {
    height: '200px',
    marginBottom: '20px',
  },
  details: {
    padding: 0,
  },
  list: {
    width: '100%',
  },
});

export interface ExpansionSidebarItemProps {
  title: string;
}

export const ExpansionSidebarItem: React.FC<ExpansionSidebarItemProps> = React.memo(({ title }) => {
  const classes = useStyles();

  return (
    <ExpansionPanel square>
      <ExpansionPanelSummary expandIcon={<Add />}>
        <Typography variant="h6">{title}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.details}>
        <List className={classes.list}>
          <CartItem {...cartsMock[3]} />
          <CartItem {...cartsMock[4]} />
          <CartItem {...cartsMock[5]} />
        </List>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
});
