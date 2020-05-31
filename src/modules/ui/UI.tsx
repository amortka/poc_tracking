import React, { useRef, useState } from 'react';
import { Fade, makeStyles, ThemeProvider } from '@material-ui/core';
import ReactResizeDetector from 'react-resize-detector';

import { CameraControl } from './components/CameraControl/CameraControl';
import { CartInfo } from './components/CartInfo/CartInfo';
import { DataControl } from './components/DataControl/DataControl';
import { InfoSidebar } from './components/Sidebar/InfoSidebar';
import { Logos } from './components/Logos/Logos';
import { Menu } from './components/Menu/Menu';
import { theme } from './config/theme.config';
import { VisualisationTooltip } from './components/VisualisationTooltip/VisualisationTooltip';

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

  const [isCartInfoVisible, setIsCartInfoVisible] = useState(false);

  const canvasWrapperRef = useRef(null);
  const [canvasWrapperBox, setIsCanvasWrapperBox] = useState<DOMRect>(null);

  const onResize = () => setIsCanvasWrapperBox((canvasWrapperRef.current as HTMLElement).getBoundingClientRect());

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
        <InfoSidebar setIsCartInfoVisible={setIsCartInfoVisible} />
        {isCartInfoVisible && (
          <Fade in={isCartInfoVisible}>
            <CartInfo setIsCartInfoVisible={setIsCartInfoVisible} />
          </Fade>
        )}
      </main>
    </ThemeProvider>
  );
};
