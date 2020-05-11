import React, { useMemo } from 'react'
import { IVisualization } from '../../../../models/main.model'
import { VisualizationType } from '../../canvas.model'
import { ObjectsUtils } from './Objects.utils'
import { ObjectNormal } from './ObjectNormal'
import { ObjectLine } from './ObjectLine'

interface WallsProps extends Pick<IVisualization, 'objects' | 'points'> {
  type: VisualizationType
}

export const Objects: React.FC<WallsProps> = React.memo(({ objects, points, type }) => {
  let renderObjects
  switch (type) {
    case VisualizationType.D3:
      renderObjects = useMemo(
        () => ObjectsUtils.getObjectsWithCoordinates(objects, points).map((o, i) => <ObjectNormal key={i} {...o} />),
        [objects, points]
      )
      break
    case VisualizationType.D2:
      renderObjects = useMemo(
        () => ObjectsUtils.getObjectsWithCoordinates(objects, points).map((o, i) => <ObjectLine key={i} {...o} />),
        [objects, points]
      )
      break
  }

  return <React.Fragment>{renderObjects}</React.Fragment>
})
