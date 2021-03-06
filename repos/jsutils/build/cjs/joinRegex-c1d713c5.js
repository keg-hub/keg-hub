'use strict';

var isStr = require('./isStr-8a57710e.js');
var isArr = require('./isArr-39234014.js');
require('./validate-23297ec2.js');
require('./noOps-9b0be865.js');
require('./match-36a26d13.js');

const isRegex = val => Boolean(val && val instanceof RegExp);

const getRegexSource = maybeRx => isRegex(maybeRx) ? maybeRx.source : isStr.isStr(maybeRx) ? maybeRx : null;

const parseArgs = args => {
  if (isArr.isArr(args[0])) return [args[0], args[1]];
  const last = args[args.length - 1];
  const options = isStr.isStr(last) ? last : undefined;
  const expressions = options ? args.splice(0, args.length - 1) : args;
  return [expressions, options];
};
const joinRegex = (...args) => {
  const [expressions, options] = parseArgs(args);
  const source = expressions.reduce((joined, next) => {
    const nextSource = getRegexSource(next);
    return !nextSource ? joined : joined === '' ? nextSource : `${joined}|${nextSource}`;
  }, '');
  return new RegExp(`(${source})`, options);
};

exports.getRegexSource = getRegexSource;
exports.isRegex = isRegex;
exports.joinRegex = joinRegex;
//# sourceMappingURL=joinRegex-c1d713c5.js.map
