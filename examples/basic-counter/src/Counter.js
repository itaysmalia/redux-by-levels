import React from 'react'
import { useRBLState } from 'redux-by-levels'
import './Counter.css'
const Counter = () => {
  const [count, setCount] = useRBLState()
  return (
    <div>
      <button className='counter__button' onClick={() => setCount(count + 1)}>
        count - {count}
      </button>
    </div>
  )
}

export default Counter
