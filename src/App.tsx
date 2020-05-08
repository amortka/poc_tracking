import React from 'react'
import './App.css'
import { Canvas } from './modules/three/Canvas'
import { visualisationMock } from './mocks/main.mock'
import { ThemeProvider, createMuiTheme } from '@material-ui/core'
import { green, yellow } from '@material-ui/core/colors'
import { Menu } from './modules/ui-interface/components/Menu'
import { InfoSidebar } from './modules/ui-interface/components/InfoSidebar'
import { VisualisationType } from './modules/three/canvas.model'

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
        <Canvas config={visualisationMock} type={VisualisationType.D2} />
        <InfoSidebar />
      </ThemeProvider>
    </main>
  )
}

export default App
