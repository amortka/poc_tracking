import { action } from 'typesafe-actions';
import { TooltipAction } from './tooltips.model';
import { Dictionary, IMouseEventPayload, ISelectionData, ISelection } from '../../app.model';

export const tooltipActions = {
  setMouseEvent: (payload: IMouseEventPayload) => action(TooltipAction.SET_MOUSE_DATA, payload),
  setSelectionData: (payload: Dictionary<ISelectionData>) => action(TooltipAction.SET_SELECTION_DATA, payload),
  clearSelectionSelected: () => action(TooltipAction.CLEAR_SELECTION_SELECTED),
};
