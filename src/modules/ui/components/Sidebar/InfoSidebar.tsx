import React, { createContext, useMemo } from 'react';
import { Box, Drawer, List, makeStyles } from '@material-ui/core';

import { ExpansionSidebarItem } from './ExpansionSidebarItem';
import { cartsMock } from '../../../../mocks/ui.mock';
import { CartItem } from '../CartItem/CartItem';
import { Select } from '../MaterialUI/Select';
import { useDispatch, useSelector } from 'react-redux';
import { RoutesSelectors } from '../../../../store/routes/routes.selectors';
import { Dictionary, IRouteWithData } from '../../../../app.model';
import { RoutesActions } from '../../../../store/routes/routes.actions';
import { Cart } from '../Cart/Cart';

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
        <ExpansionSidebarItem title="Warehouse 800" />
        <ExpansionSidebarItem title="P1" />
        <ExpansionSidebarItem title="P0" />
        <ExpansionSidebarItem title="Strefa Cavity" />
      </CartDetailsContext.Provider>
    </Drawer>
  );
};
