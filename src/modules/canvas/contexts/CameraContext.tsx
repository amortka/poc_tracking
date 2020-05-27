import React, { Dispatch, SetStateAction, useState } from 'react';
import { OrbitControls } from '../libs/OrbitControls/OrbitControls';

export const CameraControlContext = React.createContext<[OrbitControls, Dispatch<SetStateAction<OrbitControls>>]>(null);

export const CameraControlContextProvider: React.FC = ({ children }) => {
  const [orbitControls, setOrbitControl] = useState<OrbitControls>(null);

  return (
    <CameraControlContext.Provider value={[orbitControls, setOrbitControl]}> {children}</CameraControlContext.Provider>
  );
};
