import * as THREE from 'three'
import { IPoint } from '../../../models/main.model'
import { Vector2 } from 'three'

export class VectorUtils {
  static getNormalVectorToVector(v1: THREE.Vector2): THREE.Vector2 {
    return v1.clone().rotateAround(new THREE.Vector2(0, 0), Math.PI / 2)
  }

  static getShapeFromVectors(vectors: THREE.Vector2[], thickness: number): THREE.Shape {
    const shape = new THREE.Shape()

    if (vectors.length <= 1) return shape
    const result: THREE.Vector2[] = [
      ...this._getShapeFromVectors(vectors, thickness),
      ...(this._getShapeFromVectors(vectors.reverse(), 0) as THREE.Vector2[]),
    ]

    result.forEach((v, i) => {
      if (i === 0) {
        shape.moveTo(v.x, v.y)
      } else if (i === result.length - 1) {
        shape.lineTo(v.x, v.y)
        shape.lineTo(result[0].x, result[0].y)
      } else {
        shape.lineTo(v.x, v.y)
      }
    })

    return shape
  }

  private static _getShapeFromVectors(vectors: THREE.Vector2[], thickness: number): THREE.Vector2[] {
    const result: THREE.Vector2[] = []

    vectors.forEach((v, i) => {
      if (i === 0) {
        result.push(this.getVectorsMovedByThickness(vectors[i], vectors[i + 1], thickness)[0])
      } else if (0 < i && i <= vectors.length - 2) {
        const vector3 = this.getIntersectionOffTwoLines(
          this.getLineFromTwoVectors(this.getVectorsMovedByThickness(vectors[i - 1], vectors[i], thickness)),
          this.getLineFromTwoVectors(this.getVectorsMovedByThickness(vectors[i], vectors[i + 1], thickness))
        )
        result.push(new THREE.Vector2(vector3?.x, vector3?.y))
      } else if (i === vectors.length - 1) {
        result.push(this.getVectorsMovedByThickness(vectors[i - 1], vectors[i], thickness)[1])
      }
    })

    return result
  }

  static getVectorFromPoints(p1: THREE.Vector2, p2: THREE.Vector2): THREE.Vector2 {
    return new THREE.Vector2(p2.x - p1.x, p2.y - p1.y)
  }

  static getLineFromTwoVectors([p1, p2]: [THREE.Vector2, THREE.Vector2]): THREE.Line3 {
    return new THREE.Line3(new THREE.Vector3(p1.x, p1.y, 0), new THREE.Vector3(p2.x, p2.y, 0))
  }

  static getIntersectionOffTwoLines(line1: THREE.Line3, line2: THREE.Line3): THREE.Vector3 | null {
    let intersection: THREE.Vector3 | null = null
    const A = line1.start
    const B = line1.end
    const C = line2.start
    const D = line2.end

    // Line AB represented as a1x + b1y = c1
    const a1 = B.y - A.y
    const b1 = A.x - B.x
    const c1 = a1 * A.x + b1 * A.y

    // Line CD represented as a2x + b2y = c2
    const a2 = D.y - C.y
    const b2 = C.x - D.x
    const c2 = a2 * C.x + b2 * C.y

    const determinant = a1 * b2 - a2 * b1

    if (determinant === 0) {
      // The lines are parallel.
    } else {
      const x = (b2 * c1 - b1 * c2) / determinant
      const y = (a1 * c2 - a2 * c1) / determinant
      intersection = new THREE.Vector3(x, y)
    }

    return intersection
  }

  static getVectorsMovedByThickness(
    p1: THREE.Vector2,
    p2: THREE.Vector2,
    thickness: number
  ): [THREE.Vector2, THREE.Vector2] {
    const moveVector = this.getNormalVectorToVector(this.getVectorFromPoints(p1, p2))
      .normalize()
      .multiplyScalar(thickness)
    return [p1.clone().add(moveVector), p2.clone().add(moveVector)]
  }

  static getVectorToPositionOnSegment(
    start: THREE.Vector2,
    end: THREE.Vector2,
    distanceFromStart: number
  ): THREE.Vector2 {
    return end.clone().add(start.clone().negate()).normalize().multiplyScalar(distanceFromStart).add(start.clone())
  }

  static getVectorsArrayFromPointsArray(points: IPoint[]): Vector2[] {
    return [...points].map((p) => new THREE.Vector2(p.x, p.y))
  }
}
