import React from 'react';

export const AmbientLight: React.FC = () => {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[140, 140, 140]} />
    </>
  );
};
