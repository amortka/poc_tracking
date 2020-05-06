import React from 'react'
import { Provider } from 'react-redux'
import './App.css'
import { Canvas } from './modules/three/Canvas'
import { store } from './store/store.config'

function App() {
  return (
    <Provider store={store}>
      <main className={'MainContainer'}>
        <Canvas />
      </main>
    </Provider>
  )
}

export default App
