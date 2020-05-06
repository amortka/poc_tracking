import { AppState } from '../main.store'
import { createSelector } from 'reselect'
import { VisualisationState } from './visualisation.model'
import { IWall } from '../../models/main.model'

export class VisualisationSelectors {
  public static state = createSelector(
    (state: AppState) => state.visualisation,
    (visualisation) => visualisation
  )

  public static walls = createSelector(VisualisationSelectors.state, (state: VisualisationState) => state.walls)

  public static points = createSelector(VisualisationSelectors.state, (state: VisualisationState) => state.points)

  public static sensors = createSelector(VisualisationSelectors.state, (state: VisualisationState) => state.sensors)

  public static objects = createSelector(VisualisationSelectors.state, (state: VisualisationState) => state.objects)

  public static paths = createSelector(VisualisationSelectors.state, (state: VisualisationState) => state.paths)

  public static rooms = createSelector(VisualisationSelectors.state, (state: VisualisationState) => state.rooms)

  public static getWallsWithPointCoordinates = createSelector(
    [VisualisationSelectors.walls, VisualisationSelectors.points],
    (walls, points) => {
      return Object.values(walls).map((wall) => ({ ...wall, start: points[wall.start], end: points[wall.end] }))
    }
  )
}
