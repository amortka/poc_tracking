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
import { CartItem } from './cart-item';

const ExpansionPanel = withStyles({
  root: {
    boxShadow: 'inset 15px 0 9px -7px #14191F',
    backgroundColor: '#212830',
    margin: '0 0 20px 0',
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: '0 0 20px 0',
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
      <ExpansionPanelDetails>
        <Typography>asdasdasdasd</Typography>
        <List>
          <CartItem />
          <CartItem />
          <CartItem />
        </List>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};
