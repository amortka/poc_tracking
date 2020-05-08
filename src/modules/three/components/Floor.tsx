import React, { useContext, useRef } from 'react'
import * as THREE from 'three'
import { ThemeContext } from '../contexts/ThemeContext'
import { VisualisationType } from '../canvas.model'

interface FloorProps {
  type: VisualisationType
}

export const Floor: React.FC<FloorProps> = ({ type }) => {
  const mesh = useRef<THREE.Mesh>()

  const theme = useContext(ThemeContext)

  console.log(theme, type, theme.floor[type])
  return (
    <mesh ref={mesh} position={[0, 0, -0.1]}>
      <planeBufferGeometry attach="geometry" args={[100, 100]} />
      <meshBasicMaterial side={THREE.DoubleSide} attach="material" color={theme.floor[type]} />
    </mesh>
  )
}
