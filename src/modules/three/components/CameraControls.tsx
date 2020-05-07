import React, { useEffect } from 'react'
import { ReactThreeFiber, extend, useThree, useFrame, useResource } from 'react-three-fiber'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
extend({ OrbitControls })

declare global {
  namespace JSX {
    interface IntrinsicElements {
      orbitControls: ReactThreeFiber.Object3DNode<OrbitControls, typeof OrbitControls>
    }
  }
}

export const CameraControls: React.FC = () => {
  const [ref, controls] = useResource<OrbitControls>()
  const { camera, gl } = useThree()

  useEffect(() => {
    camera.position.set(10, 10, 10)
  }, [])

  useFrame(() => controls.update())

  return (
    <orbitControls
      ref={ref}
      args={[camera, gl.domElement]}
      enableDamping
      screenSpacePanning
      minDistance={10}
      maxDistance={100}
      maxPolarAngle={Math.PI / 2.2}
      dampingFactor={0.05}
    />
  )
}
