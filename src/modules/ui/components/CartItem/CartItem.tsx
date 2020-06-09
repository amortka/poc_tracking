import React, { useContext } from 'react';
import { ListItem, ListItemIcon, ListItemText, makeStyles } from '@material-ui/core';
import { DriveEta, InfoOutlined } from '@material-ui/icons';

import './CartItem.css';
import { CartDetailsContext } from '../Sidebar/InfoSidebar';
import { useDispatch } from 'react-redux';
import { tooltipActions } from '../../../../store/tooltips/tooltips.actions';
import { IRouteState } from '../../../../store/routes/routes.model';
import { RoutesActions } from '../../../../store/routes/routes.actions';

const useStyles = makeStyles({
  root: {
    height: '40px',
    padding: '10px 20px',
    '&:hover': {
      backgroundColor: '#41464E',
    },
    display: 'flex',
  },
  icon: {
    minWidth: '24px',
    '&:first-of-type': {
      marginRight: '20px',
    },
  },
  cartName: {
    // width: '95px',
    // maxWidth: '95px',
  },
  cartTime: {
    color: '#989FA4',
    width: '50px',
    maxWidth: '50px',
  },
});

interface CartItemProps extends IRouteState {
  routeId: string;
}

export const CartItem: React.FC<CartItemProps> = React.memo(({ color, tag, selected, routeId }) => {
  const classes = useStyles();
  const setIsCartDetailsVisible = useContext(CartDetailsContext);
  const dispatch = useDispatch();

  const setCartDetailsVisible = () => {
    dispatch(tooltipActions.clearSelectionSelected());
    setIsCartDetailsVisible(true);
  };

  return (
    <ListItem
      button
      className={classes.root}
      selected={selected}
      onClick={() => dispatch(RoutesActions.selectRoutes([routeId]))}>
      <ListItemIcon className={classes.icon}>
        <DriveEta htmlColor={color as string} />
      </ListItemIcon>
      <ListItemText primary={tag} primaryTypographyProps={{ variant: 'body2' }} className={classes.cartName} />
      <ListItemIcon className={classes.icon}>
        <InfoOutlined onClick={setCartDetailsVisible} />
      </ListItemIcon>
    </ListItem>
  );
});
