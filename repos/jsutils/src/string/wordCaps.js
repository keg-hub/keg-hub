/** @module String */

import { isStr } from './isStr'
import { cleanStr } from './cleanStr'
import { capitalize } from './capitalize'

/**
 * Converts all words in a string to be capitalized.
 * @function
 * @param {String} string to be converted
 * @return {String} - string with all words capitalized
 */
export const wordCaps = str => {
  if (!isStr(str)) return str
  let cleaned = cleanStr(str)
  return cleaned
    .split(' ')
    .map(word => (word && capitalize(word)) || '')
    .join(' ')
}
