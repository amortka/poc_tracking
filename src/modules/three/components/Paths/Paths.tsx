import React, { useMemo } from 'react'
import { IVisualisation } from '../../../../models/main.model'
import { PathsUtils } from './Paths.utils'
import { PathsLine } from './PathsLine'

interface WallsProps extends Pick<IVisualisation, 'paths' | 'points'> {}

export const Paths: React.FC<WallsProps> = React.memo(({ paths, points }) => {
  const renderObjects = useMemo(
    () => PathsUtils.getPathWithCoordinates(paths, points).map((o, i) => <PathsLine key={i} {...o} />),
    [paths, points]
  )

  return <React.Fragment>{renderObjects}</React.Fragment>
})
