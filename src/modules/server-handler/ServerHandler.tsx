import React from 'react';
import { useSelector } from 'react-redux';

import { MockedBackend } from './MockedBackend';
import { RealBackend } from './RealBackend';
import { UiSelectors } from '../../store/ui/ui.selectors';

export const ServerHandler: React.FC = React.memo(() => {
  const isRealBackendEnabled = useSelector(UiSelectors.isRealData);

  return (
    <>
      <MockedBackend />
      {isRealBackendEnabled && <RealBackend />}
    </>
  );
});
