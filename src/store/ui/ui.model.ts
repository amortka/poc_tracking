export enum UiAction {
  PENDING = '@@ui/PENDING',
  IS_D3 = '@@ui/IS_D3',
}

export interface UiState {
  readonly isPending: boolean;
  readonly isD3: boolean;
}
