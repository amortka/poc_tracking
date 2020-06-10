import React from 'react';
import { SidebarAreasPanel } from './SidebarAreasPanel';
import { useSelector } from 'react-redux';
import { SceneSelectors } from '../../../../store/scene/scene.selectors';

export const SidebarAreas: React.FC = React.memo(() => {
  const areas = useSelector(SceneSelectors.areas);
  return (
    <>
      {Object.entries(areas).map(([areaId, areaData]) => (
        <SidebarAreasPanel key={areaId} title={areaData.name} areaId={areaId} />
      ))}
    </>
  );
});
