import React, { useCallback, useContext } from 'react';
import { IMouseEventPayload, MouseEventContextObject, ObjectType } from '../canvas.model';

export class MouseEventsContextService {
  private subscriptions: Array<(IEventContextPayload) => void> = [];

  currentEvent: IMouseEventPayload;

  registerCallback(cta: (IEventContextPayload) => void): void {
    this.subscriptions.push(cta);
  }

  unregisterCallback(cta: (IEventContextPayload) => void): void {
    this.subscriptions = this.subscriptions.filter((f) => f === cta);
  }

  emitNewEvent(payload: IMouseEventPayload) {
    this.currentEvent = payload;
    this.subscriptions.forEach((f) => f(payload));
  }
}

export const mouseEventsContextService = new MouseEventsContextService();

export const MouseEventsContext = React.createContext<MouseEventsContextService>(null);

export const MouseEventsContextProvider: React.FC = ({ children }) => (
  <MouseEventsContext.Provider value={mouseEventsContextService}>{children}</MouseEventsContext.Provider>
);

export function useEmitMouseEvent(object: MouseEventContextObject, objectType: ObjectType, dependents?: any[]) {
  const eventsContext = useContext(MouseEventsContext);

  const emitEvent = useCallback((type) => {
    eventsContext.emitNewEvent({ type, object, objectType });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependents);

  return emitEvent;
}
