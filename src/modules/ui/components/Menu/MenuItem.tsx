import React from 'react';

import { ListItem } from '../MaterialUI/ListItem';
import { ListItemIcon } from '../MaterialUI/ListItemIcon';

export const MenuItem: React.FC<{ selected: boolean }> = React.memo(({ children, selected }) => {
  return (
    <ListItem button selected={selected}>
      <ListItemIcon selected={selected}>{children}</ListItemIcon>
    </ListItem>
  );
});
