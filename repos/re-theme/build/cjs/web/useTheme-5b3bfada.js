"use strict";var e,r=require("@keg-hub/jsutils"),t=require("react"),n=(e=t)&&"object"==typeof e&&"default"in e?e.default:e,o=r.deepFreeze({BUILD_EVENT:"build",CHANGE_EVENT:"change",RESIZE_EVENT:"resize",ADD_EVENT:"addEventListener",REMOVE_EVENT:"removeEventListener",KEG_STYLES_TAG_ID:"keg-components-stylesheet",PLATFORM:{NATIVE:"$native",IOS:"$ios",android:"$android",WEB:"$web",ALL:"$all"}}),i=r.hasDomAccess()?window:{devicePixelRatio:void 0,innerHeight:void 0,innerWidth:void 0,width:void 0,height:void 0,screen:{height:void 0,width:void 0}},setScreen=function(e){return{fontScale:1,height:e.screen.height,scale:e.devicePixelRatio||1,width:e.screen.width}},setWin=function(e){return{fontScale:1,height:e.innerHeight,scale:e.devicePixelRatio||1,width:e.innerWidth}},a={window:setWin(i),screen:setScreen(i)},u={},update=function(){a.window=setWin(i),a.screen=setScreen(i),r.isArr(u[o.CHANGE_EVENT])&&u[o.CHANGE_EVENT].forEach((function(e){return!e.shouldUnmount&&e(a)}))};r.hasDomAccess()&&r.checkCall((function(){return e=window,t=o.RESIZE_EVENT,n=r.debounce(update,100),void(e&&r.checkCall(e.addEventListener,t,n,i||!1));var e,t,n,i}));var s={get:function(e){return a[e]},set:function(e){var r=e.screen,t=e.window;r&&(a.screen=r),t&&(a.window=t)},update:update,addEventListener:function(e,t){e&&r.isFunc(t)&&(u[e]=u[e]||[],u[e].push(t))},removeEventListener:function(e,t){e&&r.isFunc(t)&&r.isArr(u[e])&&(u[e]=u[e].filter((function(e){return e!==t})))}};function _defineProperty(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function _extends(){return(_extends=Object.assign||function(e){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e}).apply(this,arguments)}function ownKeys(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function _objectSpread2(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?ownKeys(Object(t),!0).forEach((function(r){_defineProperty(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):ownKeys(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function _objectWithoutProperties(e,r){if(null==e)return{};var t,n,o=function(e,r){if(null==e)return{};var t,n,o={},i=Object.keys(e);for(n=0;n<i.length;n++)t=i[n],r.indexOf(t)>=0||(o[t]=e[t]);return o}(e,r);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)t=i[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}function _slicedToArray(e,r){return function(e){if(Array.isArray(e))return e}(e)||function(e,r){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var t=[],n=!0,o=!1,i=void 0;try{for(var a,u=e[Symbol.iterator]();!(n=(a=u.next()).done)&&(t.push(a.value),!r||t.length!==r);n=!0);}catch(e){o=!0,i=e}finally{try{n||null==u.return||u.return()}finally{if(o)throw i}}return t}(e,r)||_unsupportedIterableToArray(e,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function _toConsumableArray(e){return function(e){if(Array.isArray(e))return _arrayLikeToArray(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||_unsupportedIterableToArray(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function _unsupportedIterableToArray(e,r){if(e){if("string"==typeof e)return _arrayLikeToArray(e,r);var t=Object.prototype.toString.call(e).slice(8,-1);return"Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t?Array.from(e):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?_arrayLikeToArray(e,r):void 0}}function _arrayLikeToArray(e,r){(null==r||r>e.length)&&(r=e.length);for(var t=0,n=new Array(r);t<r;t++)n[t]=e[t];return n}var f={},fireThemeEvent=function(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),o=1;o<t;o++)n[o-1]=arguments[o];r.isArr(f[e])&&f[e].forEach((function(e){return e.apply(void 0,n)}))},d={entries:[["$xsmall",1],["$small",320],["$medium",768],["$large",1024],["$xlarge",1366]],hash:{},indexes:{}},buildSizeMapParts=function(){d.indexes=d.entries.reduce((function(e,r,t){return e[r[0]]=t,e[t]=r[0],d.hash[r[0]]=r[1],e}),{})},getSize=function(e){var t=r.isNum(e)&&e||r.toNum(e),n=d.entries.reduce((function(e,r){var n=_slicedToArray(r,2),o=n[0],i=n[1];return t>=i&&(e?i>d.hash[e]&&(e=o):e=o),e}),"$xsmall");return[n,d.hash[n]]},getMergeSizes=function(e){return d.entries.slice(0,d.indexes[e]+1).map((function(e){var r=_slicedToArray(e,2),t=r[0];r[1];return t}))};buildSizeMapParts();var c,l,getSizeMap=function(){return d},p=(_defineProperty(c={m:"margin",mT:"marginTop",mB:"marginBottom",mR:"marginRight",mL:"marginLeft",mH:"marginHorizontal",mV:"marginVertical",p:"padding",pT:"paddingTop",pB:"paddingBottom",pR:"paddingRight",pL:"paddingLeft",pH:"paddingHorizontal",pV:"paddingVertical",bC:"borderColor",bCT:"borderTopColor",bCB:"borderBottomColor",bCR:"borderRightColor",bCL:"borderLeftColor",bW:"borderWidth",bS:"borderStyle"},"bC","borderColor"),_defineProperty(c,"bRad","borderRadius"),_defineProperty(c,"c","color"),_defineProperty(c,"bg","background"),_defineProperty(c,"bgC","backgroundColor"),_defineProperty(c,"d","display"),_defineProperty(c,"ovf","overflow"),_defineProperty(c,"ovfX","overflowX"),_defineProperty(c,"ovfY","overflowY"),_defineProperty(c,"pos","position"),_defineProperty(c,"z","zIndex"),_defineProperty(c,"tp","top"),_defineProperty(c,"bt","bottom"),_defineProperty(c,"btm","bottom"),_defineProperty(c,"lt","left"),_defineProperty(c,"rt","right"),_defineProperty(c,"bxS","boxShadow"),_defineProperty(c,"op","opacity"),_defineProperty(c,"ptrE","pointerEvents"),_defineProperty(c,"otl","outline"),_defineProperty(c,"fl","flex"),_defineProperty(c,"flD","flexDirection"),_defineProperty(c,"flWr","flexWrap"),_defineProperty(c,"flB","flexBasis"),_defineProperty(c,"flS","flexShrink"),_defineProperty(c,"jtC","justifyContent"),_defineProperty(c,"alC","alignContent"),_defineProperty(c,"alS","alignSelf"),_defineProperty(c,"alI","alignItems"),_defineProperty(c,"w","width"),_defineProperty(c,"h","height"),_defineProperty(c,"minH","minHeight"),_defineProperty(c,"maxH","maxHeight"),_defineProperty(c,"minW","minWidth"),_defineProperty(c,"maxW","maxWidth"),_defineProperty(c,"ftF","fontFamily"),_defineProperty(c,"ftSz","fontSize"),_defineProperty(c,"ftS","fontStyle"),_defineProperty(c,"ftWt","fontWeight"),_defineProperty(c,"lnH","lineHeight"),_defineProperty(c,"ltrS","letterSpacing"),_defineProperty(c,"txAl","textAlign"),_defineProperty(c,"txDc","textDecoration"),_defineProperty(c,"txDL","textDecorationLine"),c),y={OS:"web",select:function(e){return r.isObj(e)&&e.web},Version:"ReTheme"},getRNPlatform=function(){return l||y},buildPlatforms=function(e){var t,n,i=Object.keys(e).filter((function(r){return e[r]}));return(t=getRNPlatform(),n=["$"+r.get(t,"OS")],"web"!==r.get(t,"OS")&&n.push("$native"),n.concat([o.PLATFORM.ALL])).reduce((function(r,t){return!1!==e[t]&&-1===r.indexOf(t)&&r.unshift(t),r}),i)},h=function buildSizedThemes(e,t,n){return r.reduceObj(e,(function(t,o,i){if(p[t]&&(r.unset(e,t),e[p[t]]=o),!r.isObj(o))return i;if(t===n){var a=r.deepMerge(i,o);return r.unset(e,[n]),a}var u=buildSizedThemes(o,i[t]||{},n);return r.isEmpty(u)||(i[t]=u),i}),t)},updatePlatformTheme=function(e,t,n){if(!r.isObj(n))return n;var o=n.$class,i=n.$className,a=_objectWithoutProperties(n,["$class","$className"]),u=getPlatformTheme(function(e,t){var n=getSizeMap(),o=[],i=Object.keys(e).reduce((function(r,i){return"$"!==i[0]||n.hash[i]?r[i]=e[i]:-1!==t.indexOf(i)&&o.push(e[i]),r}),{});return o.length?r.deepMerge.apply(void 0,o):i}(a,e),e,t),s=i||o;return s&&(u.$class=s),u},getPlatformTheme=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return e?r.reduceObj(e,(function(e,r,o){return o[e]=updatePlatformTheme(t,n,r),o}),e):e},m={},getCurrentTheme=function(){return m},getTheme=function(){for(var e=getCurrentTheme(),t=arguments.length,n=new Array(t),o=0;o<t;o++)n[o]=arguments[o];return r.deepMerge.apply(void 0,_toConsumableArray(n.reduce((function(t,n){var o=r.isObj(n)?n:r.isStr(n)||r.isArr(n)?r.get(e,n):null;return o&&t.push(o),t}),[])))},b={},mergeWithDefault=function(e,t,n){return function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=getRNPlatform();return Object.keys(getSizeMap().hash).reduce((function(t,n){var o=h(e,e[n]||{},n);return r.isEmpty(o)||(t[n]=o),t}),getPlatformTheme(e,buildPlatforms(t),n))}(t&&e!==t?r.deepMerge(t,e):r.deepMerge({},e),n)},buildTheme=function(e,t,n,o,i){if(!r.isObj(e))return e;r.isObj(i)||(i={});var a=_slicedToArray(getSize(t),2),u=a[0],s={key:u,size:a[1],width:t,height:n};if(b&&e===b.theme)return useCachedTheme(b,s);var f=mergeWithDefault(e,o,i),d=(f.$xsmall,f.$small,f.$medium,f.$large,f.$xlarge,_objectWithoutProperties(f,["$xsmall","$small","$medium","$large","$xlarge"]));return configureBuiltTheme(b={extraTheme:d,mergedTheme:f,theme:e,key:u},s)},useCachedTheme=function(e,t){return t.key!==e.key?configureBuiltTheme(e,t):r.checkCall((function(){var e=getCurrentTheme();return fireThemeEvent(o.BUILD_EVENT,e),e}))},configureBuiltTheme=function(e,t){var n=e.mergedTheme,i=e.extraTheme;b.key=t.key;var a=t.size?function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},o=getMergeSizes(t);return r.deepMerge.apply(void 0,[n].concat(_toConsumableArray(o.reduce((function(r,t){return e[t]&&r.push(e[t]),r}),[]))))}(n,t.key,i):i;return a.get=getTheme,a.RTMeta=_objectSpread2(_objectSpread2({},a.RTMeta),t),m=a,fireThemeEvent(o.BUILD_EVENT,a),a},g={},getDefaultTheme=function(){return g},v=n.createContext(getDefaultTheme());exports.Constants=o,exports.Dimensions=s,exports.ReThemeContext=v,exports._defineProperty=_defineProperty,exports._extends=_extends,exports._objectSpread2=_objectSpread2,exports._objectWithoutProperties=_objectWithoutProperties,exports._slicedToArray=_slicedToArray,exports._toConsumableArray=_toConsumableArray,exports.addThemeEvent=function(e,t){if(e&&r.isFunc(t))return f[e]=f[e]||[],f[e].push(t),f[e].length-1},exports.buildTheme=buildTheme,exports.fireThemeEvent=fireThemeEvent,exports.getCurrentTheme=getCurrentTheme,exports.getDefaultTheme=getDefaultTheme,exports.getMergeSizes=getMergeSizes,exports.getSize=getSize,exports.getSizeMap=getSizeMap,exports.removeThemeEvent=function(e,t){e&&f[e]&&(t||0===t)&&(r.isNum(t)?f[e].splice(t,1):r.isFunc(t)&&r.isArr(f[e])&&(f[e]=f[e].filter((function(e){return e!==t}))))},exports.setDefaultTheme=function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];if(!r.isObj(e))return console.warn("setDefaultTheme method requires an theme object as the first argument. Received: ",e);g=t?r.deepMerge(g,e):e;var n=s.get("window"),o=buildTheme(g,n.width,n.height);return o},exports.setRNPlatform=function(e){l=e},exports.setSizes=function(e){return r.isObj(e)?(r.mapObj(e,(function(t,n){var o=d.indexes[t];if(!r.softFalsy(o))return r.logData("Invalid ".concat(t," for theme size! Allowed keys are xsmall | small | medium | large | xlarge"),"warn");var i=r.toNum(e[t]);if(!i||!d.entries[o])return r.logData("Invalid size entry. Size must be a number and the size entry must exist!","Size: ".concat(i),"Entry: ".concat(d.entries[o]),"warn");d.entries[o]=[t,i]})),buildSizeMapParts(),d):r.logData("setDimensions method requires an argument of type 'Object'.\nReceived: ",e,"error")},exports.useTheme=function(){return t.useContext(v)};
//# sourceMappingURL=useTheme-5b3bfada.js.map