import React from 'react';
import { ListItem, ListItemIcon, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  listItem: {
    maxWidth: '64px',
    height: '64px',
    backgroundColor: '#0C0F13',
    '&:hover > .MuiListItemIcon-root': {
      color: '#FFFFFF',
    },
    '&:last-child': {
      position: 'absolute',
      bottom: '0',
    },
  },
  listItemIcon: {
    color: '#797E82',
    minWidth: 'unset',
  },
});

export const MenuItem: React.FC<{ isButton: boolean }> = ({ children, isButton }) => {
  const classes = useStyles();

  return (
    <ListItem className={classes.listItem} button={isButton as any}>
      <ListItemIcon className={classes.listItemIcon}>{children}</ListItemIcon>
    </ListItem>
  );
};
