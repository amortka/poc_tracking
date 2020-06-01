export function isProduction(): boolean {
  return process.env.NODE_ENV === 'production';
}

export function isAppInitiallyUseRealBackend(): boolean {
  return process.env.REACT_APP_INITIALLY_USE_REAL_BACKEND === 'false' ? false : true;
}
