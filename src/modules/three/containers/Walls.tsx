import React, { useMemo } from 'react'
import { Wall } from '../components/Wall'
import { IWallWithPointsCoordinates } from '../canvas.model'

interface WallsProps {
  walls: IWallWithPointsCoordinates[]
}

export const Walls: React.FC<WallsProps> = ({ walls }) => {
  const renderWalls = useMemo(() => walls?.map((w, i) => <Wall key={i} {...w} />), [walls])

  return <React.Fragment>{renderWalls}</React.Fragment>
}
