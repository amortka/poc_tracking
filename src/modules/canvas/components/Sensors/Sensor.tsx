import { IPoint, ISensor, ObjectType, VisualizationType } from '../../canvas.model';
import React, { useMemo } from 'react';
import { TextureLoader, CircleBufferGeometry } from 'three';
import { useLoader } from 'react-three-fiber';
import outlineTextureUrl from './outline_texture.png';
import fillTextureUrl from './fill_texture.png';

interface SensorProps extends Pick<ISensor, 'tag'> {
  position: IPoint;
  type: VisualizationType;
  id: string;
  isOutline?: boolean;
}

const circleRadius = 0.17;
const circleSegments = 32;

export const Sensor: React.FC<SensorProps> = ({ position, type, id, tag, isOutline = false }) => {
  const geometry = useMemo(() => new CircleBufferGeometry(circleRadius, circleSegments), []);

  const fillTexture = useLoader(TextureLoader, fillTextureUrl);
  const outlineTexture = useLoader(TextureLoader, outlineTextureUrl);
  const texture = isOutline ? outlineTexture : fillTexture;

  return (
    <mesh
      args={[geometry]}
      position-x={position.x}
      position-y={position.y}
      position-z={0.04}
      name={`${ObjectType.SENSOR}_${id}`}
      userData={{ position, tag }}>
      <meshBasicMaterial attach="material" map={texture} />
    </mesh>
  );
};
