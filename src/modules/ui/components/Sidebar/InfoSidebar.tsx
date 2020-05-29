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
    height: theme.spacing(39.5),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(3),
  },
  list: {
    width: '100%',
  },
}));

export interface InfoSidebarProps {
  setIsCartInfoVisible: Function;
}

export const CartInfoContext = createContext<Function>(undefined);

export const InfoSidebar: React.FC<InfoSidebarProps> = React.memo(({ setIsCartInfoVisible }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const routes: Dictionary<IRouteWithData> = useSelector(RoutesSelectors.getRoutesWithData);
  const renderRoutes = useMemo(() => {
    return Object.entries(routes).map(([routeId, route]) => (
      <div key={routeId} onClick={() => dispatch(RoutesActions.selectRoutes([routeId]))}>
        <CartItem name={route.tag} time={cartsMock[0].time} wagons={cartsMock[0].wagons} color={route.color} />
      </div>
    ));
  }, [routes, dispatch]);

  return (
    <Drawer variant="permanent" anchor="right" className={classes.root} classes={{ paper: classes.drawerPaper }}>
      <CartInfoContext.Provider value={setIsCartInfoVisible}>
        <Box className={classes.box} padding="10px">
          <Select />
          <List className={classes.list}>
            {renderRoutes}
            <div onClick={() => dispatch(RoutesActions.selectRoutes(['routeId']))}>
              <CartItem {...cartsMock[0]} />
              <CartItem {...cartsMock[1]} />
              <CartItem {...cartsMock[2]} />
            </div>
          </List>
        </Box>
        <ExpansionSidebarItem title="Warehouse 800" />
        <ExpansionSidebarItem title="P1" />
        <ExpansionSidebarItem title="P0" />
        <ExpansionSidebarItem title="Strefa Cavity" />
      </CartInfoContext.Provider>
    </Drawer>
  );
});
