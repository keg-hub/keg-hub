'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-d23df5c1.js');
var icon = require('./icon-a5269604.js');
var withTouch = require('./withTouch.js');
require('react');
require('@keg-hub/jsutils');
require('@keg-hub/re-theme/colors');
require('@keg-hub/re-theme');
require('./useThemeWithHeight.js');
require('react-native');
var touchable = require('./touchable-ab081983.js');
require('./view.native-6338852a.js');
require('./useClassName.native-3d1a229b.js');
require('./renderFromType.js');
require('./isValidComponent.js');
require('./useThemePath.js');
require('./useClassList.native-9e7810c9.js');
require('./touchable.js');
require('@keg-hub/re-theme/styleInjector');

var TouchableIcon = withTouch.withTouch(icon.Icon);
TouchableIcon.propTypes = _rollupPluginBabelHelpers._objectSpread2(_rollupPluginBabelHelpers._objectSpread2({}, touchable.Touchable.propTypes), icon.Icon.propTypes);

exports.TouchableIcon = TouchableIcon;
//# sourceMappingURL=touchableIcon.js.map
