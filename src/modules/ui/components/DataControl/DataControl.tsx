import React, { useMemo } from 'react';

import { makeStyles } from '@material-ui/core';

import * as uiSelectors from '../../../../store/ui/ui.selectors';
import { uiActions } from '../../../../store/ui/ui.actions';
import { useDispatch, useSelector } from 'react-redux';
import { SliderButton } from '../SliderButton/SliderButton';

const useStyles = makeStyles((theme) => ({
  controlsWrapper: {
    position: 'absolute',
    bottom: theme.spacing(3),
    right: theme.spacing(3),
    zIndex: 100,
    display: 'flex',
  },
}));

export const DataControl: React.FC = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const isRealData = useSelector(uiSelectors.isRealData);

  const slider = {
    first: { name: 'SIMULATED' },
    second: { name: 'REAL DATA' },
  };

  const dataToggle = useMemo(
    () => ({
      name: 'Data source toggle',
      onClick: () => {
        dispatch(uiActions.setIsRealData(!isRealData));
      },
    }),
    [dispatch, isRealData]
  );

  return (
    <div className={classes.controlsWrapper}>
      <SliderButton selected={isRealData} action={dataToggle.onClick} options={slider} />
    </div>
  );
};
