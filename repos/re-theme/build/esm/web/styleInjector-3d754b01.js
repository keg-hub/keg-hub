import{m as e,C as t,c as r,d as n,o,u as a,_ as c,b as l,h as s}from"./useTheme-342e9351.js";import i,{useMemo as u}from"react";import{hasDomAccess as f,isArr as m,isObj as d,splitByKeys as p,hashString as S,isStr as v,noPropArr as y,exists as h,hyphenator as b,flatArr as _,eitherArr as g,noOpObj as j}from"@keg-hub/jsutils";import x from"react-native-web/dist/modules/prefixStyles";import E from"react-native-web/dist/exports/StyleSheet/flattenStyle";import w from"react-native-web/dist/exports/StyleSheet/createReactDOMStyle";import C from"react-native-web/dist/exports/StyleSheet/createCompileableStyle";var N,T={important:[],filter:["aspectRatio","elevation","overlayColor","resizeMode","tintColor","backgroundSize","animationKeyframes","placeholderTextColor","pointerEvents","scrollbarWidth"],allowedStyleObject:["transform","shadowOffset","textShadowOffset","animationKeyframes"]},k=f(),O=new Set,selectorExists=function(e){return O.has(e)},getKegSheet=function(){return N=N||document.head.querySelector("#".concat(t.KEG_STYLES_TAG_ID))},formatSelectors=function(e,t,r,n){var o=h(n)?n:1,a=t.filter((function(e){return e&&r?e.startsWith(r):e})).reverse().slice(0,o).sort();return{selector:".".concat(a.concat([e]).join(".")).trim(),classNames:t.concat([e]).join(" ").trim()}},getSelector=function(e,t,r,n){var o="".concat(r,"-").concat(S(t)),a=m(e)?formatSelectors(o,e,r,n):v(e)?formatSelectors(o,e.split(" "),r,n):formatSelectors(o,y,r,n),c=a.selector;return{hashClass:o,classNames:a.classNames,selector:!selectorExists(c)&&c}},addStylesToDom=function(e,t){k&&t&&!selectorExists(e)&&(O.add(e),getKegSheet().sheet.insertRule("@media all {".concat(t.all,"}")))};e(t.BUILD_EVENT,(function(){O.clear(),getKegSheet().textContent=""})),function(){if(k){if(N=document.head.querySelector("#".concat(t.KEG_STYLES_TAG_ID)))return N;(N=document.createElement("style")).id=t.KEG_STYLES_TAG_ID,document.head.append(N)}}();var createBlock=function(e,t){var r=T.important.concat(null==t?void 0:t.important),n=x(w(e)),o=Object.keys(n).map((function(e){var t=function(e,t,r){return r.includes(e)?"".concat(t," !important"):t}(e,n[e],r),o=b(e);return m(t)?t.map((function(e){return"".concat(o,":").concat(e)})).join(";"):"".concat(o,":").concat(t)})).sort().join(";");return"{".concat(o,"}")},convertToCss=function(e,t){return _(g(e,[e])).reduce((function(e,n){if(!d(n))return e;var o=function(e,t){var n=m(t)?T.filter.concat(t):T.filter;if(Boolean(Object.entries(e).filter((function(e){var t=r(e,2),n=t[0],o=t[1];return d(o)&&!T.allowedStyleObject.includes(n)})).length))return{filtered:e};var o=p(e,n),a=r(o,2),c=a[0];return{style:a[1],filtered:c}}(n,null==t?void 0:t.filter),a=o.style,c=o.filtered;if(Object.assign(e.filtered,c),!a)return e;var l=E(a),s=C(l);return e.blocks.push(createBlock(s,t)),e}),{blocks:[],filtered:{}})},useStyleTag=function(e){var t,r,o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",a=arguments.length>2?arguments[2]:void 0;a=d(a)?a:j;var c=n(),l=null==c||null===(t=c.RTMeta)||void 0===t?void 0:t.size,s=null==c||null===(r=c.RTMeta)||void 0===r?void 0:r.key;return u((function(){var t=convertToCss(e,a),r=t.blocks,n=t.filtered,c=getSelector(o,r.join(""),a.prefix||"keg",a.maxSelectors),l=c.selector,s=c.classNames,i=r.reduce((function(e,t){var r="".concat(l).concat(t);return e.all+=r,e.rules.push(r),e}),{all:"",rules:[]});return addStylesToDom(l,i),{css:i,classNames:s,filteredStyle:n}}),[e,o,l,s,a])},K=["config","children","Component","className","styleProp","splitStyles"],R=j,buildConfig=function(e){var t=e.kegComponent?e.maxSelectors:R.maxSelectors;return s(s(s({},e),R),{},{maxSelectors:t||0})},G=i.forwardRef((function(e,t){var r=e.config,n=e.children,s=e.Component,u=e.className,f=e.styleProp,m=e.splitStyles,d=o(e,K),p=r.className,S=a(m),v=useStyleTag(S,u||p,r),y=v.classNames,h=v.filteredStyle;return i.createElement(s,c({},d,l({},f,h),{ref:t,className:y}),n)})),StyleInjector=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:j;return t=buildConfig(t),i.forwardRef((function(n,o){var a=n.__reStyleStylePropKey__||"style",s=p(n,[a,"__reStyleStylePropKey__"]),u=r(s,2),f=u[0],m=u[1],d=f[a];return d&&d!==j?i.createElement(G,c({},m,{ref:o,config:t,Component:e,splitStyles:d,styleProp:a})):i.createElement(e,c({},m,l({},a,d),{ref:o}))}))};StyleInjector.setConfig=function(e){d(e)||console.warn('Injector config must be an "Object". Instead got',e),R=e};export{StyleInjector as S,convertToCss as a,createBlock as c,useStyleTag as u};
//# sourceMappingURL=styleInjector-3d754b01.js.map