import { DependencyList, useEffect, useMemo, useState } from 'react';

export function useMemoDistinct<T, W>(
  factory: () => T,
  deps: W & DependencyList,
  compare: (prev: W | undefined, next: W) => boolean
): T {
  const [depsState, setDepsState] = useState(deps);

  useEffect(
    () => {
      if (!compare(depsState, deps)) {
        setDepsState(deps);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [...deps]
  );

  return useMemo(factory, [...depsState]);
}
