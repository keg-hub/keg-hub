import { mockReactHooks, clearMockedHooks } from '../../mocks/reactHooks'
import { testTheme as theme } from '../../mocks/testTheme'

jest.resetModules()
jest.resetAllMocks()

const useThemeMock = jest.fn(() => theme)
jest.setMock('../../hooks/useTheme', { useTheme: useThemeMock })
const mockedHooks = mockReactHooks('useState', 'useMemo', 'useEffect', 'useRef')
const { useMemo, useRef } = mockedHooks

const {
  getComponentName,
  usePropClassName,
  useShallowMemoMerge,
  useReStyles,
} = require('../reStyleHooks')

describe('reStyleHooks', () => {
  afterEach(() => {
    clearMockedHooks(mockedHooks)
  })

  describe('useShallowMemoMerge', () => {
    afterEach(() => {
      clearMockedHooks(mockedHooks)
    })

    it('should merge the objects, with memoization', () => {
      const objA = { a: 1, b: 3 }
      const objB = { a: 2 }

      const result = useShallowMemoMerge(objA, objB)

      expect(result.a).toEqual(2)
      expect(result.b).toEqual(3)

      expect(useMemo).toHaveBeenCalled()
    })
  })

  describe('getComponentName', () => {
    afterEach(() => {
      clearMockedHooks(mockedHooks)
    })

    it('should return the displayName of the passed in component', () => {
      expect(getComponentName({ displayName: 'DisplayComponent' })).toBe(
        'DisplayComponent'
      )
    })

    it('should return the name when no displayName of the passed in component', () => {
      expect(getComponentName({ name: 'TestName' })).toBe('TestName')
    })

    it('should return a random uuid when no name or displayName exist', () => {
      expect(getComponentName({})).not.toBe(undefined)
    })

    it('should return displayName over name of the passed in component', () => {
      const comp = { displayName: 'DisplayComponent', name: 'TestName' }
      expect(getComponentName(comp)).toBe('DisplayComponent')
    })
  })

  describe('usePropClassName', () => {
    afterEach(() => {
      clearMockedHooks(mockedHooks)
    })

    it('should memoize the passed in className and compName', () => {
      usePropClassName('test-class-name', 'TestCompName')
      expect(useMemo).toHaveBeenCalled()

      const memoDeps = useMemo.mock.calls[0][1]
      expect(memoDeps[0]).toBe('test-class-name')
      expect(memoDeps[1]).toBe('TestCompName')
    })

    it('should return an array of classNames that includes the component and class name', () => {
      const classList = usePropClassName('test-class-name', 'TestCompName')
      expect(classList.includes('test-class-name')).toBe(true)
      expect(classList.includes('TestCompName')).toBe(true)
    })

    it('should not add the className if its not passed in', () => {
      const classList = usePropClassName(undefined, 'TestCompName')
      expect(classList.includes('test-class-name')).not.toBe(true)
      expect(classList.includes('TestCompName')).toBe(true)
    })

    it('should not add the compName if its not passed in', () => {
      const classList = usePropClassName('test-class-name', undefined)
      expect(classList.includes('test-class-name')).toBe(true)
      expect(classList.includes('TestCompName')).not.toBe(true)
    })
  })

  describe('useReStyles', () => {
    afterEach(() => {
      clearMockedHooks(mockedHooks)
      useThemeMock.mockClear()
    })

    it('should call the useTheme hook', () => {
      const styleData = {}
      const props = { style: { margin: 10 }, test: 1 }
      useReStyles(styleData, props)

      expect(useThemeMock).toHaveBeenCalled()
    })

    it('should call the useMemo hook with the passed in props', () => {
      const styleData = {}
      const props = { style: { margin: 10 }, test: 1 }
      useReStyles(styleData, props)

      expect(useMemo).toHaveBeenCalled()
      expect(useMemo.mock.calls[0][1][0]).toEqual(props)
    })

    it('should call the useRef hook with the passed in props', () => {
      const styleData = {}
      const props = { style: { margin: 10 }, test: 1 }
      useReStyles(styleData, props)

      expect(useRef).toHaveBeenCalledWith(props)
    })

    it('should call styleData when its passed as a function', () => {
      const response = { test: 2 }
      const styleData = jest.fn(() => {
        return response
      })
      const props = { style: { margin: 10 }, test: 1 }
      const styles = useReStyles(styleData, props)

      expect(styleData).toHaveBeenCalledWith(theme, props)
      expect(styles).toBe(response)
    })

    it('should return styleData when its an object', () => {
      const styleData = {}
      const props = { style: { margin: 10 }, test: 1 }
      const styles = useReStyles(styleData, props)

      expect(styles).toBe(styleData)
    })

    it('should return an empty object when the styleData is not an object', () => {
      const styleData = 'no-exists'
      const props = { style: { margin: 10 }, test: 1 }
      const styles = useReStyles(styleData, props)

      expect(Object.keys(styles).length).toBe(0)
    })
  })
})
