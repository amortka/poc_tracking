import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useFrame, useResource, useThree } from 'react-three-fiber'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export const Camera: React.FC = () => {
  const { size, setDefaultCamera } = useThree()
  const [ref, camera] = useResource()
  const [controls, setControls] = useState<OrbitControls>(null)

  const { gl } = useThree()
  useEffect(() => {
    if (!camera) return
    setControls(new OrbitControls(camera, gl.domElement))
    camera?.position.set(20, 80, 40)
  }, [camera, gl.domElement])

  useEffect(() => {
    if (!controls) return

    controls.enableDamping = true // an animation loop is required when either damping or auto-rotation are enabled
    controls.dampingFactor = 0.05

    controls.screenSpacePanning = true

    controls.minDistance = 3
    controls.maxDistance = 100
    controls.maxPolarAngle = Math.PI / 2.2
  }, [controls])

  // #15929 (https://github.com/mrdoob/three.js/issues/15929)
  // The camera needs to be updated every frame
  // We give this frame a priority so that automatic rendering will be switched off right away
  useFrame(() => {
    // camera.lookAt(new THREE.Vector3(0, 0, 0))
    controls?.update()
    camera.updateMatrixWorld()
  })
  useLayoutEffect(() => void setDefaultCamera(ref.current), [ref, setDefaultCamera])

  return (
    <perspectiveCamera
      ref={ref}
      aspect={size.width / size.height}
      fov={100}
      position={[0, -10, 10]}
      onUpdate={(self) => self.updateProjectionMatrix()}
    />
  )
}
