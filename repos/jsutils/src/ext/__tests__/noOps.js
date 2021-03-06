import { noOpObj, noPropObj, noPropArr } from '../noOps'

describe('noOpObj', () => {
  it('should be an empty frozen object', () => {
    expect(noOpObj).toEqual({})
    expect(Object.isFrozen(noOpObj)).toBe(true)
  })
})

describe('noPropObj', () => {
  it('should be a frozen object with a content prop', () => {
    expect(noPropObj).toEqual({ content: {} })
    expect(Object.isFrozen(noPropObj)).toBe(true)
  })
})

describe('noPropArr', () => {
  it('should be a frozen empty array', () => {
    expect(noPropArr).toEqual([])
    expect(Object.isFrozen(noPropObj)).toBe(true)
  })
})
