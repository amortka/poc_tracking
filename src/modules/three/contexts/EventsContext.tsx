import React, { useContext } from 'react';
import { IPath, IRoom, ISensor, IWall } from '../../../models/main.model';
import { IObjectWithPointsCoordinates } from '../canvas.model';

export enum EventType {
  MOUSE_IN = 'pointerin',
  MOUSE_OUT = 'pointerout',
  MOUSE_CLICK = 'click',
}

export enum ObjectType {
  OBJECT = 'OBJECT',
  PATH = 'PATH',
  SENSOR = 'SENSOR',
  WALL = 'WALL',
  VEHICLE = 'VEHICLE',
}

export type EventContextObject = IWall | ISensor | IObjectWithPointsCoordinates | IRoom | IPath;

export interface IEventContextPayload {
  // event?: PointerEvent;
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

export function useEmitEvent(object: EventContextObject, objectType: ObjectType) {
  const eventsContext = useContext(EventsContext);

  return (type: EventType) => {
    eventsContext.emitNewEvent({ type, object, objectType });
  };
}
