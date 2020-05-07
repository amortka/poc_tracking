import { Observable } from 'rxjs'
import { distinctUntilChanged } from 'rxjs/operators'

import { equal } from '../object.utils'

export const distinctUntilObjectChanged = (fn: (p: any, q: any) => boolean = (p: any, q: any) => equal(p, q)) => <T>(
  source: Observable<T>
) => {
  return source.pipe(distinctUntilChanged(fn))
}
