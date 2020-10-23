# redux-by-levels

> Manage redux state with levels, based on context API.

[![NPM](https://img.shields.io/npm/v/redux-by-levels.svg)](https://www.npmjs.com/package/redux-by-levels) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

### go to the [npm page](https://www.npmjs.com/package/redux-by-levels)

## Install

```bash
npm install --save redux react-redux redux-by-levels
```

## Usage
### full docs at [docs.md](https://github.com/itaysmalia/redux-by-levels/blob/master/docs.md)
```jsx
// store.js

import { createStore } from 'redux'
import { getRBLReducer } from 'redux-by-levels'

const initialState = { count: 0, name: 'foo' }

const store = createStore(getRBLReducer(initialState))

export default store
```
```jsx
// App.js
import React from 'react'
import { Provider } from 'react-redux'
import { RBLProvider } from 'redux-by-levels'

import store from './store'
import Count from './count'
import Name from './name'

function App(){
  return (
    <Provider store={store}>
        <RBLProvider level="count">
            <Count />
        </RBLProvider>
        <RBLProvider level="name">
            <Name />
        </RBLProvider>
    </Provider>
  )
}

export default App
```

```jsx
// count.js
import React from 'react';
import { useRBLState } from 'redux-by-levels'

function Count() {
  const [count, setCount] = useRBLState()
  return <button onClick={() => setCount(count + 1)}>count - {count}</button>
}

export default Count
```
```jsx
// name.js
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
```
## License

MIT © [itaysmalia](https://github.com/itaysmalia)
