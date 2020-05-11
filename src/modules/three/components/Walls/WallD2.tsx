import React, { useContext, useMemo } from 'react'
import * as THREE from 'three'
import { IPoint, IWall } from '../../../../models/main.model'
import { ThemeContext } from '../../contexts/ThemeContext'

interface WallProps extends Omit<IWall, 'start' | 'end'> {
  start: IPoint
  end: IPoint
}

export const WallD2: React.FC<WallProps> = React.memo(({ start, end, meta }) => {
  const theme = useContext(ThemeContext)

  const points = [
    useMemo(() => new THREE.Vector3(start.x, start.y, 0), [start.x, start.y]),
    useMemo(() => new THREE.Vector3(end.x, end.y, 0), [end.x, end.y]),
  ]

  const geometry = useMemo(() => new THREE.BufferGeometry().setFromPoints(points), [points])

  return (
    // @ts-ignore
    <line geometry={geometry}>
      <lineBasicMaterial attach="material" color={theme.walls.D2.line} />
    </line>
  )
})
