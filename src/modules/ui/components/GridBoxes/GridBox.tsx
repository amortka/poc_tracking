import React from 'react';
import { makeStyles, Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
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

export interface GridBoxItem {
  name: string;
  icon: JSX.Element;
  value: string | number;
  floatPoint?: number;
}

interface GridBoxProps extends GridBoxItem {
  dark?: boolean;
}

const getItemClassName = (dark: boolean, itemClass: string, darkItemClass: string): string =>
  `${itemClass} ${dark ? darkItemClass : ''}`;

export const GridBox: React.FC<GridBoxProps> = React.memo(({ name, icon, value, floatPoint, dark = false }) => {
  const classes = useStyles();

  return (
    <Grid xs={6} item key={name}>
      <div className={getItemClassName(dark, classes.item, classes.itemDark)}>
        <div className={classes.itemIconWrapper}>{icon}</div>
        <div>
          <Typography variant="caption" className={classes.itemName}>
            {name}
          </Typography>
          <Typography>{typeof floatPoint === 'number' ? (+value).toFixed(floatPoint) : value}</Typography>
        </div>
      </div>
    </Grid>
  );
});
