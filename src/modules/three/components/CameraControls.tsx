import React, { useEffect } from 'react'
import { extend, ReactThreeFiber, useFrame, useResource, useThree } from 'react-three-fiber'
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
    ;(camera as THREE.OrthographicCamera).zoom = 30
    camera.updateProjectionMatrix()
  }, [])

  useFrame(() => controls.update())

  return (
    <orbitControls
      ref={ref}
      args={[camera, gl.domElement]}
      enableDamping
      minDistance={10}
      maxDistance={100}
      maxPolarAngle={Math.PI / 2.2}
      minZoom={20}
      maxZoom={50}
      dampingFactor={0.05}
    />
  )
}
