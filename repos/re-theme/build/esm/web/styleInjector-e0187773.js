import{k as e,C as t,u as r,n,a as o}from"./useTheme-c1a60747.js";import a,{useMemo as c}from"react";import{hasDomAccess as i,omitKeys as l,pickKeys as s,isArr as u,exists as f,isStr as d,hashString as m,hyphenator as p,flatArr as v,eitherArr as y,isObj as h}from"@keg-hub/jsutils";import S from"react-native-web/dist/modules/prefixStyles";import b from"react-native-web/dist/exports/StyleSheet/flattenStyle";import E from"react-native-web/dist/exports/StyleSheet/createReactDOMStyle";import g from"react-native-web/dist/exports/StyleSheet/createCompileableStyle";var C,T={important:[],filter:["aspectRatio","elevation","overlayColor","resizeMode","tintColor","backgroundSize","animationKeyframes","placeholderTextColor","pointerEvents","scrollbarWidth"]},k=i(),_=new Set,getKegSheet=function(){return C=C||document.head.querySelector(t.KEG_STYLES_TAG_ID)},getSelector=function(e,t,r){var filterWithPrefix=function(e){return e&&r?e.startsWith(r):e},n=!!f(e)&&(u(e)?e.filter(filterWithPrefix).pop():d(e)&&e.split(" ").filter(filterWithPrefix).pop()),o="keg-".concat(m(t));return{hashClass:o,selector:n?".".concat(n.trim(),".").concat(o).trim():".".concat(o).trim()}},addStylesToDom=function(e,t){if(k&&t&&!function(e){return _.has(e)}(e)){_.add(e);var r=getKegSheet();r.sheet.insertRule("@media all {".concat(t.all,"}"))}};e(t.BUILD_EVENT,(function(){_.clear(),getKegSheet().textContent=""})),function(){if(k){if(C=document.head.querySelector(t.KEG_STYLES_TAG_ID))return C;(C=document.createElement("style")).id=t.KEG_STYLES_TAG_ID,document.head.append(C)}}();var j=Object.freeze({}),createBlock=function(e,t){var r=T.important.concat(null==t?void 0:t.important),n=S(E(e)),o=Object.keys(n).map((function(e){var t=function(e,t,r){return r.includes(e)?"".concat(t," !important"):t}(e,n[e],r),o=p(e);return u(t)?t.map((function(e){return"".concat(o,":").concat(e)})).join(";"):"".concat(o,":").concat(t)})).sort().join(";");return"{".concat(o,"}")},convertToCss=function(e,t){return v(y(e,[e])).reduce((function(e,r){if(!h(r))return e;var n=function(e,t){var r=u(t)?T.filter.concat(t):T.filter;return{style:l(e,r),filtered:s(e,r)}}(r,null==t?void 0:t.filter),o=n.style,a=n.filtered;Object.assign(e.filtered,a);var c=b(o),i=g(c);return e.blocks.push(createBlock(i,t)),e}),{blocks:[],filtered:{}})},useStyleTag=function(e){var t,n,o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",a=arguments.length>2?arguments[2]:void 0;a=h(a)?a:j;var i=r(),l=null==i||null===(t=i.RTMeta)||void 0===t?void 0:t.size,s=null==i||null===(n=i.RTMeta)||void 0===n?void 0:n.key;return c((function(){var t=convertToCss(e,a),r=t.blocks,n=t.filtered,c=getSelector(o,r.join(""),"keg"),i=c.hashClass,l=c.selector,s=r.reduce((function(e,t){var r="".concat(l).concat(t);return e.all+=r,e.rules.push(r),e}),{all:"",rules:[]});return addStylesToDom(l,s),{css:s,filteredStyle:n,classList:y(o,[o]).concat([i])}}),[e,o,l,s,a])},w=a.forwardRef((function(e,t){var r=e.Component,c=e.children,i=e.config,l=e.className,s=e.style,u=n(e,["Component","children","config","className","style"]),f=i.className,m=useStyleTag(s,l||f,i),p=m.classList,v=m.filteredStyle;return a.createElement(r,o({},u,{style:v,className:d(r)?p.join(" "):p,ref:t}),c)})),StyleInjector=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return a.forwardRef((function(r,c){var i=r.style,l=n(r,["style"]);return i?a.createElement(w,o({},l,{style:i,config:t,Component:e,ref:c})):a.createElement(e,o({},l,{style:i,ref:c}))}))};export{StyleInjector as S,convertToCss as a,createBlock as c,useStyleTag as u};
//# sourceMappingURL=styleInjector-e0187773.js.map