import React, { useContext } from 'react'
import * as THREE from 'three'
import { ThemeContext } from '../contexts/ThemeContext'

const fontJson = require('three/examples/fonts/helvetiker_regular.typeface.json')
const font = new THREE.Font(fontJson)

const textGeometryDefault: THREE.TextGeometryParameters = {
  font: font,
  size: 0.2,
  height: 0,
  curveSegments: 12,
  bevelEnabled: false,
}

const textMaterialDefault: THREE.MeshBasicMaterialParameters = {
  // transparent: false,
  // opacity: 0.4,
  side: THREE.DoubleSide,
}

interface TextProps {
  label: string
  position: THREE.Vector3
  geometryConfig?: Partial<THREE.TextGeometryParameters>
  materialConfig?: Partial<THREE.MeshBasicMaterialParameters>
}

export const Text: React.FC<TextProps> = React.memo(
  ({ label, position, geometryConfig = textGeometryDefault, materialConfig = textMaterialDefault }) => {
    const theme = useContext(ThemeContext)
    const textGeometryConfig: THREE.TextGeometryParameters = { ...textGeometryDefault, ...geometryConfig }
    const textMaterialConfig: THREE.MeshBasicMaterialParameters = {
      ...textMaterialDefault,
      color: theme.text.color,
      ...materialConfig,
    }

    const textG = new THREE.TextGeometry(label, textGeometryConfig).center()

    return (
      <mesh position={position} geometry={textG}>
        <meshBasicMaterial args={[textMaterialConfig]} />
      </mesh>
    )
  }
)
