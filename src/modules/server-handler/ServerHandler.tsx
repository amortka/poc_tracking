import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { MockedBackend } from './MockedBackend';
import { RealBackend } from './RealBackend';
import { isRealData } from '../../store/ui/ui.selectors';

export const ServerHandler: React.FC = React.memo(() => {
  const isDefaultRealBackend = useSelector(isRealData);

  const SelectBackend = useMemo(() => {
    return isDefaultRealBackend ? RealBackend : MockedBackend;
  }, [isDefaultRealBackend]);

  return <SelectBackend />;
});
