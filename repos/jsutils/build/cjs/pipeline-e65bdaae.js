'use strict';

var isArr = require('./isArr-39234014.js');
var isFunc = require('./isFunc-f93803cb.js');

const applyToFunc = (item, expression) => {
  if (isArr.isArr(expression)) {
    const [func, ...args] = expression;
    return func(item, ...args);
  } else if (isFunc.isFunc(expression)) {
    return expression(item);
  } else {
    console.error(`Pipeline expected either a function or an array (for function expressions). Found ${typeof expression}`);
    return item;
  }
};

const pipeline = (item, ...functions) => {
  return functions.reduce((result, fn) => applyToFunc(result, fn), item);
};

exports.applyToFunc = applyToFunc;
exports.pipeline = pipeline;
//# sourceMappingURL=pipeline-e65bdaae.js.map
