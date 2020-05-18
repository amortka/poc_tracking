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
import { CartItem } from './CartItem';
import { cartsMock } from '../../../mocks/ui.mock';

const ExpansionPanel = withStyles({
  root: {
    boxShadow: 'inset 12px 0 15px -5px #14191F',
    backgroundColor: '#212830',
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
    '&:first-of-type': {
      backgroundColor: '#2C323A',
    },
    height: '200px',
    marginBottom: '20px',
    backgroundColor: '#212830',
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

export const ExpansionSidebarItem: React.FC<ExpansionSidebarItemProps> = ({ title }) => {
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
};
