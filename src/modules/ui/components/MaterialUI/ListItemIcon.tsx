import React from 'react';
import { ListItemIcon as ListItemIconMaterial, makeStyles } from '@material-ui/core';
import { ListItemIconProps } from '@material-ui/core/ListItemIcon/ListItemIcon';

const useStyles = makeStyles((theme) => ({
  listItemIcon: {
    transition: theme.transitions[1],
    color: '#797E82',
    minWidth: 'unset',
  },
  selected: {
    color: '#FFFFFF',
  },
}));

const listItemIconClasses = (selected: boolean, baseClass: any, selectedClass: any) =>
  `${baseClass}${selected ? ` ${selectedClass}` : ''}`;

interface ListItemIconExtendedProps extends ListItemIconProps {
  selected?: boolean;
}

export const ListItemIcon: React.FC<ListItemIconExtendedProps> = ({ children, selected = false, ...props }) => {
  const classes = useStyles();

  return (
    <ListItemIconMaterial className={listItemIconClasses(selected, classes.listItemIcon, classes.selected)} {...props}>
      {children}
    </ListItemIconMaterial>
  );
};
