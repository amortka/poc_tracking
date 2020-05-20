import { useCallback } from 'react';
import { EventType, ObjectType } from '../canvas.model';
import { EventContextObject, useEmitEvent } from '../contexts/EventsContext';

export const useMouseEvent = (emitEventConfig: EventContextObject) => {
  const emitEvent = useEmitEvent(emitEventConfig, ObjectType.OBJECT, []);

  const handleClick = useCallback((e) => emitEvent(EventType.MOUSE_CLICK), [emitEvent]);
  const handlePointerOver = useCallback((e) => emitEvent(EventType.MOUSE_IN), [emitEvent]);
  const handlePointerOut = useCallback((e) => emitEvent(EventType.MOUSE_OUT), [emitEvent]);

  return [handleClick, handlePointerOver, handlePointerOut];
};
