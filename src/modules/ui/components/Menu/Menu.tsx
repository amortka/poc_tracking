import React, { ReactElement } from 'react';
import { Drawer, List, makeStyles } from '@material-ui/core';
import { Map, Equalizer, Settings, AccountCircle } from '@material-ui/icons';

import { MenuItem } from './MenuItem';

const useStyles = makeStyles((theme) => ({
  root: {
    width: theme.spacing(10),
    maxWidth: theme.spacing(10),
  },
  drawerPaper: {
    backgroundColor: '#11151A',
    borderRight: 'none',
  },
  list: {
    height: '100%',

    '& > :last-child': {
      position: 'absolute',
      bottom: 0,
      left: 0,
    },
  },
}));

export interface MenuItem {
  name: string;
  icon: ReactElement;
  selected: boolean;
}

const menuItems: MenuItem[] = [
  {
    name: 'visualisation',
    icon: <Map fontSize="default" />,
    selected: true,
  },
  {
    name: 'data',
    icon: <Equalizer fontSize="default" />,
    selected: false,
  },
  {
    name: 'settings',
    icon: <Settings fontSize="default" />,
    selected: false,
  },
  {
    name: 'account',
    icon: <AccountCircle fontSize="default" />,
    selected: false,
  },
];

export const Menu: React.FC = React.memo(() => {
  const classes = useStyles();

  return (
    <Drawer variant="permanent" className={classes.root} classes={{ paper: classes.drawerPaper }}>
      <List className={classes.list}>
        {menuItems.map((item) => (
          <MenuItem key={item.name} selected={item.selected}>
            {item.icon}
          </MenuItem>
        ))}
      </List>
    </Drawer>
  );
});
