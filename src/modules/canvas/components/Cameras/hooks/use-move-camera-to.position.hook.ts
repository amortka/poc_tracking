import { useContext, useEffect, useMemo } from 'react';
import { Vector2 } from 'three';
import { CameraControlContext } from '../../../contexts/CameraContext';

export function useMoveCameraToPosition(enable: boolean, position: Vector2): void {
  const [cameraControl] = useContext(CameraControlContext);

  const cameraObject = cameraControl?.object || {};

  const cameraRight = useMemo(() => {
    if (!cameraObject.right) return;
    return (cameraObject.right / cameraObject.zoom) * 0.7;
  }, [cameraObject.right, cameraObject.zoom]);

  useEffect(() => {
    if (!cameraControl || !enable || !position) return;
    cameraControl.moveTo(position.x + cameraRight, 0);
  }, [cameraControl, enable, position, cameraRight]);
}
