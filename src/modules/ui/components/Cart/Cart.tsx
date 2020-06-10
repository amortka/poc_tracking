import React, { useContext } from 'react';
import { Button, makeStyles, Typography } from '@material-ui/core';
import { DriveEta } from '@material-ui/icons';

import { CartDetailsContext } from '../Sidebar/InfoSidebar';
import { useDispatch } from 'react-redux';
import { tooltipActions } from '../../../../store/tooltips/tooltips.actions';
import { IVehicleState } from '../../../../store/vehicles/vehicles.model';
import { Color } from '../../../canvas/canvas.model';
import { CartStats } from './CartStats';

const useStyles = makeStyles((theme) => ({
  cartName: {
    fontWeight: 700,
  },
  cartStats: {
    '& > .MuiGrid-item': {
      padding: '2px',
    },
  },
  cartStat: {
    width: '100%',
    height: theme.spacing(8),
    backgroundColor: theme.palette.primary.light,
    display: 'flex',
    alignItems: 'center',
  },
  cartHeader: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(3),

    '& > .MuiSvgIcon-root': {
      marginRight: theme.spacing(2),
    },
  },
  detailsButton: {
    padding: '5px 10px',
    border: '1px solid #989FA4',
    maxHeight: theme.spacing(4),
    height: theme.spacing(4),
    fontSize: '12px',
    marginLeft: 'auto',
    borderRadius: 0,
  },
}));

interface CartProps {
  color: Color;
  name: string;
  vehicle?: IVehicleState;
}

export const Cart: React.FC<CartProps> = React.memo(({ color, name }) => {
  const classes = useStyles();
  const setIsCartDetailsVisible = useContext(CartDetailsContext);
  const dispatch = useDispatch();

  const setCartDetailsVisible = () => {
    dispatch(tooltipActions.clearSelectionSelected());
    setIsCartDetailsVisible(true);
  };

  return (
    <div>
      <div className={classes.cartHeader}>
        <DriveEta htmlColor={color as string} />
        <Typography variant="subtitle1" className={classes.cartName}>
          {name}
        </Typography>
        <Button variant="outlined" onClick={setCartDetailsVisible} className={classes.detailsButton}>
          See details
        </Button>
      </div>
      <CartStats />
    </div>
  );
});
