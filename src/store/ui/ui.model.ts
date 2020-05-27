export enum UiAction {
  PENDING = '@@ui/PENDING',
  IS_D3 = '@@ui/IS_D3',
  IS_REAL_DATA = '@@ui/IS_REAL_DATA',
}

export interface UiState {
  readonly isPending: boolean;
  readonly isD3: boolean;
  readonly isRealData: boolean;
}
