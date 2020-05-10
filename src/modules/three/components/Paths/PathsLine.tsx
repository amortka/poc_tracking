import * as THREE from 'three'
import React, { useContext, useEffect, useMemo, useRef } from 'react'
import { IPathWithPointsCoordinates } from '../../canvas.model'
import { LineUtils } from '../../utils/line.utils'
import { ThemeContext } from '../../contexts/ThemeContext'

export interface WallProps extends IPathWithPointsCoordinates {}

export const PathsLine: React.FC<WallProps> = React.memo(({ points, tag }) => {
  const lineRef = useRef<THREE.Line>(null)
  const fromGround = useRef(0.02)

  const theme = useContext(ThemeContext)
  const pointsV = LineUtils.getPathPointsFromPointCoordinates(points, fromGround.current)

  const lineG = useMemo(() => new THREE.BufferGeometry().setFromPoints(pointsV), [pointsV])

  useEffect(() => {
    lineRef?.current.computeLineDistances()
  }, [lineRef.current, points])

  return (
    // @ts-ignore
    <line ref={lineRef} geometry={lineG}>
      <lineDashedMaterial
        attach="material"
        color={theme.objects.D2.line}
        dashSize={theme.paths.D2.dashSize}
        gapSize={theme.paths.D2.gapSize}
        scale={1}
      />
    </line>
  )
})
