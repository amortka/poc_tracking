import { Query } from '@datorama/akita'
import { VisualisationStore, VisualisationState, visualisationStore } from './visualisation.store'
import { distinctUntilObjectChanged } from '../../utils/rxjs/distinctUntilObjectChanged.pipe'
import { map, tap } from 'rxjs/operators'
import { IWall } from '../../models/main.model'

export class VisualisationQuery extends Query<VisualisationState> {
  state$ = this.select((state) => state)

  wallsWithPointsCoordinates$ = this.select(['walls', 'points']).pipe(
    distinctUntilObjectChanged(),
    map(({ walls, points }) => {
      return Object.values(walls).map((wall) => {
        const w: IWall = wall as IWall
        return { ...w, start: points[w.start], end: points[w.end] }
      })
    })
  )

  constructor(protected store: VisualisationStore) {
    super(store)
  }
}

export const visualisationQuery = new VisualisationQuery(visualisationStore)
