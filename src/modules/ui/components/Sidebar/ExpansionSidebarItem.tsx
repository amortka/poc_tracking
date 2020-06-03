import React from 'react';
import { useDispatch } from 'react-redux';
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
import { RoutesActions } from '../../../../store/routes/routes.actions';

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

export interface ExpansionSidebarItemProps {
  title: string;
}

export const ExpansionSidebarItem: React.FC<ExpansionSidebarItemProps> = React.memo(({ title }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <ExpansionPanel square className={classes.expansionPanel}>
      <ExpansionPanelSummary expandIcon={<Add />} className={classes.expansionSummary}>
        <Typography variant="h6">{title}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.details}>
        <List className={classes.list}>
          <div onClick={() => dispatch(RoutesActions.selectRoutes([]))}>
            <CartItem {...cartsMock[3]} />
            <CartItem {...cartsMock[4]} />
            <CartItem {...cartsMock[5]} />
          </div>
        </List>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
});
