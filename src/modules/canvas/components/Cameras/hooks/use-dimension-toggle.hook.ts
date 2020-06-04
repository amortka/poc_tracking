import { useEffect } from 'react';

import { OrbitControls } from '../../../libs/OrbitControls/OrbitControls';

export function useDimensionToggle(isD3: boolean, controls: OrbitControls) {
  useEffect(() => {
    if (!controls) return;

    if (isD3) {
      controls.enableRotate = true;
      controls.update();
      controls.rotateTo(0.78, 0.79);
    } else {
      controls.enableRotate = false;
      controls.update();
      controls.rotateTo(0, 0);
    }
  }, [isD3, controls]);
}
