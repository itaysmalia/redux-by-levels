import { createStore } from 'redux'
import { getRBLReducer } from 'redux-by-levels'

const initialState = { count: 0, name: 'foo' }

const store = createStore(getRBLReducer(initialState))

export default store
