import React, { useMemo } from 'react'
import { WallNormal } from './WallNormal'
import { IVisualisation } from '../../../../models/main.model'
import { WallsUtils } from './Walls.utils'
import { WallLine } from './WallLine'

export enum WallType {
  LINE = 'line',
  NORMAL = 'normal',
}

interface WallsProps extends Pick<IVisualisation, 'walls' | 'points' | 'rooms'> {
  type?: WallType
}

export const Walls: React.FC<WallsProps> = React.memo(({ walls, points, type = WallType.NORMAL }) => {
  let renderWalls
  switch (type) {
    case WallType.NORMAL:
      renderWalls = useMemo(
        () => WallsUtils.getWallsWithCoordinates(walls, points).map((w, i) => <WallNormal key={i} {...w} />),
        [walls, points]
      )
      break
    case WallType.LINE:
      renderWalls = useMemo(
        () => WallsUtils.getWallsWithCoordinates(walls, points).map((w, i) => <WallLine key={i} {...w} />),
        [walls, points]
      )
      break
  }

  return <React.Fragment>{renderWalls}</React.Fragment>
})
