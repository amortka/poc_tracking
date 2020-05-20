import React, { useContext } from 'react';
import { makeStyles, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { DriveEta, InfoOutlined } from '@material-ui/icons';

import './CartItem.css';
import { CartInfoContext } from '../Sidebar/InfoSidebar';

const useStyles = makeStyles({
  root: {
    height: '40px',
    padding: '10px 20px',
    '&:hover': {
      backgroundColor: '#41464E',
    },
  },
  icon: {
    minWidth: '24px',
    '&:first-of-type': {
      marginRight: '20px',
    },
  },
  cartName: {
    width: '95px',
    maxWidth: '95px',
  },
  cartTime: {
    color: '#989FA4',
    width: '50px',
    maxWidth: '50px',
  },
});

export interface CartItemProps {
  name: string;
  time: string;
  wagons: Array<{ id: string; isLoaded: boolean }>;
  color: string;
}

export const CartItem: React.FC<CartItemProps> = ({ name, time, wagons, color }) => {
  const classes = useStyles();
  const setIsCartInfoVisible = useContext(CartInfoContext);

  const setCartInfoVisible = () => {
    setIsCartInfoVisible(true);
  };

  return (
    <ListItem button className={classes.root}>
      <ListItemIcon className={classes.icon}>
        <DriveEta htmlColor={color} />
      </ListItemIcon>
      <ListItemText primary={name} primaryTypographyProps={{ variant: 'body2' }} className={classes.cartName} />
      <ListItemText primary={time} primaryTypographyProps={{ variant: 'overline' }} className={classes.cartTime} />
      <div className="loadedIndicator">
        {wagons.map((cart) => (
          <div key={cart.id} className={`cart ${cart.isLoaded ? 'cart--loaded' : 'cart--empty'}`}></div>
        ))}
      </div>
      <ListItemIcon className={classes.icon}>
        <InfoOutlined onClick={setCartInfoVisible} />
      </ListItemIcon>
    </ListItem>
  );
};
