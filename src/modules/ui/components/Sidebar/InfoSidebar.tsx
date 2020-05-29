import React, { createContext } from 'react';
import { Drawer, makeStyles, Typography, Box, List } from '@material-ui/core';
import { ExpansionSidebarItem } from './ExpansionSidebarItem';
import { cartsMock } from '../../../../mocks/ui.mock';
import { CartItem } from '../CartItem/CartItem';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '300px',
    maxWidth: '300px',
  },
  drawerPaper: {
    backgroundColor: '#14191F',
    width: '300px',
    maxWidth: '300px',
    borderLeft: 'none',
    position: 'relative' as 'relative',
  },
  box: {
    backgroundColor: theme.palette.primary.main,
    height: '200px',
    marginBottom: '15px',
    padding: 0,
  },
  list: {
    width: '100%',
  },
  title: {
    padding: '15px 20px',
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
          <Typography variant="subtitle1" className={classes.title}>
            Linia produkcyjna
          </Typography>
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
