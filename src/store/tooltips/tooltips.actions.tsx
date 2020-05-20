import { action } from 'typesafe-actions';
import { TooltipAction } from './tooltips.model';
import { Dictionary, IMouseEventPayload, ISelectionData } from '../../app.model';

export const tooltipActions = {
  setMouseEvent: (payload: IMouseEventPayload) => action(TooltipAction.SET_MOUSE_DATA, payload),
  setSelectionData: (payload: Dictionary<ISelectionData>) => action(TooltipAction.SET_SELECTION_DATA, payload),
};
