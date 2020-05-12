import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export function useMouseMove(): [{ x: number; y: number }, Dispatch<SetStateAction<boolean>>] {
  const [mouseCoordinates, setMouseCoordinates] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [trackMouse, setTrackMouse] = useState<boolean>(false);

  useEffect(() => {
    if (!trackMouse) return;
    const mouseMoveEventListener = (e: MouseEvent) => setMouseCoordinates({ x: e.x, y: e.y });
    window.addEventListener('mousemove', mouseMoveEventListener);
    return () => window.removeEventListener('mousemove', mouseMoveEventListener);
  }, [trackMouse]);

  return [mouseCoordinates, setTrackMouse];
}
