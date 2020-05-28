import React, { useMemo } from 'react';
import { MockedBackend } from './MockedBackend';
import { RealBackend } from './RealBackend';
import { useSelector } from 'react-redux';
import { isRealData } from '../../store/ui/ui.selectors';

export const ServerHandler: React.FC = ({ children }) => {
  const isDefaultRealBackend = useSelector(isRealData);

  const SelectBackend = useMemo(() => {
    return isDefaultRealBackend ? RealBackend : MockedBackend;
  }, [isDefaultRealBackend]);

  return (
    <React.Fragment>
      <SelectBackend />
      {children}
    </React.Fragment>
  );
};
