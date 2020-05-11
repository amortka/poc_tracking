import React, { useMemo } from 'react'
import { WallD3 } from './WallD3'
import { IVisualization } from '../../../../models/main.model'
import { WallsUtils } from './Walls.utils'
import { WallD2 } from './WallD2'
import { VisualizationType } from '../../canvas.model'

interface WallsProps extends Pick<IVisualization, 'walls' | 'points' | 'rooms'> {
  type: VisualizationType
}

export const Walls: React.FC<WallsProps> = React.memo(({ walls, points, type }) => {
  let renderWalls
  switch (type) {
    case VisualizationType.D3:
      renderWalls = useMemo(
        () => WallsUtils.getWallsWithCoordinates(walls, points).map((w, i) => <WallD3 key={i} {...w} />),
        [walls, points]
      )
      break
    case VisualizationType.D2:
      renderWalls = useMemo(
        () => WallsUtils.getWallsWithCoordinates(walls, points).map((w, i) => <WallD2 key={i} {...w} />),
        [walls, points]
      )
      break
  }

  return <React.Fragment>{renderWalls}</React.Fragment>
})
