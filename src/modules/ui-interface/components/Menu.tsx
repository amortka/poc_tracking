import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, makeStyles } from '@material-ui/core';
import { AcUnit, AttachMoney, BorderAllOutlined, CommuteOutlined, PermIdentity } from '@material-ui/icons';

const useStyles = makeStyles({
  root: {
    width: '64px',
    maxWidth: '64px',
  },
  drawerPaper: {
    backgroundColor: '#11151A',
  },
  listItem: {
    maxWidth: '64px',
    backgroundColor: '#0C0F13',
  },
  listItemIcon: {
    minWidth: 'unset',
  },
});

export const Menu: React.FC = React.memo(() => {
  const classes = useStyles();

  return (
    <Drawer variant="permanent" className={classes.root} classes={{ paper: classes.drawerPaper }}>
      <List>
        <ListItem className={classes.listItem}>
          <ListItemIcon className={classes.listItemIcon}>
            <AcUnit fontSize="large" />
          </ListItemIcon>
        </ListItem>
        <ListItem button className={classes.listItem}>
          <ListItemIcon className={classes.listItemIcon}>
            <BorderAllOutlined fontSize="large" />
          </ListItemIcon>
        </ListItem>
        <ListItem button className={classes.listItem}>
          <ListItemIcon className={classes.listItemIcon}>
            <CommuteOutlined fontSize="large" />
          </ListItemIcon>
        </ListItem>
        <ListItem button className={classes.listItem}>
          <ListItemIcon className={classes.listItemIcon}>
            <AttachMoney fontSize="large" />
          </ListItemIcon>
        </ListItem>
        <ListItem button className={classes.listItem}>
          <ListItemIcon className={classes.listItemIcon}>
            <PermIdentity fontSize="large" />
          </ListItemIcon>
        </ListItem>
      </List>
    </Drawer>
  );
});
