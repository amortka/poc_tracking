import { action } from 'typesafe-actions';
import { TooltipAction } from './tooltips.model';
import { Dictionary } from '../../app.model';
import { IMouseEventPayload, ISelectionData } from '../../modules/canvas/canvas.model';

export const tooltipActions = {
  setMouseEvent: (payload: IMouseEventPayload) => action(TooltipAction.SET_MOUSE_DATA, payload),
  setSelectionData: (payload: Dictionary<ISelectionData>) => action(TooltipAction.SET_SELECTION_DATA, payload),
  clearSelectionSelected: () => action(TooltipAction.CLEAR_SELECTION_SELECTED),
};
