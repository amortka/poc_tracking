import React, { useMemo } from 'react'
import { WallNormal } from './WallNormal'
import { IVisualisation } from '../../../../models/main.model'
import { WallsUtils } from './Walls.utils'
import { WallLine } from './WallLine'
import { VisualisationType } from '../../canvas.model'

interface WallsProps extends Pick<IVisualisation, 'walls' | 'points' | 'rooms'> {
  type: VisualisationType
}

export const Walls: React.FC<WallsProps> = React.memo(({ walls, points, type }) => {
  let renderWalls
  switch (type) {
    case VisualisationType.D3:
      renderWalls = useMemo(
        () => WallsUtils.getWallsWithCoordinates(walls, points).map((w, i) => <WallNormal key={i} {...w} />),
        [walls, points]
      )
      break
    case VisualisationType.D2:
      renderWalls = useMemo(
        () => WallsUtils.getWallsWithCoordinates(walls, points).map((w, i) => <WallLine key={i} {...w} />),
        [walls, points]
      )
      break
  }

  return <React.Fragment>{renderWalls}</React.Fragment>
})
