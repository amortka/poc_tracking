import React, { useEffect, useState } from 'react';
import { AcUnit, Opacity, Speed, Waves } from '@material-ui/icons';

import { GridBoxes } from '../GridBoxes/GridBoxes';
import { GridBoxItem } from '../GridBoxes/GridBox';
import { IRoute } from '../../../canvas/canvas.model';
import { IRouteServiceCallback } from '../../../canvas-manager/services/routes-progress.service';
import { IRouteWithData } from '../../../../app.model';
import { IVehicleState } from '../../../../store/vehicles/vehicles.model';
import { RoutesProgressHandlerService } from '../../../canvas-manager/services/routes-progress-handler.service';

function useCardDetailsConfig(routeId: string, vehicleState: IVehicleState): Array<GridBoxItem> {
  const [routesState, setRoutesState] = useState<IRoute>(null);
  const { ambientPressure, humidity, temperature } = vehicleState || {};

  useEffect(() => {
    const cta: IRouteServiceCallback = (routeId, data) => setRoutesState(data);
    const routeService = RoutesProgressHandlerService.getInstance().routesServices.get(routeId);
    routeService.registerCallback(cta);
    return routeService.unregisterCallback(cta);
  }, [routeId]);

  const cartDetailsConfig = [
    {
      name: 'Ambient Pressure',
      icon: <Waves />,
      value: ambientPressure,
      floatPoint: 0,
      affix: 'hPa',
    },
    {
      name: 'Humidity',
      icon: <Opacity />,
      value: humidity,
      floatPoint: 0,
      affix: '%',
    },
    {
      name: 'Temperature',
      icon: <AcUnit />,
      value: temperature,
      floatPoint: 1,
      affix: '&#x2103;',
    },
    {
      name: 'Distance',
      icon: <Speed />,
      value: routesState?.progress * 100,
      floatPoint: 0,
      affix: '%',
    },
  ];

  return cartDetailsConfig;
}

interface StatsCardsProps {
  routeData: IRouteWithData;
  routeId: string;
}

export const StatsCards: React.FC<StatsCardsProps> = React.memo(({ routeId, routeData }) => {
  const cartDetailsConfig = useCardDetailsConfig(routeId, routeData?.vehicle);

  return <GridBoxes items={cartDetailsConfig} dark={true} />;
});
