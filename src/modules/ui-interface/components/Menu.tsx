import React from 'react';
import { Drawer, List, makeStyles } from '@material-ui/core';
import { AcUnit, BorderAllOutlined, CommuteOutlined, AttachMoney, PermIdentity } from '@material-ui/icons';

import { MenuItem } from './MenuItem';

const useStyles = makeStyles({
  root: {
    width: '64px',
    maxWidth: '64px',
  },
  drawerPaper: {
    backgroundColor: '#11151A',
  },
  list: {
    height: '100%',
  },
});

export interface MenuItem {
  name: string;
  icon: React.FC;
  isButton: boolean;
}

const menuItems = [
  {
    name: 'logo',
    icon: <AcUnit fontSize="large" />,
    isButton: false,
  },
  {
    name: 'visualisation',
    icon: <BorderAllOutlined fontSize="large" />,
    isButton: true,
  },
  {
    name: 'carts',
    icon: <CommuteOutlined fontSize="large" />,
    isButton: true,
  },
  {
    name: 'halls',
    icon: <AttachMoney fontSize="large" />,
    isButton: true,
  },
  {
    name: 'settings',
    icon: <PermIdentity fontSize="large" />,
    isButton: true,
  },
];

export const Menu: React.FC = React.memo(() => {
  const classes = useStyles();

  return (
    <Drawer variant="permanent" className={classes.root} classes={{ paper: classes.drawerPaper }}>
      <List className={classes.list}>
        {menuItems.map((item) => (
          <MenuItem key={item.name} isButton={item.isButton}>
            {item.icon}
          </MenuItem>
        ))}
      </List>
    </Drawer>
  );
});
