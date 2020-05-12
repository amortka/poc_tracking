import React from 'react';
import { Drawer, makeStyles, Paper, Typography, Box } from '@material-ui/core';
import { ExpansionSidebarItem } from './expansion-sidebar-item';

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
  paper: {
    height: '200px',
    marginBottom: '20px',
    backgroundColor: '#212830',
    boxShadow: 'inset 5px 0 20px -7px #000000',
  },
  box: {
    backgroundColor: '#2C323A',
    height: '150px',
    marginBottom: '20px',
  },
});

export const InfoSidebar: React.FC = () => {
  const classes = useStyles();

  return (
    <Drawer variant="permanent" anchor="right" className={classes.root} classes={{ paper: classes.drawerPaper }}>
      <Box className={classes.box} padding="10px">
        <Typography variant="h6">Linia produkcyjna</Typography>
        dsadsadsadas
      </Box>
      <ExpansionSidebarItem title="Warehouse 800" />
      <ExpansionSidebarItem title="P1" />
      <ExpansionSidebarItem title="P0" />
      <ExpansionSidebarItem title="Strefa Cavity" />
    </Drawer>
  );
};
