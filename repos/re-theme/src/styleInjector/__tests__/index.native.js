import { mockReactHooks, clearMockedHooks } from '../../mocks/reactHooks'
import React from 'react'

const mockedHooks = mockReactHooks('useMemo')

const MockComponent = props => {
  return React.createElement('div', props, 'I am a div')
}

const { StyleInjector, useStyleTag } = require('../index.native')

describe('styleInjector', () => {
  describe('StyleInjector', () => {
    afterEach(() => {
      clearMockedHooks(mockedHooks)
      jest.clearAllMocks()
    })

    it('should return the passed in component wrapped in a function', () => {
      const WrappedComp = StyleInjector(MockComponent)
      expect(typeof WrappedComp).toBe('function')
      const mockComp = WrappedComp()
      expect(mockComp.type).toBe(MockComponent)
    })

    it('should pass the props on to the child compoennt', () => {
      const WrappedComp = StyleInjector(MockComponent)
      const mockComp = WrappedComp({ className: 'test-class' })
      expect(mockComp.props.className).toBe('test-class')
    })
  })

  describe('useStyleTag', () => {
    afterEach(() => {
      clearMockedHooks(mockedHooks)
      jest.clearAllMocks()
    })

    it('should return the passed in className', () => {
      const { classNames } = useStyleTag('', 'test-class')
      expect(classNames.includes('test-class')).toBe(true)
    })
  })
})
