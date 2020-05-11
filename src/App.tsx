import React from 'react'
import { ThemeProvider, createMuiTheme } from '@material-ui/core'
import { green, yellow } from '@material-ui/core/colors'
import { Canvas } from './modules/three/Canvas'
import { visualizationMock } from './mocks/main.mock'
import { VisualizationType } from './modules/three/canvas.model'
import { Menu } from './modules/ui-interface/components/Menu'
import { InfoSidebar } from './modules/ui-interface/components/InfoSidebar'
import './App.css'

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: green,
    secondary: yellow,
  },
})

function App() {
  return (
    <main className={'MainContainer'}>
      <ThemeProvider theme={theme}>
        <Menu />
        <Canvas config={visualizationMock} type={VisualizationType.D3} />
        <InfoSidebar />
      </ThemeProvider>
    </main>
  )
}

export default App
