import React from 'react';
import { makeStyles, FormControl as MaterialFormControl, Select as MaterialSelect } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: '100%',
    height: theme.spacing(6),
    backgroundColor: theme.palette.background.default,

    '& .MuiSelect-icon': {
      right: theme.spacing(1),
    },
  },
  select: {
    height: theme.spacing(6),

    '& > .MuiSelect-select': {
      paddingLeft: theme.spacing(2),
    },

    '& > .MuiSelect-select:focus': {
      backgroundColor: 'inherit',
    },

    '&::before': {
      display: 'none',
    },

    '&::after': {
      display: 'none',
    },
  },
}));

export const Select: React.FC<any> = ({ children, selected, ...props }) => {
  const classes = useStyles();

  return (
    <MaterialFormControl className={classes.formControl}>
      <MaterialSelect
        value={10}
        // onChange={handleChange}
        name="age"
        className={classes.select}
        inputProps={{ 'aria-label': 'age' }}>
        <option value="">None</option>
        <option value={10}>Ten</option>
        <option value={20}>Twenty</option>
        <option value={30}>Thirty</option>
      </MaterialSelect>
    </MaterialFormControl>
  );
};
