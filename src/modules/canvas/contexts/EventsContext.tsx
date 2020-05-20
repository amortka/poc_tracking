import React, { useContext, useCallback } from 'react';
import { IPath, IRoom, ISensor, IWall } from '../../../app.model';
import { EventType, IObjectWithPointsCoordinates, ObjectType } from '../canvas.model';

export type EventContextObject = IWall | ISensor | IObjectWithPointsCoordinates | IRoom | IPath;

export interface IEventContextPayload {
  object: EventContextObject;
  objectType: ObjectType;
  type: EventType;
}

export class EventsContextService {
  private subscriptions: Array<(IEventContextPayload) => void> = [];

  currentEvent: IEventContextPayload;

  registerCallback(cta: (IEventContextPayload) => void): void {
    this.subscriptions.push(cta);
  }

  unregisterCallback(cta: (IEventContextPayload) => void): void {
    this.subscriptions = this.subscriptions.filter((f) => f === cta);
  }

  emitNewEvent(payload: IEventContextPayload) {
    this.currentEvent = payload;
    this.subscriptions.forEach((f) => f(payload));
  }
}

export const eventsContextService = new EventsContextService();

export const EventsContext = React.createContext<EventsContextService>(null);

export const EventsContextProvider: React.FC = ({ children }) => (
  <EventsContext.Provider value={eventsContextService}>{children}</EventsContext.Provider>
);

export function useEmitEvent(object: EventContextObject, objectType: ObjectType, dependents?: any[]) {
  const eventsContext = useContext(EventsContext);

  const emitEvent = useCallback((type) => {
    eventsContext.emitNewEvent({ type, object, objectType });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependents);

  return emitEvent;
}
