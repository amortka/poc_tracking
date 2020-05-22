import React, { useState } from 'react';
import { ThemeProvider } from '@material-ui/core';

import { CartInfo } from './components/CartInfo/CartInfo';
import { InfoSidebar } from './components/Sidebar/InfoSidebar';
import { Menu } from './components/Menu/Menu';
import { MouseEventTooltip } from './components/VisualisationTooltip/MouseEventTooltip';
import { SelectionEventTooltip } from './components/VisualisationTooltip/SelectionEventTooltip';
import { theme } from './config/theme.config';
import { CameraControl } from './components/CameraControl/CameraControl';

export const UI: React.FC = ({ children }) => {
  const [isCartInfoVisible, setIsCartInfoVisible] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <main className={'MainContainer'}>
        <Menu />
        <div className={'CanvasWrapper'}>
          {children}
          <MouseEventTooltip />
          <SelectionEventTooltip debug={true} centerPosition={{ x: -2, y: -18 }} />
          <CameraControl />
        </div>
        <InfoSidebar setIsCartInfoVisible={setIsCartInfoVisible} />
        {isCartInfoVisible && <CartInfo setIsCartInfoVisible={setIsCartInfoVisible} />}
      </main>
    </ThemeProvider>
  );
};
