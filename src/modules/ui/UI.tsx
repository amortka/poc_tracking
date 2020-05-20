import React, { useState } from 'react';
import { Menu } from './components/Menu/Menu';
import { InfoSidebar } from './components/Sidebar/InfoSidebar';
import { CartInfo } from './components/CartInfo/CartInfo';
import { MouseEventTooltip } from './components/VisualisationTooltip/MouseEventTooltip';
import { SelectionEventTooltip } from './components/VisualisationTooltip/SelectionEventTooltip';

export const UI: React.FC = ({ children }) => {
  const [isCartInfoVisible, setIsCartInfoVisible] = useState(false);
  const events = null;
  const selection = null;

  return (
    <main className={'MainContainer'}>
      <Menu />
      <div className={'CanvasWrapper'}>
        {children}
        <MouseEventTooltip events={events} />
        <SelectionEventTooltip selection={selection} debug={true} centerPosition={{ x: -2, y: -18 }} />
      </div>
      <InfoSidebar setIsCartInfoVisible={setIsCartInfoVisible} />
      {isCartInfoVisible && <CartInfo setIsCartInfoVisible={setIsCartInfoVisible} />}
    </main>
  );
};
