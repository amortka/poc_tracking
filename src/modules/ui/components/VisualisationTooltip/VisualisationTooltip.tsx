import React from 'react';
import { MouseEventTooltip } from './MouseEventTooltip';
import { SelectionEventTooltip } from './SelectionEventTooltip';

interface VisualisationTooltipProps {
  canvasWrapperBox: DOMRect;
}
export const VisualisationTooltip: React.FC<VisualisationTooltipProps> = React.memo(({ canvasWrapperBox }) => {
  return (
    <>
      <MouseEventTooltip canvasWrapperBox={canvasWrapperBox} />
      <SelectionEventTooltip debug={true} canvasWrapperBox={canvasWrapperBox} centerPosition={{ x: -3, y: -18 }} />
    </>
  );
});
