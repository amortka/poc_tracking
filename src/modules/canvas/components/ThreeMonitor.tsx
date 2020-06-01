import React from 'react';
import { useFrame, useThree } from 'react-three-fiber';
import { RendererStats } from '../libs/ThreexRenderStats/threex.renderstats';
import * as Stats from 'stats.js';

const rendererStats = new RendererStats();
rendererStats.domElement.style.position = 'fixed';
rendererStats.domElement.style.left = '0px';
rendererStats.domElement.style.bottom = '0px';
document.body.appendChild(rendererStats.domElement);

const stats = new (Stats as any)();
stats.showPanel(0);
document.body.appendChild(stats.dom);

export const ThreeMonitor: React.FC = React.memo(() => {
  const { gl: renderer } = useThree();

  useFrame(() => {
    rendererStats.update(renderer);
    stats.begin();
    stats.end();
  });

  return <></>;
});
