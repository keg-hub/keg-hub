'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-d23df5c1.js');
var jsutils = require('@keg-hub/jsutils');

var getPressHandler = function getPressHandler(isWeb, onClick, onPress) {
  var action = onClick || onPress;
  return jsutils.isFunc(action) && _rollupPluginBabelHelpers._defineProperty({}, isWeb ? 'onClick' : 'onPress', onClick || onPress) || {};
};

exports.getPressHandler = getPressHandler;
//# sourceMappingURL=getPressHandler.js.map
