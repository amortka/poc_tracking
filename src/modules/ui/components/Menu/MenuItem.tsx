import React from 'react';

import { ListItem } from '../MaterialUI/ListItem';
import { ListItemIcon } from '../MaterialUI/ListItemIcon';

export const MenuItem: React.FC<{ isButton: boolean }> = ({ children, isButton }) => {
  return (
    <ListItem button={isButton as any}>
      <ListItemIcon>{children}</ListItemIcon>
    </ListItem>
  );
};
