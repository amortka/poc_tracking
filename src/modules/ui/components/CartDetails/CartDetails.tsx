import React from 'react';
import { Box, ClickAwayListener, FadeProps, makeStyles, Typography } from '@material-ui/core';
import { DoubleArrow } from '@material-ui/icons';
import { useSelector } from 'react-redux';

import { CartDetailsOrders } from './CartDetailsOrders';
import { RoutesSelectors } from '../../../../store/routes/routes.selectors';
import { CartDetailsRoute } from './CartDetailsRoute';
import { StatsCards } from './CardDetailsStats';

const useStyles = makeStyles((theme) => ({
  box: {
    width: theme.spacing(58),
    height: '100%',
    backgroundColor: theme.palette.primary.light,
    marginLeft: 'auto',
    padding: theme.spacing(3),
    boxShadow: '-7px 0 20px 1px #14191F',
    boxSizing: 'border-box',
  },
  doubleArrowIcon: {
    marginLeft: 'auto',
    cursor: 'pointer',
  },
  list: {
    '& > li:nth-child(odd)': {
      backgroundColor: 'rgba(24, 29, 36, 0.1)',
    },
    '& > li:nth-child(even)': {
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
    },
  },
  listItem: {
    paddingTop: '10px',
    paddingBottom: '10px',
  },
  backgroundShadow: {
    width: `calc(100% - ${theme.spacing(10)}px - ${theme.spacing(50)}px)`,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    marginLeft: theme.spacing(10),
    marginRight: theme.spacing(50),
    position: 'absolute',
    height: '100%',
    zIndex: 100,
  },
  CartDetailsHeaderContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    fontWeight: 500,
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),

    '&:first-of-type': {
      marginTop: 0,
    },
  },
}));

export interface CartDetailsProps extends FadeProps {
  setIsCartDetailsVisible: Function;
}

export const CartDetails: React.FC<CartDetailsProps> = React.memo(({ setIsCartDetailsVisible }) => {
  const classes = useStyles();
  const selectedRouteEntry = useSelector(RoutesSelectors.getFirstSelectedRouteEntry);

  return (
    <div className={classes.backgroundShadow}>
      <ClickAwayListener onClickAway={() => setIsCartDetailsVisible(false)}>
        <Box color="text.primary" className={classes.box} onClick={(e) => e.stopPropagation()}>
          <div className={classes.CartDetailsHeaderContainer}>
            <Typography variant="body1" className={classes.title}>
              Route
            </Typography>
            <DoubleArrow onClick={() => setIsCartDetailsVisible(false)} className={classes.doubleArrowIcon} />
          </div>
          {selectedRouteEntry.routeId && <CartDetailsRoute />}

          <Typography variant="body1" className={classes.title}>
            Milkrun details
          </Typography>
          <StatsCards routeId={selectedRouteEntry.routeId} routeData={selectedRouteEntry.data} />

          <Typography variant="body1" className={classes.title}>
            Order ID: 1293840020
          </Typography>
          <CartDetailsOrders routeId={selectedRouteEntry.routeId} />
        </Box>
      </ClickAwayListener>
    </div>
  );
});
