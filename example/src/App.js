import React from 'react'
import { RBLProvider, useRBLValue } from 'redux-by-levels'
import ReactJson from 'react-json-view'

import Count from './count'

import styles from './App.module.css'
import Name from './name'

function App() {
  const state = useRBLValue()
  return (
    <div className={styles.App}>
      <ReactJson src={state} theme='pop' iconStyle='square' />
      <RBLProvider level='count'>
        <Count />
      </RBLProvider>
      <RBLProvider level='name'>
        <Name />
      </RBLProvider>
    </div>
  )
}

export default App
