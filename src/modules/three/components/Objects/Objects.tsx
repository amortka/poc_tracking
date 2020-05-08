import React, { useMemo } from 'react'
import { IVisualisation } from '../../../../models/main.model'
import { VisualisationType } from '../../canvas.model'
import { ObjectsUtils } from './Objects.utils'
import { ObjectNormal } from './ObjectNormal'
import { ObjectLine } from './ObjectLine'

interface WallsProps extends Pick<IVisualisation, 'objects' | 'points'> {
  type: VisualisationType
}

export const Objects: React.FC<WallsProps> = React.memo(({ objects, points, type }) => {
  let renderObjects
  switch (type) {
    case VisualisationType.D3:
      renderObjects = useMemo(
        () => ObjectsUtils.getObjectsWithCoordinates(objects, points).map((o, i) => <ObjectNormal key={i} {...o} />),
        [objects, points]
      )
      break
    case VisualisationType.D2:
      renderObjects = useMemo(
        () => ObjectsUtils.getObjectsWithCoordinates(objects, points).map((o, i) => <ObjectLine key={i} {...o} />),
        [objects, points]
      )
      break
  }

  return <React.Fragment>{renderObjects}</React.Fragment>
})
