import React from 'react'
import { Drawer, List, ListItem, ListItemText, ListItemIcon, makeStyles, Paper, Typography } from '@material-ui/core'

const useStyles = makeStyles({
  root: {
    width: '300px',
    maxWidth: '300px',
  },
  drawerPaper: {
    backgroundColor: '#14191F',
    width: '300px',
    maxWidth: '300px',
  },
  paper: {
    '&:first-of-type': {
      backgroundColor: '#2C323A',
    },
    height: '200px',
    marginBottom: '20px',
    backgroundColor: '#212830',
  },
})

export const InfoSidebar: React.FC = () => {
  const classes = useStyles()

  return (
    <Drawer variant="permanent" anchor="right" className={classes.root} classes={{ paper: classes.drawerPaper }}>
      <Paper className={classes.paper} square>
        <Typography variant="h6">Linia produkcyjna</Typography>
        dsadsadsadas
      </Paper>
      <Paper className={classes.paper} square>
        <Typography variant="h6">WAREHOUSE 800</Typography>
        dsasdasdasdasdas
      </Paper>
      <Paper className={classes.paper} square>
        <Typography variant="h6">P1</Typography>
        asdsdgdfgfd
      </Paper>
      <Paper className={classes.paper} square>
        <Typography variant="h6">P 03</Typography>
        asdsdgdfgfd
      </Paper>
      <Paper className={classes.paper} square>
        <Typography variant="h6">Strefa Cavity</Typography>
        asdsdgdfgfd
      </Paper>
    </Drawer>
  )
}
