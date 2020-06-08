import React, { useContext } from 'react';
import { TextureLoader } from 'three';
import { useLoader } from 'react-three-fiber';

import fillTextureUrl from './fill_texture.png';
import outlineTextureUrl from './outline_texture.png';
import { IPoint, ISensor, ObjectType } from '../../canvas.model';
import { ThemeContext } from '../../contexts/ThemeContext';
import { useMouseEvent } from '../../hooks/use-mouse-event.hook';

interface SensorProps extends Pick<ISensor, 'tag'> {
  id: string;
  position: IPoint;
  selectable: boolean;
  selected?: boolean;
  tag: string;
}

const circleSegments = 32;

export const Sensor: React.FC<SensorProps> = ({ position, id, tag, selected, selectable }) => {
  const theme = useContext(ThemeContext);
  const [handleClick, handlePointerOver, handlePointerOut] = useMouseEvent({ id, tag }, ObjectType.SENSOR);

  const fillTexture = useLoader(TextureLoader, fillTextureUrl);
  const outlineTexture = useLoader(TextureLoader, outlineTextureUrl);
  const texture = selected ? fillTexture : outlineTexture;

  return (
    <mesh
      position-x={position.x}
      position-y={position.y}
      position-z={0.04}
      onClick={selectable && handleClick}
      onPointerOver={selectable && handlePointerOver}
      onPointerOut={selectable && handlePointerOut}
      name={`${ObjectType.SENSOR}_${id}`}
      userData={{ position, tag }}>
      <circleBufferGeometry attach="geometry" args={[theme.sensor.circleRadius, circleSegments]} />
      <meshBasicMaterial attach="material" map={texture} />
    </mesh>
  );
};
