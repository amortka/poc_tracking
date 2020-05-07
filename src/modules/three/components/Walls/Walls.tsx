import React, { useMemo } from 'react'
import { IWallWithPointsCoordinates } from '../../canvas.model'
import { Wall } from './Wall'

interface WallsProps {
  walls: IWallWithPointsCoordinates[]
}

export const Walls: React.FC<WallsProps> = React.memo(({ walls }) => {
  const renderWalls = useMemo(() => walls?.map((w, i) => <Wall key={i} {...w} />), [walls])

  return <React.Fragment>{renderWalls}</React.Fragment>
})
