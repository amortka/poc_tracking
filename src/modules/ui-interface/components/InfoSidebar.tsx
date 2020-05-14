import React from 'react';
import { Box, Drawer, List, makeStyles, Typography } from '@material-ui/core';
import { ExpansionSidebarItem } from './expansion-sidebar-item';
import { cartsMock } from '../../../mocks/ui.mock';
import { CartItem } from './cart-item';

const useStyles = makeStyles({
  root: {
    width: '300px',
    maxWidth: '300px',
  },
  drawerPaper: {
    backgroundColor: '#14191F',
    width: '300px',
    maxWidth: '300px',
    borderLeft: 'none',
  },
  box: {
    backgroundColor: '#2C323A',
    height: '200px',
    marginBottom: '20px',
    padding: 0,
  },
  list: {
    width: '100%',
  },
  title: {
    padding: '15px 20px',
  },
});

export const InfoSidebar: React.FC = React.memo(() => {
  const classes = useStyles();

  return (
    <Drawer variant="permanent" anchor="right" className={classes.root} classes={{ paper: classes.drawerPaper }}>
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
    </Drawer>
  );
});
