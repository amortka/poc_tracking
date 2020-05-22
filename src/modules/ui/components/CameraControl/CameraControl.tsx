import React, { useMemo } from 'react';
import { List, makeStyles } from '@material-ui/core';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
import ZoomOutMapIcon from '@material-ui/icons/ZoomOutMap';
import ViewArrayIcon from '@material-ui/icons/ViewArray';
import ViewCarouselIcon from '@material-ui/icons/ViewCarousel';

import * as uiSelectors from '../../../../store/ui/ui.selectors';
import { ListItem } from '../MaterialUI/ListItem';
import { ListItemIcon } from '../MaterialUI/ListItemIcon';
import { uiActions } from '../../../../store/ui/ui.actions';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  List: {
    position: 'absolute' as 'absolute',
    top: theme.spacing(2),
    right: theme.spacing(2),
    zIndex: 100,
    display: 'flex',
  },
  ListItem: {
    marginRight: theme.spacing(1),
  },
}));

interface CameraControlProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onZoomFit: () => void;
}

export const CameraControl: React.FC<CameraControlProps> = ({ onZoomIn, onZoomOut, onZoomFit }) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const isD3 = useSelector(uiSelectors.isD3);

  const menuItems = useMemo(
    () => [
      {
        name: 'Zoom In',
        icon: <ZoomInIcon fontSize="large" />,
        onClick: onZoomIn,
      },
      {
        name: 'Zoom Out',
        icon: <ZoomOutIcon fontSize="large" />,
        onClick: onZoomOut,
      },
      {
        name: 'Zoom Fit',
        icon: <ZoomOutMapIcon fontSize="large" />,
        onClick: onZoomFit,
      },
      {
        name: 'Dimension toggle',
        icon: isD3 ? <ViewCarouselIcon fontSize="large" /> : <ViewArrayIcon fontSize="large" />,
        onClick: () => dispatch(uiActions.setIsD3(!isD3)),
      },
    ],
    [onZoomIn, onZoomOut, onZoomFit, dispatch, isD3]
  );

  return (
    <List className={classes.List}>
      {menuItems.map((item) => (
        <li className={classes.ListItem} key={item.name}>
          <ListItem onClick={item.onClick} button={true}>
            <ListItemIcon>{item.icon}</ListItemIcon>
          </ListItem>
        </li>
      ))}
    </List>
  );
};
