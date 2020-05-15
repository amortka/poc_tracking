import React from 'react'
import './App.css'
import { Canvas } from './modules/three/Canvas'
import { Provider, rootStore } from './store/Root'

function App() {
  return (
    <Provider value={rootStore}>
      <main className={'MainContainer'}>
        <Canvas />
      </main>
    </Provider>
  )
}

export default App
