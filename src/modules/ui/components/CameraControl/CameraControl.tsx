import React, { useMemo } from 'react';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
import { makeStyles } from '@material-ui/core';
import { MyLocation } from '@material-ui/icons';

import { uiActions } from '../../../../store/ui/ui.actions';
import { useDispatch, useSelector } from 'react-redux';
import { SliderButton } from '../SliderButton/SliderButton';
import { UiSelectors } from '../../../../store/ui/ui.selectors';

const useStyles = makeStyles((theme) => ({
  controlsWrapper: {
    position: 'absolute',
    top: theme.spacing(3),
    left: theme.spacing(3),
    zIndex: 100,
    display: 'flex',
  },
  controls: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '2px',
    transition: `${theme.transitions.easing.easeInOut} ${theme.transitions.duration.standard}ms`,
    width: theme.spacing(6),
    height: theme.spacing(6),
    backgroundColor: theme.palette.background.default,
    cursor: 'pointer',

    '&:hover': {
      backgroundColor: theme.palette.primary.light,
    },

    '& > .MuiSvgIcon-root': {
      color: theme.palette.text.primary,
    },
  },
}));

interface CameraControlProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onZoomFit: () => void;
}

export const CameraControl: React.FC<CameraControlProps> = React.memo(({ onZoomIn, onZoomOut, onZoomFit }) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const isD3 = useSelector(UiSelectors.isD3);

  const menuItems = useMemo(
    () => [
      {
        name: 'Zoom In',
        icon: <ZoomInIcon fontSize="small" />,
        onClick: onZoomIn,
      },
      {
        name: 'Zoom Out',
        icon: <ZoomOutIcon fontSize="small" />,
        onClick: onZoomOut,
      },
      {
        name: 'Zoom Fit',
        icon: <MyLocation fontSize="small" />,
        onClick: onZoomFit,
      },
    ],
    [onZoomIn, onZoomOut, onZoomFit]
  );

  const slider = {
    first: { name: '2D' },
    second: { name: '3D' },
  };

  const dimensionToggle = useMemo(
    () => ({
      name: 'Dimension toggle',
      onClick: () => dispatch(uiActions.setIsD3(!isD3)),
    }),
    [dispatch, isD3]
  );

  return (
    <div className={classes.controlsWrapper}>
      {menuItems.map((item) => (
        <div key={item.name} onClick={item.onClick} className={classes.controls}>
          {item.icon}
        </div>
      ))}
      <SliderButton selected={isD3} action={dimensionToggle.onClick} options={slider} />
    </div>
  );
});
