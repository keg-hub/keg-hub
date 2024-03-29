/** @module String */

import { capitalize } from './capitalize'
import { cleanStr } from './cleanStr'

/**
 * Converts a string to camel case.
 * @function
 * @param {String} string to be converted
 * @return {String} - string in camel case format
 */
export const camelCase = (str, compCase) => {
  return (
    (str &&
      cleanStr(str)
        .split(/[\s_-]/gm)
        .reduce((cased, word, index) => {
          if (!word) return cased
          cased +=
            ((index > 0 || compCase) && capitalize(word)) || word.toLowerCase()
          return cased
        }, '')) ||
    str
  )
}
