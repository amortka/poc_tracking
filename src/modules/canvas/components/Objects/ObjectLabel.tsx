import React, { useContext, useMemo } from 'react';
import { Vector3 } from 'three';

import { Text } from '../Text';
import { TextSize } from '../../canvas.model';
import { ThemeContext } from '../../contexts/ThemeContext';

interface Label2DProps {
  position: Vector3;
  title?: string;
  description?: string;
  textSize?: TextSize;
  textRotation?: number; // in RADIANS
  selected: boolean;
}

const titlePosition: [number, number, number] = [0, 0, 0];
const descriptionPosition: [number, number, number] = [0, -0.3, 0];

export const ObjectLabel: React.FC<Label2DProps> = ({
  title,
  description,
  position,
  textSize = TextSize.MEDIUM,
  textRotation = 0,
  selected,
}) => {
  const theme = useContext(ThemeContext);

  const descriptionGeometryConfig = useMemo(() => ({ size: textSize }), [textSize]);

  return (
    <group position={position} rotation={[0, 0, textRotation]}>
      {title && (
        <Text
          label={title}
          position={titlePosition}
          geometryConfig={descriptionGeometryConfig}
          materialConfig={{ color: selected ? theme.objects.D2.textSelected : theme.objects.D2.text }}
        />
      )}
      {description && (
        <Text
          label={description}
          geometryConfig={descriptionGeometryConfig}
          position={descriptionPosition}
          materialConfig={{ color: selected ? theme.objects.D2.textSelected : theme.objects.D2.text }}
        />
      )}
    </group>
  );
};
