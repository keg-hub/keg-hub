import { i as isFunc } from './isFunc-40ceeef8.js';
import { v as validate } from './validate-0a7295ee.js';
import { i as isNum } from './isNum-cc6ad9ca.js';
import { h as hasOwn } from './jsonEqual-911fc3f9.js';
import { i as isArr } from './isArr-a4420764.js';
import { d as deepClone } from './deepClone-06f4b810.js';
import { e as emptyObj } from './noOps-3942ab96.js';
import { i as isStr } from './isStr-481ce69b.js';
import { i as isObj } from './isObj-2a71d1af.js';
import { i as isEmpty } from './isValidDate-76b2dc77.js';

const checkCall = (method, ...params) => {
  return isFunc(method) ? method(...params) : undefined;
};

const complement = predicate => {
  const [valid] = validate({
    predicate
  }, {
    predicate: isFunc
  });
  return valid ? (...args) => !predicate(...args) : null;
};

const eitherFunc = (func1, func2) => isFunc(func1) && func1 || func2;

const debounce = (func, wait = 250, immediate = false) => {
  let timeout;
  function wrapFunc(...args) {
    if (!isFunc(func)) return null;
    const context = this;
    const later = () => {
      timeout = null;
      !immediate && func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) return isFunc(func) && func.apply(context, args);
  }
  return wrapFunc;
};

const doIt = (...args) => {
  const params = args.slice();
  const num = params.shift();
  const bindTo = params.shift();
  const cb = params.pop();
  if (!isNum(num) || !isFunc(cb)) return [];
  const doItAmount = new Array(num);
  const responses = [];
  for (let i = 0; i < doItAmount.length; i++) {
    const data = cb.call(bindTo, i, ...params);
    if (data === false) break;
    responses.push(data);
  }
  return responses;
};

const memorize = (func, getCacheKey, limit = 1) => {
  if (!isFunc(func) || getCacheKey && !isFunc(getCacheKey)) return console.error('Error: Expected a function', func, getCacheKey);
  let memorized = function () {
    const cache = memorized.cache;
    const key = getCacheKey ? getCacheKey.apply(this, arguments) : arguments[0];
    if (hasOwn(cache, key)) return cache[key];
    const result = func.apply(this, arguments);
    isNum(limit) && Object.keys(cache).length < limit ? cache[key] = result : memorized.cache = {
      [key]: result
    };
    return result;
  };
  memorized.cache = {};
  memorized.destroy = () => {
    getCacheKey = undefined;
    memorized.cache = undefined;
    memorized.destroy = undefined;
    memorized = undefined;
  };
  return memorized;
};

const runSeq = async (asyncFns = [], options = {}) => {
  const [valid] = validate({
    asyncFns
  }, {
    asyncFns: isArr
  });
  if (!valid) return [];
  const {
    cloneResults = false,
    returnOriginal = true
  } = options;
  const results = [];
  for (const fn of asyncFns) {
    const result = isFunc(fn) ? await fn(results.length, cloneResults ? deepClone(results) : results) : returnOriginal ? fn : undefined;
    results.push(result);
  }
  return results;
};

const timedRun = async (fn, ...args) => {
  const [valid] = validate({
    fn
  }, {
    fn: isFunc
  });
  if (!valid) return [undefined, -1];
  const startTime = new Date();
  const result = await fn(...args);
  return [result, new Date() - startTime];
};

const throttle = (func, wait = 100) => {
  let waiting = false;
  return function (...args) {
    if (waiting) return;
    waiting = true;
    func.apply(this, args);
    return setTimeout(() => {
      waiting = false;
    }, wait);
  };
};

const throttleLast = (func, cb, wait = 100) => {
  let throttleTimeout;
  if (isNum(cb)) {
    wait = cb;
    cb = undefined;
  }
  return function (...args) {
    if (throttleTimeout) clearTimeout(throttleTimeout);
    throttleTimeout = setTimeout(() => {
      func.apply(this, args);
      clearTimeout(throttleTimeout);
    }, wait);
    typeof cb === 'function' && cb();
  };
};

const limbo = (promise, asObject = false) => {
  return !promise || !isFunc(promise.then) ? [new Error(`A promise or thenable is required as the first argument!`), asObject ? emptyObj : undefined] : promise.then(data => [null, data]).catch(err => [err, asObject ? emptyObj : undefined]);
};
const limboify = (cb, ...args) => {
  return limbo(new Promise((res, rej) => cb(...args, (err, success) => err ? rej(err) : res(success || true))));
};

const uuid = a => a ? (a ^ Math.random() * 16 >> a / 4).toString(16) : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, uuid);

const noOp = () => {};

const parseErrorMessage = exception => {
  return isStr(exception) && !isEmpty(exception) ? exception : isObj(exception) ? exception.message : null;
};

const defFilters = [`node:internal`, `node_modules/jest`];
const stackTracePaths = (filter = defFilters) => {
  const orgPreStackTrace = Error.prepareStackTrace;
  Error.prepareStackTrace = (_, stack) => stack;
  const stack = new Error().stack.slice(1);
  Error.prepareStackTrace = orgPreStackTrace;
  return stack.reduce((acc, cs) => {
    const loc = cs.getFileName();
    if (!loc) return acc;
    const ignore = isFunc(filter) ? filter(loc, cs, stack) : Boolean(filter.length && filter.find(filterLoc => loc.includes(filterLoc)));
    !ignore && acc.push(loc);
    return acc;
  }, []);
};

export { complement as a, doIt as b, checkCall as c, debounce as d, eitherFunc as e, throttle as f, throttleLast as g, limboify as h, limbo as l, memorize as m, noOp as n, parseErrorMessage as p, runSeq as r, stackTracePaths as s, timedRun as t, uuid as u };
//# sourceMappingURL=stackTracePaths-b8a4dbc2.js.map
