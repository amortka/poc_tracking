import React from 'react'
import './App.css'
import { Canvas } from './modules/three/Canvas'
import { visualizationMock } from './mocks/main.mock'
import { VisualizationType } from './modules/three/canvas.model'

function App() {
  return (
    <main className={'MainContainer'}>
      <Canvas config={visualizationMock} type={VisualizationType.D2} />
    </main>
  )
}

export default App
