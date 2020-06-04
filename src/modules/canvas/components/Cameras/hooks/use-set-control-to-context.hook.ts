import { Dispatch, useEffect } from 'react';

import { OrbitControls } from '../../../libs/OrbitControls/OrbitControls';

export function useSetControlToContext(controls: OrbitControls, setOrbitControl: Dispatch<OrbitControls>) {
  useEffect(() => {
    if (!controls) return;
    setOrbitControl(controls);
  }, [controls, setOrbitControl]);
}
