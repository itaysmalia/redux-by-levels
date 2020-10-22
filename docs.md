# Docs for redux-by-levels

## `getRBLReducer`
## **props:**
| prop            | type   | optional | Description                                                                                                                                                    |
| --------------- | ------ | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| initialState    | object | yes      | the initial state of the data under the created reducer.                                                                                                       |
| levelsAfterRoot | number | yes      | the number of levels that the reducer is after the very root state of the store, for example if you use `combineReducers` give the reducer `levelsAfterRoot:1` |

### *example*

```jsx 
combineReducers({ app: getRBLReducer({data:[]},1) })
```
or 
```jsx
combineReducer({ a: combineReducer({ b: getRBLReducer({},2) }) })
```

## `RBLProvider`
## **props:**

| prop  | type                      | optional | Description                                 |
| ----- | ------------------------- | -------- | ------------------------------------------- |
| level | array \| string \| number | no       | the level/s to append to the levels context |

### *example*
```jsx
/* state = { foo: { bar: { baz: [ 0, 1 ] } } } } */
const RBLProviderExample = () => (
    <RBLProvider level="foo">
        <RBLProvider level={["bar","baz"]}>
            <RBLProvider level={0}>
                <ComponentThatControlsFirstBaz />
            </RBLProvider>
            <RBLProvider level={1}>
                <ComponentThatControlsSecondBaz />
            </RBLProvider>
        </RBLProvider>
    </RBLProvider>
)
```

## `RBLResetter`
### **`RBLResetter` have no props**
That provider is used to reset the context level, so you can start again from the reducer root state.

## `useRBLState`
## **props:**

| prop  | type                      | optional | Description                                                             |
| ----- | ------------------------- | -------- | ----------------------------------------------------------------------- |
| level | array \| string \| number | yes      | the level/s to append to the levels context the controlling that level. |

## **returns**
`state`: the value that is in the state by the levels.
`setState(value | (value) => newValue)` a function that set the value that is in the state by the levels.

```jsx
const [state, setState] = useRBLState(["foo"],["bar"])
```

### *example*
```jsx
const UseRBLStateExample = () => {
    const [count,setCount] = useRBLState("count")
    return <button onClick={() => setCount(countValue => countValue + 1)}>count - {count}</button>
}
```

#### with the same props as `useRBLState` we have:
### `useRBLValue`
that returns only the value by the level.
and:
### `useRBLSetter`
that returns only the setter function. that hook use useful to prevent unnecessary renders if you don't need the value itself, only the option to set it.

## `useRBLRootState`
That hook working just like `useRBLState`, but it ignores the levels from context and using only the levels passed to the `levels` prop, if nothing will be passed, the hook will control the absolute root state of the reducer.
you can also use `useRBLRootValue` and `useRBLRootSetter` that works just the same.


## `useSyncRBL`
## **props**
| prop  | type                      | optional | Description                                                                                        |
| ----- | ------------------------- | -------- | -------------------------------------------------------------------------------------------------- |
| value | any                       | no       | the value to listen for and sync it with the value in the state by the levels if the value changed |
| level | array \| string \| number | yes      | append the level(s) to the context levels then sync the value with this level                      |

## `useSyncRBLRoot`
The props are just the same like `useSyncRBL`, but this hook will sync it from the root state of the reducer with the level(s) if passed, if not it will sync the value with the root state of the reducer.

# **Thank you for using redux-by-levels :)**