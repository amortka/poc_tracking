import { useCallback } from 'react';
import { EventType, MouseEventContextObject, ObjectType } from '../canvas.model';
import { useEmitMouseEvent } from '../contexts/MouseEventsContext';

export const useMouseEvent = (emitEventConfig: MouseEventContextObject, objectType = ObjectType.OBJECT) => {
  const emitEvent = useEmitMouseEvent(emitEventConfig, objectType, []);

  const handleClick = useCallback(
    (e) => {
      e.stopPropagation();
      emitEvent(EventType.MOUSE_CLICK);
    },
    [emitEvent]
  );
  const handlePointerOver = useCallback(
    (e) => {
      // e.stopPropagation();
      emitEvent(EventType.MOUSE_IN);
    },
    [emitEvent]
  );
  const handlePointerOut = useCallback(
    (e) => {
      // e.stopPropagation();
      emitEvent(EventType.MOUSE_OUT);
    },
    [emitEvent]
  );

  return [handleClick, handlePointerOver, handlePointerOut];
};
