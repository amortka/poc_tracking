import React, { useContext } from 'react';
import { makeStyles, Typography, Button } from '@material-ui/core';
import { DriveEta, Battery80, Speed, SkipNext, AvTimer } from '@material-ui/icons';

import { CartDetailsContext } from '../Sidebar/InfoSidebar';
import { useDispatch } from 'react-redux';
import { tooltipActions } from '../../../../store/tooltips/tooltips.actions';
import { IVehicleState } from '../../../../store/vehicles/vehicles.model';
import { Color } from '../../../canvas/canvas.model';
import { GridBoxes } from '../GridBoxes/GridBoxes';

const useStyles = makeStyles((theme) => ({
  cartName: {
    fontWeight: 700,
  },
  // cartTime: {
  //   color: '#989FA4',
  //   width: '50px',
  //   maxWidth: '50px',
  // },
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
  cartStatIconWrapper: {
    height: theme.spacing(8),
    width: theme.spacing(8),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: theme.palette.secondary.main,
  },
  cartStatName: {
    color: '#989FA4',
  },
}));

const cartStats = [
  {
    name: 'Battery',
    icon: <Battery80 />,
    value: '75%',
  },
  {
    name: 'Average speed',
    icon: <Speed />,
    value: '5 km/h',
  },
  {
    name: 'Finish time',
    icon: <AvTimer />,
    value: '1:15 min',
  },
  {
    name: 'Next stop in',
    icon: <SkipNext />,
    value: '20 sec',
  },
];

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
        {/* <ListItemText primary={time} primaryTypographyProps={{ variant: 'overline' }} className={classes.cartTime} /> */}
        {/* <div className="loadedIndicator">
          {wagons.map((cart) => (
            <div key={cart.id} className={`cart ${cart.isLoaded ? 'cart--loaded' : 'cart--empty'}`}></div>
          ))}
        </div> */}
        <Button variant="outlined" onClick={setCartDetailsVisible} className={classes.detailsButton}>
          See details
        </Button>
      </div>
      <GridBoxes items={cartStats} />
    </div>
  );
});
