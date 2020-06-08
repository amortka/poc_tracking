import React, { useMemo } from 'react';

import { GridBoxes } from '../GridBoxes/GridBoxes';
import { AcUnit, Opacity, Speed, Waves } from '@material-ui/icons';
import { IRouteWithData } from '../../../../app.model';

const cartDetailsConfig = [
  {
    name: 'Ambient Pressure',
    icon: <Waves />,
    value: null,
    floatPoint: 0,
  },
  {
    name: 'Humidity',
    icon: <Opacity />,
    value: null,
    floatPoint: 0,
  },
  {
    name: 'Temperature',
    icon: <AcUnit />,
    value: null,
    floatPoint: 1,
  },
  {
    name: 'Velocity',
    icon: <Speed />,
    value: null,
    floatPoint: 2,
  },
];

interface StatsCardsProps {
  data: IRouteWithData;
}

export const StatsCards: React.FC<StatsCardsProps> = React.memo(({ data }) => {
  const { ambientPressure, humidity, velocity, temperature } = data?.vehicle || {};

  const stats = [ambientPressure, humidity, temperature, velocity];

  const cartDetails = useMemo(
    () => cartDetailsConfig.map((item, i) => ({ ...item, value: (+stats[i]).toFixed(item.floatPoint) })),
    [stats]
  );
  return <GridBoxes items={cartDetails} dark={true} />;
});
