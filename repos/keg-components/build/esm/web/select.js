import { d as _objectWithoutProperties, e as _extends, a as _defineProperty } from './_rollupPluginBabelHelpers-eca9940e.js';
import React__default from 'react';
import { V as View } from './view-23665db9.js';
import { S as Select$1 } from './select-1a68b99c.js';
import '@keg-hub/jsutils';
import { getValueFromChildren, getInputValueKey } from './getInputValue.js';
import '@keg-hub/re-theme/colors';
import { useSelectHandlers } from './useSelectHandlers.js';
import { useThemePath } from './useThemePath.js';
import './useThemeWithHeight.js';
import 'react-native-web';
import { u as useClassName } from './useClassName-52067a95.js';
import { u as useThemeTypeAsClass } from './useThemeTypeAsClass-1d2ed78d.js';
import './svgIcon-389f9d70.js';
import { C as ChevronDown } from './chevronDown-ba9bb372.js';
import { I as Icon } from './icon-b6da5cf9.js';
import { StyleInjector } from '@keg-hub/re-theme/styleInjector';
import './view.native-f56118b2.js';
import './validateFunctions.js';
import '@keg-hub/re-theme';
import './updateClassNames.js';
import './ensureClassArray.js';
import './handleRefUpdate.js';
import './colors-6402d3b3.js';
import './useClassList-1d418045.js';
import './svgIcon.native-e0c41d6c.js';
import 'react-native-svg-web';
import './renderFromType.js';
import './isValidComponent.js';

var _excluded = ["className", "children", "disabled", "readOnly", "onChange", "onValueChange", "style", "styles", "type", "themePath", "value"];
var KegSelect = StyleInjector(Select$1, {
  maxSelectors: 0,
  kegComponent: true,
  displayName: 'Select',
  className: 'keg-select'
});
var getValue = function getValue(props) {
  var children = props.children,
      onChange = props.onChange,
      onValueChange = props.onValueChange,
      readOnly = props.readOnly,
      value = props.value;
  var setValue = getValueFromChildren(value, children);
  var valKey = getInputValueKey(false, onChange, onValueChange, readOnly);
  return _defineProperty({}, valKey, setValue);
};
var Select = React__default.forwardRef(function (props, ref) {
  var _selectStyles$icon, _selectStyles$icon$di;
  var className = props.className,
      children = props.children,
      disabled = props.disabled;
      props.readOnly;
      var onChange = props.onChange,
      onValueChange = props.onValueChange,
      style = props.style,
      styles = props.styles,
      _props$type = props.type,
      type = _props$type === void 0 ? 'default' : _props$type,
      _props$themePath = props.themePath,
      themePath = _props$themePath === void 0 ? "form.select.".concat(type) : _props$themePath;
      props.value;
      var elProps = _objectWithoutProperties(props, _excluded);
  var selectStyles = useThemePath(themePath, styles);
  var selectClasses = useThemeTypeAsClass(themePath || type, 'keg-select', className);
  var classRef = useClassName('keg-select', selectClasses, ref);
  return React__default.createElement(View, {
    style: [selectStyles.main, style]
  }, React__default.createElement(KegSelect, _extends({
    ref: classRef
  }, elProps, {
    enabled: !disabled,
    style: [selectStyles.select]
  }, getValue(props), useSelectHandlers({
    onChange: onChange,
    onValueChange: onValueChange
  })), children), React__default.createElement(Icon, {
    styles: selectStyles.icon,
    Component: ChevronDown,
    color: disabled && ((_selectStyles$icon = selectStyles.icon) === null || _selectStyles$icon === void 0 ? void 0 : (_selectStyles$icon$di = _selectStyles$icon.disabled) === null || _selectStyles$icon$di === void 0 ? void 0 : _selectStyles$icon$di.color)
  }));
});

export { Select };
//# sourceMappingURL=select.js.map
