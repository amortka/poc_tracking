import React, { useContext, useEffect, useRef } from 'react';
import { ISelection, ISelectionData } from '../../../../models/main.model';
import { useFrame, useThree } from 'react-three-fiber';
import { CameraControlContext } from '../../contexts/CameraContext';
import { SelectionUtils } from './selection.utils';

interface SelectionProps {
  selection: ISelection;
  selectionDataClb?: (payload: ISelectionData) => void;
}

export const Selection: React.FC<SelectionProps> = ({ selection, selectionDataClb }) => {
  const { scene, camera, viewport } = useThree();
  const [orbitControls] = useContext(CameraControlContext);

  const shouldUpdatePositions = useRef(true);

  useEffect(() => {
    if (!orbitControls) return;
    const onCameraChange = () => {
      shouldUpdatePositions.current = true;
    };
    orbitControls.addEventListener('change', onCameraChange);
    return () => orbitControls.removeEventListener('change', onCameraChange);
  }, [orbitControls]);

  useFrame(() => {
    if (!shouldUpdatePositions.current || !camera || !selectionDataClb) return;
    camera.updateMatrixWorld();

    selectionDataClb(SelectionUtils.collectAllData(selection, camera, scene, viewport));
    shouldUpdatePositions.current = false;
  });

  return <React.Fragment />;
};
