'use strict';

var isFunc = require('./isFunc-f93803cb.js');
var isArr = require('./isArr-39234014.js');
var isColl = require('./isColl-5757310a.js');

const updateColl = (obj, path, type, val) => {
  const org = obj;
  if (!isColl.isColl(obj) || !obj || !path) return type !== 'set' && val || undefined;
  const parts = isArr.isArr(path) ? Array.from(path) : path.split('.');
  const key = parts.pop();
  let prop;
  let breakPath;
  while (prop = parts.shift()) {
    const next = obj[prop];
    isColl.isColl(next) || isFunc.isFunc(next) ? obj = next : (() => {
      if (type === 'set') obj[prop] = {};else breakPath = true;
      obj = obj[prop];
    })();
    if (breakPath) return val;
  }
  return type === 'get' ?
  key in obj ? obj[key] : val : type === 'unset' ?
  delete obj[key] :
  (obj[key] = val) && org || org;
};

const set = (obj, path, val) => {
  updateColl(obj, path, 'set', val);
  return obj;
};

exports.set = set;
exports.updateColl = updateColl;
//# sourceMappingURL=set-c0a98b21.js.map
