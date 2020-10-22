import React from 'react'
import { useRBLState } from 'redux-by-levels'

const Name = () => {
  const [name, setName] = useRBLState()
  return (
    <div>
      <input
        defaultValue={name}
        onChange={({ target: { value } }) => setName(value)}
      />
      <h3>name - {name}</h3>
    </div>
  )
}

export default Name
