import React, { useRef } from 'react';
import { useFrame, useThree } from 'react-three-fiber';
import { RendererStats } from '../libs/ThreexRenderStats/threex.renderstats';
import * as Stats from 'stats.js';
import { isProduction } from '../../../utils/env.utils';

const initRendererStats = () => {
  const rendererStats = new RendererStats();
  rendererStats.domElement.style.position = 'fixed';
  rendererStats.domElement.style.left = '0px';
  rendererStats.domElement.style.bottom = '0px';
  document.body.appendChild(rendererStats.domElement);
  return rendererStats;
};

const initStats = () => {
  const stats = new (Stats as any)();
  stats.showPanel(0);
  document.body.appendChild(stats.dom);
  return stats;
};

export const ThreeMonitor: React.FC<{ debug: boolean }> = React.memo(({ debug }) => {
  const { gl: renderer } = useThree();

  const stats = useRef(debug ? initStats() : null);
  const rendererStats = useRef(debug ? initRendererStats() : null);

  useFrame(() => {
    if (!debug) return;
    rendererStats.current?.update(renderer);
    stats.current?.begin();
    stats.current?.end();
  });

  return <></>;
});
