/** @module String */

/**
 * Remove an `s` at the end of a string, if the last char is an `s`,
 * @function
 * @param {String} str - string to convert
 * @return {String} string as singular
 */
export const singular = str => {
  if (!str || !str.length) return str
  return str[str.length - 1] === 's' ? str.slice(0, str.length - 1) : str
}
