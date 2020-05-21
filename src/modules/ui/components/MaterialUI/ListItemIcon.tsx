import React from 'react';
import { ListItemIcon as ListItemIconMaterial, makeStyles } from '@material-ui/core';
import { ListItemIconProps } from '@material-ui/core/ListItemIcon/ListItemIcon';

const useStyles = makeStyles((theme) => ({
  listItemIcon: {
    color: '#797E82',
    minWidth: 'unset',
  },
}));

export const ListItemIcon: React.FC<ListItemIconProps> = ({ children, ...props }) => {
  const classes = useStyles();

  return (
    <ListItemIconMaterial className={classes.listItemIcon} {...props}>
      {children}
    </ListItemIconMaterial>
  );
};
