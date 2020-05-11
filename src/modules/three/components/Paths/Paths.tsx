import React, { useMemo } from 'react'
import { IVisualization } from '../../../../models/main.model'
import { PathsUtils } from './Paths.utils'
import { PathsLine } from './PathsLine'

interface WallsProps extends Pick<IVisualization, 'paths' | 'points'> {}

export const Paths: React.FC<WallsProps> = React.memo(({ paths, points }) => {
  const renderObjects = useMemo(
    () => PathsUtils.getPathWithCoordinates(paths, points).map((o, i) => <PathsLine key={i} {...o} />),
    [paths, points]
  )

  return <React.Fragment>{renderObjects}</React.Fragment>
})
