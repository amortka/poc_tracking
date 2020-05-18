import React from 'react';
import { makeStyles, Box, Typography, Divider, List, ListItem } from '@material-ui/core';
import './CartInfo.css';
import { DriveEta, DoubleArrow } from '@material-ui/icons';

const useStyles = makeStyles({
  box: {
    width: '410px',
    height: '100%',
    backgroundColor: '#41464E',
    marginLeft: 'auto',
    padding: '25px',
    boxShadow: '-7px 0 20px 1px #14191F',
  },
  divider: {
    marginTop: '25px',
    marginBottom: '25px',
  },
  cartIcon: {
    marginRight: '15px',
  },
  doubleArrowIcon: {
    marginLeft: 'auto',
    cursor: 'pointer',
  },
  list: {
    '& > li:nth-child(odd)': {
      backgroundColor: '#3C414A',
    },
    '& > li:nth-child(even)': {
      backgroundColor: '#4A4F57',
    },
  },
  listItem: {
    paddingTop: '10px',
    paddingBottom: '10px',
  },
});

export interface CartInfoProps {
  setIsCartInfoVisible: Function;
}

export const CartInfo: React.FC<CartInfoProps> = ({ setIsCartInfoVisible }) => {
  const classes = useStyles();

  return (
    <div className="background-shadow" onClick={() => setIsCartInfoVisible(false)}>
      <Box color="text.primary" className={classes.box} onClick={(e) => e.stopPropagation()}>
        <div className="cartInfo-headerContainer">
          <DriveEta className={classes.cartIcon} />
          <Typography variant="h6">Milkrun GHI</Typography>
          <DoubleArrow onClick={() => setIsCartInfoVisible(false)} className={classes.doubleArrowIcon} />
        </div>
        <Divider className={classes.divider} />
        <Typography variant="subtitle2">Historia trasy</Typography>
        <Typography variant="subtitle2">Zamówienia</Typography>
        <List className={classes.list}>
          <ListItem className={classes.listItem}>
            <Typography variant="body2">Nazwa produktu 1</Typography>
          </ListItem>
          <ListItem className={classes.listItem}>
            <Typography variant="body2">Nazwa produktu 2</Typography>
          </ListItem>
          <ListItem className={classes.listItem}>
            <Typography variant="body2">Nazwa produktu 3</Typography>
          </ListItem>
          <ListItem className={classes.listItem}>
            <Typography variant="body2">Nazwa produktu 4</Typography>
          </ListItem>
        </List>
      </Box>
    </div>
  );
};
