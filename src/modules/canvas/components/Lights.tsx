import React from 'react';

const pointLightPosition: [number, number, number] = [140, 140, 140];

export const Lights: React.FC = React.memo(() => {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={pointLightPosition} />
    </>
  );
});
