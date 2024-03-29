/** @module Function */

import { validate } from '../validation'
import { isFunc } from '../method/isFunc'

/**
 * Returns a new function that is the complement of predicate function `predicate`
 * @function
 * @param {Function} predicate
 * @returns {Function?} the complement of `predicate`, if it's a function, otherwise null
 * @example
 * const isNegative = x => (x < 0)
 * const isNonNegative = complement(isNegative)
 * isNonNegative(1) // true
 */
export const complement = predicate => {
  const [valid] = validate({ predicate }, { predicate: isFunc })
  return valid ? (...args) => !predicate(...args) : null
}
