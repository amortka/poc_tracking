import React from 'react'
import './App.css'
import { Canvas } from './modules/three/Canvas'
import { visualisationMock } from './mocks/main.mock'
import { VisualisationType } from './modules/three/canvas.model'

function App() {
  return (
    <main className={'MainContainer'}>
      <Canvas config={visualisationMock} type={VisualisationType.D2} />
    </main>
  )
}

export default App
