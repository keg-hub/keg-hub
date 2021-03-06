'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('./_rollupPluginBabelHelpers-d23df5c1.js');
var React = require('react');
var row = require('./row.js');
var container = require('./container.js');
var useClassList_native = require('./useClassList.native-9e7810c9.js');
var jsutils = require('@keg-hub/jsutils');
var reTheme = require('@keg-hub/re-theme');
require('./view.native-6338852a.js');
require('react-native');
require('./useClassName.native-3d1a229b.js');
require('./getPressHandler.js');
require('./getPlatform-24228c6c.js');
require('@keg-hub/re-theme/colors');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var _excluded = ["className", "children", "style"];
var useBuildCenterStyles = function useBuildCenterStyles(isCenter) {
  return React.useMemo(function () {
    if (!isCenter) return;
    return isCenter === 'x' || isCenter === 'xaxis' || isCenter === 'x-axis' ? {
      justifyContent: 'center'
    } : isCenter === 'y' || isCenter === 'yaxis' || isCenter === 'y-axis' ? {
      alignItems: 'center'
    } : isCenter && {
      alignItems: 'center',
      justifyContent: 'center'
    } || {};
  }, [isCenter]);
};
var useChildAttrs = function useChildAttrs(children) {
  return React.useMemo(function () {
    return children.reduce(function (attrs, child) {
      var _child$props;
      if (attrs !== null && attrs !== void 0 && attrs.isRow && attrs !== null && attrs !== void 0 && attrs.isCenter) return attrs;
      if (!(attrs !== null && attrs !== void 0 && attrs.isRow) && child && (child === null || child === void 0 ? void 0 : child.type) === row.Row) attrs.isRow = true;
      if (!(attrs !== null && attrs !== void 0 && attrs.isCenter) && child && child !== null && child !== void 0 && child.props && child !== null && child !== void 0 && (_child$props = child.props) !== null && _child$props !== void 0 && _child$props.center) attrs.isCenter = child.props.center.toString().toLowerCase();
      return attrs;
    }, {
      isRow: false,
      isCenter: false
    });
  }, [children]);
};
var Grid = function Grid(_ref) {
  _ref.className;
      var children = _ref.children,
      style = _ref.style,
      props = _rollupPluginBabelHelpers._objectWithoutProperties(_ref, _excluded);
  var _useChildAttrs = useChildAttrs(jsutils.ensureArr(children)),
      isRow = _useChildAttrs.isRow,
      isCenter = _useChildAttrs.isCenter;
  var classNames = useClassList_native.useClassList();
  var centerStyles = useBuildCenterStyles(isCenter);
  var containerStyle = reTheme.useStyle('layout.grid.wrapper', style, centerStyles);
  return React__default["default"].createElement(container.Container, _rollupPluginBabelHelpers._extends({}, props, {
    size: 1,
    style: containerStyle,
    className: classNames,
    flexDir: isRow ? 'column' : 'row'
  }), children);
};

exports.Grid = Grid;
//# sourceMappingURL=grid.js.map
