/** @module Function */

import { isNum } from '../number'

/**
 * Ensures the last call to the throttled function get called.
 * <br/>Will wait the allotted time, before calling the last call to it.
 * <br/>The final call will not execute until no more calls are made,
 * <br/>Accepts a callback to call each time the throttle called,
 * @example
 * throttleLast(() => {}, () => {})()
 * // throttle function
 * @function
 * @param {Function} func - method to call after wait
 * @param {Function} cb - method to call after throttle function is called
 * @param {Number} [wait=100] time to wait until executing func param
 * @return {Function} throttled function
 */
export const throttleLast = (func, cb, wait = 100) => {
  let throttleTimeout

  // Allow not passing in the cb, and just the func, and wait time
  if(isNum(cb)){
    wait = cb
    cb = undefined
  }
  
  return function (...args) {
    // If the throttle already exists clear it, and create it again
    if (throttleTimeout) clearTimeout(throttleTimeout)
    // Store a reference to the timeout
    // Will wait the allotted time until calling the final call to it
    throttleTimeout = setTimeout(() => {
      func.apply(this, args)
      clearTimeout(throttleTimeout)
    }, wait)
  
    typeof cb === 'function' && cb()
  }
}
