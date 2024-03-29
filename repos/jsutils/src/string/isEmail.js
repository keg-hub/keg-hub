/** @module String */

import { isStr } from './isStr'

/**
 * Check if string is a email.
 * @function
 * @param {String} string to check
 * @return {Boolean} - if it's a email
 */
export const isEmail = str => {
  if (!str || !isStr(str)) return false
  const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
  return Boolean(regex.test(str))
}
