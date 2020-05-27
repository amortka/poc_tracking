import { Dictionary, IMouseEventPayload, ISelection, ISelectionData } from '../../app.model';

export enum TooltipAction {
  SET_MOUSE_DATA = '@@tooltip/SET_MOUSE_DATA',
  SET_SELECTION_DATA = '@@tooltip/SET_SELECTION_DATA',
  SET_SELECTION_SELECTED = '@@tooltip/SET_SELECTION_SELECTED',
  CLEAR_SELECTION_SELECTED = '@@tooltip/CLEAR_SELECTION_SELECTED',
}

export interface TooltipState {
  selection: {
    selected: ISelection;
    data: Dictionary<ISelectionData>;
  };
  mouse: IMouseEventPayload;
}
