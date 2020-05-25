import React, { useState } from 'react';
import { ThemeProvider } from '@material-ui/core';

import { CartInfo } from './components/CartInfo/CartInfo';
import { InfoSidebar } from './components/Sidebar/InfoSidebar';
import { Menu } from './components/Menu/Menu';
import { MouseEventTooltip } from './components/VisualisationTooltip/MouseEventTooltip';
import { SelectionEventTooltip } from './components/VisualisationTooltip/SelectionEventTooltip';
import { theme } from './config/theme.config';
import { CameraControl } from './components/CameraControl/CameraControl';

interface UIProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onZoomFit: () => void;
}

export const UI: React.FC<UIProps> = ({ children, onZoomIn, onZoomOut, onZoomFit }) => {
  const [isCartInfoVisible, setIsCartInfoVisible] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <main className={'MainContainer'}>
        <Menu />
        <div className={'CanvasWrapper'}>
          {children}
          <MouseEventTooltip />
          <SelectionEventTooltip debug={true} centerPosition={{ x: -2, y: -18 }} />
          <CameraControl onZoomIn={onZoomIn} onZoomOut={onZoomOut} onZoomFit={onZoomFit} />
        </div>
        <InfoSidebar setIsCartInfoVisible={setIsCartInfoVisible} />
        {isCartInfoVisible && <CartInfo setIsCartInfoVisible={setIsCartInfoVisible} />}
      </main>
    </ThemeProvider>
  );
};