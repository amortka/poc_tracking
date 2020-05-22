import React from 'react';
import { ListItem as ListItemMaterial, ListItemProps, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  listItem: {
    maxWidth: theme.spacing(8),
    height: theme.spacing(8),
    backgroundColor: '#0C0F13',
    '&:hover > .MuiListItemIcon-root': {
      color: '#FFFFFF',
    },
  },
}));

export const ListItem: React.FC<ListItemProps> = ({ children, ...props }) => {
  const classes = useStyles();

  return (
    // @ts-ignore
    <ListItemMaterial className={classes.listItem} {...props}>
      {children}
    </ListItemMaterial>
  );
};
