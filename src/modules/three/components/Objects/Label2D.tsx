import React from 'react';
import { Vector3 } from 'three';
import { Text } from '../Text';

interface Label2DProps {
  position: THREE.Vector3;
  title?: string;
  description?: string;
}

const titlePosition: [number, number, number] = [0, 0.1, 0];
const descriptionGeometryConfig = { size: 0.1 };
const descriptionPosition: [number, number, number] = [0, -0.1, 0];

export const Label2D: React.FC<Label2DProps> = ({ title, description, position }) => {
  return (
    <group position={position}>
      {title ? <Text label={title} position={titlePosition} /> : null}
      {description ? (
        <Text label={description} geometryConfig={descriptionGeometryConfig} position={descriptionPosition} />
      ) : null}
    </group>
  );
};