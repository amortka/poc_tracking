import React from 'react'
import './App.css'
import { Canvas } from './modules/three/Canvas'
import { visualisationMock } from './mocks/main.mock'
import { ThemeProvider, createMuiTheme } from '@material-ui/core'
import { green, yellow } from '@material-ui/core/colors'
import { Menu } from './modules/ui-interface/components/Menu'
import { InfoSidebar } from './modules/ui-interface/components/InfoSidebar'

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: green,
    secondary: yellow,
  },
})

function App() {
  return (
    <div className={'MainContainer'}>
      <ThemeProvider theme={theme}>
        <Menu />
        <Canvas config={visualisationMock} />
        <InfoSidebar />
      </ThemeProvider>
    </div>
  )
}

export default App
