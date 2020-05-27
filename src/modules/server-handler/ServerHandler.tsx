import React, { useMemo } from 'react';
import { MockedBackend } from './MockedBackend';
import { RealBackend } from './RealBackend';

export const ServerHandler: React.FC = ({ children }) => {
  const isDefaultRealBackend = process.env.REACT_APP_DEFAULT_USE_REAL_BACKEND;

  const SelectBackend = useMemo(() => {
    return isDefaultRealBackend ? MockedBackend : RealBackend;
  }, [isDefaultRealBackend]);

  return <SelectBackend>{children}</SelectBackend>;
};
