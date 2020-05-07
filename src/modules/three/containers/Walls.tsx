import React, { useMemo } from 'react'
import { useObservable } from 'rxjs-hooks'
import { visualisationQuery } from '../../../store/visualisation/visualisation.query'
import { Wall } from '../components/Wall'

interface WallsProps {}

export const Walls: React.FC = () => {
  const walls = useObservable(() => visualisationQuery.wallsWithPointsCoordinates$) || []

  const renderWalls = useMemo(() => walls.map((w, i) => <Wall key={i} {...w} />), [walls])

  return <React.Fragment>{renderWalls}</React.Fragment>
}
