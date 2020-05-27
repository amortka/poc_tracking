import { CsgUtils } from '../../utils/csg.utils';
import { Dictionary, IPoint, IWall, WallCorner } from '../../../../app.model';
import { ExtrudeGeometry, Geometry, Line3, Mesh, Shape, Vector2 } from 'three';
import { ExtrudeGeometryOptions } from 'three/src/geometries/ExtrudeGeometry';
import { IWallWithPointsCoordinates } from '../../canvas.model';
import { VectorUtils } from '../../utils/vector.unitls';

export class WallsUtils {
  static replacePointIdToCoordinates(wall: IWall, points: Dictionary<IPoint>): IWallWithPointsCoordinates {
    return { ...wall, start: points[wall.start], end: points[wall.end] };
  }

  static getWallWithPointsCoordinates(
    wallId,
    walls: Dictionary<IWall>,
    points: Dictionary<IPoint>
  ): IWallWithPointsCoordinates {
    return this.replacePointIdToCoordinates(walls[wallId], points);
  }

  static getWallsWithCoordinates(walls: Dictionary<IWall>, points: Dictionary<IPoint>): IWallWithPointsCoordinates[] {
    return (
      Object.values(walls).map(
        (w) => ({ ...w, start: points[w.start], end: points[w.end] } as IWallWithPointsCoordinates)
      ) || []
    );
  }

  static getWallsThatHaveCornerInPoint(
    pointId: string,
    corner: WallCorner,
    walls: Dictionary<IWall>
  ): Dictionary<IWall> {
    return Object.entries(walls).reduce((previousValue, currentValue) => {
      const [wallId, wallData] = currentValue;
      if (wallData[corner] === pointId) {
        previousValue[wallId] = wallData;
      }
      return previousValue;
    }, {});
  }

  static getAdjacentWallsToWallId(wallId: string, corner: WallCorner, walls: Dictionary<IWall>): Dictionary<IWall> {
    return this.getWallsThatHaveCornerInPoint(
      walls[wallId][corner],
      corner === WallCorner.START ? WallCorner.END : WallCorner.START,
      walls
    );
  }

  static getWallShapeFromWallsArrangement(wallId: string, walls: Dictionary<IWall>, points: Dictionary<IPoint>): Shape {
    const wall: IWallWithPointsCoordinates = this.getWallWithPointsCoordinates(wallId, walls, points);

    const p1: Vector2 = new Vector2(wall.start.x, wall.start.y);
    const p2: Vector2 = new Vector2(wall.end.x, wall.end.y);

    const wallPrim: [Vector2, Vector2] = VectorUtils.getVectorsMovedByThickness(p1, p2, wall.thickness);
    const linePrim = VectorUtils.getLineFromTwoVectors(wallPrim);

    const prevWall: IWall = Object.values(this.getAdjacentWallsToWallId(wallId, WallCorner.START, walls))[0];
    const nextWall: IWall = Object.values(this.getAdjacentWallsToWallId(wallId, WallCorner.END, walls))[0];

    const lineFromPrevWall = this.getLineFromWallMovedByThickness(
      this.replacePointIdToCoordinates(prevWall, points),
      wall.thickness
    );
    const lineFromNextWall = this.getLineFromWallMovedByThickness(
      this.replacePointIdToCoordinates(nextWall, points),
      wall.thickness
    );

    const p1Prim: Vector2 = new Vector2(
      ...VectorUtils.getIntersectionOffTwoLines(linePrim, lineFromPrevWall).toArray()
    );
    const p2Prim: Vector2 = new Vector2(
      ...VectorUtils.getIntersectionOffTwoLines(linePrim, lineFromNextWall).toArray()
    );

    return new Shape([p1, p2, p2Prim, p1Prim, p1]);
  }

  private static getLineFromWallMovedByThickness(wall: IWallWithPointsCoordinates, thickness: number): Line3 {
    const [p1, p2] = this.getVectorsFromWall(wall);

    const wallPrim: [Vector2, Vector2] = VectorUtils.getVectorsMovedByThickness(p1, p2, thickness);
    return VectorUtils.getLineFromTwoVectors(wallPrim);
  }

  static getVectorsFromWall(wall: IWallWithPointsCoordinates): [Vector2, Vector2] {
    return [new Vector2(wall.start.x, wall.start.y), new Vector2(wall.end.x, wall.end.y)];
  }

  static makeHoles(
    wallGeometry: Geometry,
    wall: IWallWithPointsCoordinates,
    extrudeSettings: ExtrudeGeometryOptions
  ): void {
    const [wallStart, wallEnd] = this.getVectorsFromWall(wall);

    if (wall.meta?.holes) {
      Object.values(wall.meta.holes).forEach((hole) => {
        const holeStartV = VectorUtils.getVectorToPositionOnSegment(wallStart, wallEnd, hole.start);
        const holeEndV = VectorUtils.getVectorToPositionOnSegment(wallStart, wallEnd, hole.start + hole.width);

        const holeShape = VectorUtils.getShapeFromVectors([holeStartV, holeEndV], wall.thickness);
        const holeGeometry = new ExtrudeGeometry(holeShape, { ...extrudeSettings, depth: hole.height });

        const wallMesh = new Mesh(wallGeometry);
        const holeMesh = new Mesh(holeGeometry);
        holeMesh.position.set(0, 0, hole.fromGround || 0);

        wallGeometry.copy(CsgUtils.subtract(wallMesh, holeMesh).geometry as Geometry);
      });
    }
  }
}
