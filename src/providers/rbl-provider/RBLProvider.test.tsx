import React from 'react'
import { range } from 'lodash'
import { render } from '@testing-library/react'
import { RBLContext } from '../../redux-by-levels-context'
import { RBLProvider } from '..'

describe('testing RBLProvider', () => {
  it('should render', () => {
    render(<RBLProvider />)
  })
  it('should render child', async () => {
    const stringToFind = 'FINDME123'
    const Comp = () => {
      return <h1>FINDME123</h1>
    }
    const { findByText } = render(
      <RBLProvider>
        <Comp />
      </RBLProvider>
    )
    const title = await findByText(stringToFind)
    expect(title).toBeDefined()
    expect(title.tagName).toBe('H1')
    expect(title.textContent).toBe(stringToFind)
  })

  it('should provide empty array', () => {
    const Comp = () => {
      const value = React.useContext(RBLContext)
      expect(value).toStrictEqual([])
      return <></>
    }
    render(
      <RBLProvider>
        <Comp />
      </RBLProvider>
    )
  })

  it('should provide empty array in 3 providers layers', () => {
    const Comp = () => {
      const value = React.useContext(RBLContext)
      expect(value).toStrictEqual([])
      return <></>
    }
    render(
      <RBLProvider>
        <RBLProvider>
          <RBLProvider>
            <Comp />
          </RBLProvider>
        </RBLProvider>
      </RBLProvider>
    )
  })

  it('should provide context', () => {
    const levels = ['foo', 'bar', 'baz', 0, 1]
    const Comp = () => {
      const value = React.useContext(RBLContext)
      expect(value).toStrictEqual(levels)
      return <></>
    }
    render(
      <RBLProvider level={levels}>
        <Comp />
      </RBLProvider>
    )
  })

  it('should get the context from above and pass it', () => {
    const levels = ['foo', 2, 'bar']
    const Comp = () => {
      const value = React.useContext(RBLContext)
      expect(value).toStrictEqual(value)
      return <></>
    }
    render(
      <RBLProvider level={levels[0]}>
        <RBLProvider level={levels[1]}>
          <RBLProvider level={levels[2]}>
            <Comp />
          </RBLProvider>
        </RBLProvider>
      </RBLProvider>
    )
  })

  it('different context to sibling components', () => {
    const levels = ['one', 'two', 'three']
    const Comp = ({ index }: { index: number }) => {
      const value = React.useContext(RBLContext)
      expect(value).toStrictEqual([...levels, index])
      return <></>
    }
    render(
      <RBLProvider level={levels}>
        {range(5).map((c: number) => (
          <RBLProvider level={c} key={c}>
            <Comp index={c} />
          </RBLProvider>
        ))}
      </RBLProvider>
    )
  })
})
