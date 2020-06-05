import { useContext, useEffect, useMemo, useRef } from 'react';
import { Vector2 } from 'three';
import { CameraControlContext } from '../../../contexts/CameraContext';
import { useThree } from 'react-three-fiber';

export function useMoveCameraToPosition(enable: boolean, position: Vector2): void {
  const [cameraControl] = useContext(CameraControlContext);
  const { camera } = useThree();
  const moveWhenPositionChange = useRef<boolean>(true);

  // @ts-ignore
  const cameraZoom = camera && camera.zoom;
  const cameraObject = cameraControl?.object || {};

  const cameraRight = useMemo(() => {
    if (!cameraObject.right) return;
    return (cameraObject.right / cameraObject.zoom) * 0.7;
  }, [cameraObject.right, cameraObject.zoom]);

  useEffect(() => {
    if (!moveWhenPositionChange.current) return;
    if (!cameraControl || !enable || !position) return;

    cameraControl.moveTo(position.x + cameraRight, 0);
  }, [cameraControl, enable, position, cameraRight]);

  useEffect(() => {
    if (!cameraControl) return;
    if (cameraZoom === cameraControl.maxZoom) {
      moveWhenPositionChange.current = true;
      cameraControl.enablePan = false;
      cameraControl.dampingFactor = 1;
    } else {
      moveWhenPositionChange.current = false;
      cameraControl.enablePan = true;
      cameraControl.dampingFactor = 0.15;
    }
  }, [cameraZoom, cameraControl]);
}
