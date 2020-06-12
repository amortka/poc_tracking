import React from 'react';
import { AvTimer, Battery80, SkipNext, Speed } from '@material-ui/icons';

import { GridBoxes } from '../GridBoxes/GridBoxes';
import { GridBoxItem } from '../GridBoxes/GridBox';
import { useFinishRouteCounter, useNextStationCounter } from './card-stats.hooks';

function useCardConfig(): Array<GridBoxItem> {
  const finishRouteCounter = useFinishRouteCounter();
  const nextStationCounter = useNextStationCounter();

  const cartDetailsConfig: Array<GridBoxItem> = [
    {
      name: 'Battery',
      icon: <Battery80 />,
      value: '75%',
    },
    {
      name: 'Average speed',
      icon: <Speed />,
      value: '5 km/h',
    },
    {
      name: 'Finish time',
      icon: <AvTimer />,
      value: finishRouteCounter,
      floatPoint: 0,
      affix: 'sec',
    },
    {
      name: 'Next stop in',
      icon: <SkipNext />,
      value: nextStationCounter,
      floatPoint: 0,
      affix: 'sec',
    },
  ];

  return cartDetailsConfig;
}

interface CartStatsProps {}

export const CartStats: React.FC<CartStatsProps> = React.memo(() => {
  const cartStats = useCardConfig();
  return <GridBoxes items={cartStats} />;
});
