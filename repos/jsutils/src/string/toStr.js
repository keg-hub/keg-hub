/** @module String */

import { isStr } from './isStr'

/**
 * Converts a passed in value to a string.
 * @function
 * @param {*} val - value to be converted
 * @return {String} - value converted into a string
 */
export const toStr = val =>
  val === null || val === undefined
    ? ''
    : isStr(val)
      ? val
      : JSON.stringify(val)
