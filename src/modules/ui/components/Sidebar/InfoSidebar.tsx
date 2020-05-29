import React, { createContext } from 'react';
import { Drawer, makeStyles, Typography, Box, List } from '@material-ui/core';
import { ExpansionSidebarItem } from './ExpansionSidebarItem';
import { cartsMock } from '../../../../mocks/ui.mock';
import { CartItem } from '../CartItem/CartItem';
import { Select } from '../MaterialUI/Select';

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

  return (
    <Drawer variant="permanent" anchor="right" className={classes.root} classes={{ paper: classes.drawerPaper }}>
      <CartInfoContext.Provider value={setIsCartInfoVisible}>
        <Box className={classes.box} padding="10px">
          <Select />
          <List className={classes.list}>
            <CartItem {...cartsMock[0]} />
            <CartItem {...cartsMock[1]} />
            <CartItem {...cartsMock[2]} />
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
