/* eslint @typescript-eslint/no-unused-vars: off */

import { extend } from 'react-three-fiber';
import { Line2 } from 'three/examples/jsm/lines/Line2';
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial';
import { LineSegmentGeometry } from './objects/LineSegmentGeometry';
import { OrbitControls } from './libs/OrbitControls/OrbitControls';
import { ReactThreeFiber } from 'react-three-fiber/three-types';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      line2: ReactThreeFiber.Object3DNode<Line2, typeof Line2>;
      lineGeometry: ReactThreeFiber.BufferGeometryNode<LineGeometry, typeof LineGeometry>;
      lineMaterial: ReactThreeFiber.MaterialNode<LineMaterial, typeof LineMaterial>;
      lineSegmentGeometry: ReactThreeFiber.BufferGeometryNode<LineSegmentGeometry, typeof LineSegmentGeometry>;
      orbitControls: ReactThreeFiber.Object3DNode<OrbitControls, typeof OrbitControls>;
    }
  }
}

extend({ Line2, LineMaterial, LineSegmentGeometry, OrbitControls });
