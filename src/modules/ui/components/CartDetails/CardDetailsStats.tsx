import React from 'react';

import { GridBoxes } from '../GridBoxes/GridBoxes';
import { AcUnit, Opacity, Speed, Waves } from '@material-ui/icons';
import { IRouteWithData } from '../../../../app.model';

const cartDetailsConfig = [
  {
    name: 'Ambient Pressure',
    icon: <Waves />,
    value: null,
  },
  {
    name: 'Humidity',
    icon: <Opacity />,
    value: null,
  },
  {
    name: 'Temperature',
    icon: <AcUnit />,
    value: null,
  },
  {
    name: 'Velocity',
    icon: <Speed />,
    value: null,
  },
];

interface StatsCardsProps {
  data: IRouteWithData;
}

export const StatsCards: React.FC<StatsCardsProps> = React.memo(({ data }) => {
  const { ambientPressure, humidity, velocity, temperature } = data?.vehicle || {};

  const stats = [ambientPressure, humidity, temperature, velocity];

  const cartDetails = cartDetailsConfig.map((item, i) => ({ ...item, value: stats[i] }));
  return <GridBoxes items={cartDetails} dark={true} />;
});
