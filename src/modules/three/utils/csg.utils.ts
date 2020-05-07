import * as THREE from 'three'

const ThreeBSP = require('three-js-csg')(THREE)

export class CsgUtils {
  static subtract(targetG: THREE.Mesh, objectG: THREE.Mesh): THREE.Mesh {
    const tBSP = new ThreeBSP(targetG)
    const oBSP = new ThreeBSP(objectG)

    return tBSP.subtract(oBSP).toMesh()
  }
}
