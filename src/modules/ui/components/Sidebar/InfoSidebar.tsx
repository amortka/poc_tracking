import React, { createContext, useEffect } from 'react';
import { Box, Drawer, makeStyles } from '@material-ui/core';

import { Cart } from '../Cart/Cart';
import { Dictionary, IRouteWithData } from '../../../../app.model';
import { ExpansionSidebarItem } from './ExpansionSidebarItem';
import { RoutesActions } from '../../../../store/routes/routes.actions';
import { RoutesSelectors } from '../../../../store/routes/routes.selectors';
import { Select } from '../MaterialUI/Select';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    width: theme.spacing(50),
    maxWidth: theme.spacing(50),
  },
  drawerPaper: {
    backgroundColor: '#14191F',
    width: theme.spacing(50),
    maxWidth: theme.spacing(50),
    borderLeft: 'none',
    position: 'relative' as 'relative',
  },
  box: {
    backgroundColor: theme.palette.primary.main,
    marginBottom: theme.spacing(2),
    padding: theme.spacing(3),
  },
  cartWrapper: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
}));

export interface InfoSidebarProps {
  setIsCartDetailsVisible: Function;
}

export const CartDetailsContext = createContext<Function>(undefined);

export const InfoSidebar: React.FC<InfoSidebarProps> = ({ setIsCartDetailsVisible }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const routes: Dictionary<IRouteWithData> = useSelector(RoutesSelectors.getRoutesWithData);
  const selectedRouteEntry = useSelector(RoutesSelectors.getFirstSelectedRouteEntry);

  useEffect(
    () => {
      if (!Object.keys(routes).length) return;
      dispatch(RoutesActions.selectRoutes([Object.keys(routes)[0]]));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [!!Object.keys(routes).length, dispatch]
  );

  const selectOptions: Array<{ value: string | number; name: string | number }> = Object.entries(routes).map(
    ([routeId, route]) => ({
      value: routeId,
      name: route.tag,
    })
  );

  const selectRoute = (event) => {
    event.target.value && dispatch(RoutesActions.selectRoutes([event.target.value]));
  };

  return (
    <Drawer variant="permanent" anchor="right" className={classes.root} classes={{ paper: classes.drawerPaper }}>
      <CartDetailsContext.Provider value={setIsCartDetailsVisible}>
        <Box className={classes.box}>
          <Select
            selectOptions={selectOptions}
            onChange={selectRoute}
            value={selectedRouteEntry ? selectedRouteEntry[0] : ''}
          />
          <div className={classes.cartWrapper}>
            {selectedRouteEntry && (
              <Cart
                color={selectedRouteEntry[1].color}
                name={selectedRouteEntry[1].tag}
                vehicle={selectedRouteEntry[1].vehicle}
              />
            )}
          </div>
        </Box>
        <ExpansionSidebarItem title="Production area L1" />
        <ExpansionSidebarItem title="Production area L2" />
        <ExpansionSidebarItem title="Production area L3" />
        <ExpansionSidebarItem title="Warehouse area M1" />
      </CartDetailsContext.Provider>
    </Drawer>
  );
};
