import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  controlWrapper: {
    display: 'flex',
    background: '#181D24',
    color: '#3B434D',
    cursor: 'pointer',
    marginLeft: theme.spacing(3),

    '& > div': {
      margin: '4px',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      transition: `${theme.transitions.easing.easeInOut} ${theme.transitions.duration.standard}ms`,
      userSelect: 'none',
      height: theme.spacing(5),
      padding: `0 ${theme.spacing(3)}px`,

      '&:last-of-type': {
        marginLeft: 0,
      },
    },
  },
  selected: {
    background: '#3B434D',
    color: theme.palette.text.primary,
  },
}));

interface Options {
  first: {
    name: string;
  };
  second: {
    name: string;
  };
}

interface CameraControlProps {
  selected: boolean;
  action: Function;
  options: Options;
}

export const SliderButton: React.FC<CameraControlProps> = React.memo(({ selected, action, options }) => {
  const classes = useStyles();

  return (
    <div onClick={() => action()} className={classes.controlWrapper}>
      <div className={!selected ? classes.selected : null}>
        <Typography variant="body2">{options.first.name}</Typography>
      </div>
      <div className={selected ? classes.selected : null}>
        <Typography variant="body2">{options.second.name}</Typography>
      </div>
    </div>
  );
});
