import React from 'react';
import {
  makeStyles,
  FormControl as MaterialFormControl,
  Select as MaterialSelect,
  SelectProps as MaterialSelectProps,
  MenuItem,
} from '@material-ui/core';

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

interface SelectProps extends MaterialSelectProps {
  selectOptions: Array<{ value: string | number; name: string | number }>;
}

export const Select: React.FC<SelectProps> = React.memo(({ children, selectOptions, ...props }) => {
  const classes = useStyles();

  return (
    <MaterialFormControl className={classes.formControl}>
      <MaterialSelect
        value={props.value}
        onChange={props.onChange}
        name="cart"
        className={classes.select}
        inputProps={{ 'aria-label': 'cart' }}
        {...props}>
        {selectOptions.map((opt) => (
          <MenuItem key={opt.value} value={opt.value}>
            {opt.name}
          </MenuItem>
        ))}
      </MaterialSelect>
    </MaterialFormControl>
  );
});
