import React from 'react';
import { Text } from '../Text';

interface Label2DProps {
  title?: string;
  description?: string;
}

export const Label2D: React.FC<Label2DProps> = ({ title, description }) => {
  return (
    <group>
      {title ? <Text label={title} /> : null}
      {description ? <Text label={description} geometryConfig={{ size: 0.1 }} /> : null}
    </group>
  );
};
