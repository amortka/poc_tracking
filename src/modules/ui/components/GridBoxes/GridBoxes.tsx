import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import { GridBox, GridBoxItem } from './GridBox';

const useStyles = makeStyles((theme) => ({
  items: {
    '& > .MuiGrid-item': {
      padding: '2px',
    },
  },
}));

interface GridBoxesProps {
  items: Array<GridBoxItem>;
  dark?: boolean;
}

export const GridBoxes: React.FC<GridBoxesProps> = React.memo(({ items, dark = false }) => {
  const classes = useStyles();

  return (
    <Grid container className={classes.items}>
      {items.map((item) => (
        <GridBox key={item.name} {...item} dark={dark} />
      ))}
    </Grid>
  );
});
