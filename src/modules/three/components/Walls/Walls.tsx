import React, { useMemo } from 'react'
import { WallNormal } from './WallNormal'
import { IVisualization } from '../../../../models/main.model'
import { WallsUtils } from './Walls.utils'
import { WallLine } from './WallLine'
import { VisualizationType } from '../../canvas.model'

interface WallsProps extends Pick<IVisualization, 'walls' | 'points' | 'rooms'> {
  type: VisualizationType
}

export const Walls: React.FC<WallsProps> = React.memo(({ walls, points, type }) => {
  let renderWalls
  switch (type) {
    case VisualizationType.D3:
      renderWalls = useMemo(
        () => WallsUtils.getWallsWithCoordinates(walls, points).map((w, i) => <WallNormal key={i} {...w} />),
        [walls, points]
      )
      break
    case VisualizationType.D2:
      renderWalls = useMemo(
        () => WallsUtils.getWallsWithCoordinates(walls, points).map((w, i) => <WallLine key={i} {...w} />),
        [walls, points]
      )
      break
  }

  return <React.Fragment>{renderWalls}</React.Fragment>
})
