import React from 'react'
import { Drawer, List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core'

export const InfoSidebar: React.FC = () => {
  return (
    <Drawer variant="permanent" anchor="right">
      <List>
        {['Logo', 'Main', 'Carts', 'Box'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  )
}
