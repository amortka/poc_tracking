import React from 'react'
import './App.css'
import { Canvas } from './modules/three/Canvas'
import { visualisationMock } from './mocks/main.mock'

function App() {
  return (
    <main className={'MainContainer'}>
      <Canvas config={visualisationMock} />
    </main>
  )
}

export default App
