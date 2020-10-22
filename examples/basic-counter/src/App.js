import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { getRBLReducer, RBLProvider } from 'redux-by-levels'
import './App.css'
import Counter from './Counter'
const initialState = { count: 0 }
const store = createStore(getRBLReducer(initialState))

function App() {
  return (
    <Provider store={store}>
      <div className='App'>
        <header className='App-header'>Basic Counter</header>
        <RBLProvider level='count'>
          <Counter />
        </RBLProvider>
      </div>
    </Provider>
  )
}

export default App
