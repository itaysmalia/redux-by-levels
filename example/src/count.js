import React from 'react'
import { useRBLState } from 'redux-by-levels'

function Count() {
  const [count, setCount] = useRBLState()
  return <button onClick={() => setCount(count + 1)}>count - {count}</button>
}

export default Count
