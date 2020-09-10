import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';

// import { ReactComponent as BalluffLogo } from './balluff-logo.svg';
import { ReactComponent as PGSLogo } from './pgssoftware-logo.svg';

const useStyles = makeStyles((theme) => ({
  logosWrapper: {
    position: 'absolute',
    bottom: theme.spacing(3),
    left: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
  },
  typography: {
    color: '#989FA4',
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
  },
  logo: {
    width: '55px',
    height: '55px',
  },
}));

export const Logos: React.FC = React.memo(() => {
  const classes = useStyles();

  return (
    <div className={classes.logosWrapper}>
      <PGSLogo />
      <Typography className={classes.typography}>&</Typography>
      <img className={classes.logo} src="/wobit-logo-white.png" alt="Wobit" />
    </div>
  );
});
