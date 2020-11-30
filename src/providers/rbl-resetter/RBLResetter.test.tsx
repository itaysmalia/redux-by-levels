import React from 'react'
import { render } from '@testing-library/react'
import { RBLResetter } from './RBLResetter'
import { RBLContext } from '../../redux-by-levels-context'
import { RBLProvider } from '..'
describe('testing RBLResetter', () => {
  it('should render', () => {
    render(<RBLResetter>inner</RBLResetter>)
  })

  it('should render child', async () => {
    const stringToFind = 'FINDME123'
    const Comp = () => {
      return <h1>FINDME123</h1>
    }
    const { findByText } = render(
      <RBLResetter>
        <Comp />
      </RBLResetter>
    )
    const title = await findByText(stringToFind)
    expect(title).toBeDefined()
    expect(title.tagName).toBe('H1')
    expect(title.textContent).toBe(stringToFind)
  })

  it('should provide empty levels', () => {
    const Comp = () => {
      const value = React.useContext(RBLContext)
      expect(value).toStrictEqual([])
      return <></>
    }
    render(
      <RBLResetter>
        <Comp />
      </RBLResetter>
    )
  })

  it('should reset context above', () => {
    const Comp = () => {
      const value = React.useContext(RBLContext)
      expect(value).toStrictEqual([])
      return <></>
    }
    render(
      <RBLProvider level='foo'>
        <RBLProvider level='bar'>
          <RBLResetter>
            <Comp />
          </RBLResetter>
        </RBLProvider>
      </RBLProvider>
    )
  })
})
