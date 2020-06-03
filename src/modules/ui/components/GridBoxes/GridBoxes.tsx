import React from 'react';
import { makeStyles, Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  items: {
    '& > .MuiGrid-item': {
      padding: '2px',
    },
  },
  item: {
    width: '100%',
    height: theme.spacing(8),
    backgroundColor: theme.palette.primary.light,
    display: 'flex',
    alignItems: 'center',
  },
  itemDark: {
    backgroundColor: theme.palette.primary.main,
  },
  itemIconWrapper: {
    height: theme.spacing(8),
    width: theme.spacing(8),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: theme.palette.secondary.main,
  },
  itemName: {
    color: '#989FA4',
  },
}));

interface GridBoxesProps {
  items: Array<{
    name: string;
    icon: JSX.Element;
    value: string | number;
  }>;
  dark?: boolean;
}

const getItemClassName = (dark: boolean, itemClass: string, darkItemClass: string): string =>
  `${itemClass} ${dark ? darkItemClass : ''}`;

export const GridBoxes: React.FC<GridBoxesProps> = ({ items, dark = false }) => {
  const classes = useStyles();

  return (
    <Grid container className={classes.items}>
      {items.map((item) => (
        <Grid xs={6} item key={item.name}>
          <div className={getItemClassName(dark, classes.item, classes.itemDark)}>
            <div className={classes.itemIconWrapper}>{item.icon}</div>
            <div>
              <Typography variant="caption" className={classes.itemName}>
                {item.name}
              </Typography>
              <Typography>{item.value}</Typography>
            </div>
          </div>
        </Grid>
      ))}
    </Grid>
  );
};
