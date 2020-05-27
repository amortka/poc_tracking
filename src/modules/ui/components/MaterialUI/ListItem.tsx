import React from 'react';
import { ListItem as ListItemMaterial, ListItemProps, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  listItem: {
    maxWidth: theme.spacing(10),
    width: theme.spacing(10),
    height: theme.spacing(10),
    backgroundColor: '#0C0F13',
    justifyContent: 'center',
    '&:hover > .MuiListItemIcon-root': {
      color: '#FFFFFF',
    },
  },
  selected: {
    borderLeft: '4px solid #11B573',
    backgroundColor: '#212830',
  },
}));

const listItemClasses = (selected: boolean, baseClass: any, selectedClass: any) =>
  `${baseClass}${selected ? ` ${selectedClass}` : ''}`;

export const ListItem: React.FC<ListItemProps> = ({ children, selected, ...props }) => {
  const classes = useStyles();

  return (
    // @ts-ignore
    <ListItemMaterial className={listItemClasses(selected, classes.listItem, classes.selected)} {...props}>
      {children}
    </ListItemMaterial>
  );
};
