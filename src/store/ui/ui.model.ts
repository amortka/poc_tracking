export enum UiAction {
  PENDING = '@@ui/PENDING',
}

export interface UiState {
  readonly isPending: boolean;
}
