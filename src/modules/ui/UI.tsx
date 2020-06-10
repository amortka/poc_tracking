import React, { useRef, useState, useEffect } from 'react';
import { Fade, makeStyles, ThemeProvider } from '@material-ui/core';
import ReactResizeDetector from 'react-resize-detector';

import { CameraControl } from './components/CameraControl/CameraControl';
import { CartDetails } from './components/CartDetails/CartDetails';
import { DataControl } from './components/DataControl/DataControl';
import { InfoSidebar } from './components/Sidebar/InfoSidebar';
import { Logos } from './components/Logos/Logos';
import { Menu } from './components/Menu/Menu';
import { theme } from './config/theme.config';
import { VisualisationTooltip } from './components/VisualisationTooltip/VisualisationTooltip';
import { OrdersModal } from './components/OrdersModal/OrdersModal';
import { OrdersSelectors } from '../../store/orders/orders.selectors';
import { useSelector, useDispatch } from 'react-redux';
import { ordersActions } from '../../store/orders/orders.actions';

const useStyles = makeStyles((theme) => ({
  CanvasWrapper: {
    position: 'relative' as 'relative',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
}));

interface UIProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onZoomFit: () => void;
}

export const UI: React.FC<UIProps> = ({ children, onZoomIn, onZoomOut, onZoomFit }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const canvasWrapperRef = useRef(null);
  const [isCartDetailsVisible, setIsCartDetailsVisible] = useState(false);
  const [canvasWrapperBox, setIsCanvasWrapperBox] = useState<DOMRect>(null);
  const [isOrderModalVisible, setIsOrderModalVisible] = useState(false);

  const onResize = () => setIsCanvasWrapperBox((canvasWrapperRef.current as HTMLElement).getBoundingClientRect());

  const onModalClose = () => dispatch(ordersActions.clearSelectedStation());

  const selectedStation = useSelector(OrdersSelectors.getSelectedStation);

  useEffect(() => {
    setIsOrderModalVisible(!!selectedStation);
  }, [selectedStation]);

  return (
    <ThemeProvider theme={theme}>
      <main className={'MainContainer'}>
        <Menu />
        <ReactResizeDetector handleWidth onResize={onResize}>
          <div className={classes.CanvasWrapper} ref={canvasWrapperRef}>
            {children}
            <VisualisationTooltip canvasWrapperBox={canvasWrapperBox} />
            <CameraControl onZoomIn={onZoomIn} onZoomOut={onZoomOut} onZoomFit={onZoomFit} />
            <Logos />
            <DataControl />
          </div>
        </ReactResizeDetector>
        <InfoSidebar setIsCartDetailsVisible={setIsCartDetailsVisible} />
        {isCartDetailsVisible && (
          <Fade in={isCartDetailsVisible}>
            <CartDetails setIsCartDetailsVisible={setIsCartDetailsVisible} />
          </Fade>
        )}
      </main>
      <OrdersModal open={isOrderModalVisible} handleClose={onModalClose} selectedStation={selectedStation} />
    </ThemeProvider>
  );
};
