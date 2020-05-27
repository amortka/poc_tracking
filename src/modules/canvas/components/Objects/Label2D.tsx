import React from 'react';
import { Text } from '../Text';
import { Vector3 } from 'three';
import { TextSize } from '../../canvas.model';

interface Label2DProps {
  position: Vector3;
  title?: string;
  description?: string;
  textSize?: TextSize;
}

const titlePosition: [number, number, number] = [0, 0, 0];
const descriptionPosition: [number, number, number] = [0, -0.2, 0];

export const Label2D: React.FC<Label2DProps> = ({ title, description, position, textSize = TextSize.MEDIUM }) => {
  const descriptionGeometryConfig = { size: textSize };
  console.log({ textSize });
  return (
    <group position={position}>
      {title ? <Text label={title} position={titlePosition} geometryConfig={descriptionGeometryConfig} /> : null}
      {description ? (
        <Text label={description} geometryConfig={descriptionGeometryConfig} position={descriptionPosition} />
      ) : null}
    </group>
  );
};
