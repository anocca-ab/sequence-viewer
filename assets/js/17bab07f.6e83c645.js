"use strict";(self.webpackChunk_anocca_sequence_viewer_website=self.webpackChunk_anocca_sequence_viewer_website||[]).push([[767],{2669:function(e,t,r){r.d(t,{Zo:function(){return p},kt:function(){return f}});var n=r(8851);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function c(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var u=n.createContext({}),l=function(e){var t=n.useContext(u),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},p=function(e){var t=l(e.components);return n.createElement(u.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,i=e.originalType,u=e.parentName,p=c(e,["components","mdxType","originalType","parentName"]),m=l(r),f=a,d=m["".concat(u,".").concat(f)]||m[f]||s[f]||i;return r?n.createElement(d,o(o({ref:t},p),{},{components:r})):n.createElement(d,o({ref:t},p))}));function f(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=r.length,o=new Array(i);o[0]=m;var c={};for(var u in t)hasOwnProperty.call(t,u)&&(c[u]=t[u]);c.originalType=e,c.mdxType="string"==typeof e?e:a,o[1]=c;for(var l=2;l<i;l++)o[l]=r[l];return n.createElement.apply(null,o)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},430:function(e,t,r){r.r(t),r.d(t,{contentTitle:function(){return u},default:function(){return m},frontMatter:function(){return c},metadata:function(){return l},toc:function(){return p}});var n=r(801),a=r(3108),i=(r(8851),r(2669)),o=["components"],c={title:"getRatio"},u=void 0,l={unversionedId:"api/sequence-viewer-utils.getratio",id:"api/sequence-viewer-utils.getratio",title:"getRatio",description:"Home &gt; @anocca/sequence-viewer-utils &gt; getRatio",source:"@site/docs/api/sequence-viewer-utils.getratio.md",sourceDirName:"api",slug:"/api/sequence-viewer-utils.getratio",permalink:"/sequence-viewer/docs/api/sequence-viewer-utils.getratio",editUrl:"https://github.com/facebook/docusaurus/edit/master/website/docs/api/sequence-viewer-utils.getratio.md",tags:[],version:"current",frontMatter:{title:"getRatio"},sidebar:"apiSidebar",previous:{title:"getFont",permalink:"/sequence-viewer/docs/api/sequence-viewer-utils.getfont"},next:{title:"Matrix",permalink:"/sequence-viewer/docs/api/sequence-viewer-utils.matrix"}},p=[{value:"Parameters",id:"parameters",children:[],level:2}],s={toc:p};function m(e){var t=e.components,r=(0,a.Z)(e,o);return(0,i.kt)("wrapper",(0,n.Z)({},s,r,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/sequence-viewer/docs/api/"},"Home")," ",">"," ",(0,i.kt)("a",{parentName:"p",href:"/sequence-viewer/docs/api/sequence-viewer-utils"},"@anocca/sequence-viewer-utils")," ",">"," ",(0,i.kt)("a",{parentName:"p",href:"/sequence-viewer/docs/api/sequence-viewer-utils.getratio"},"getRatio")),(0,i.kt)("p",null,"Get the device pixel ratio"),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"Signature:")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-typescript"},"export declare function getRatio(context: CanvasRenderingContext2D): {\n    ratio: number;\n    shouldScale: boolean;\n};\n")),(0,i.kt)("h2",{id:"parameters"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:null},"Parameter"),(0,i.kt)("th",{parentName:"tr",align:null},"Type"),(0,i.kt)("th",{parentName:"tr",align:null},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"context"),(0,i.kt)("td",{parentName:"tr",align:null},"CanvasRenderingContext2D"),(0,i.kt)("td",{parentName:"tr",align:null})))),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"Returns:")),(0,i.kt)("p",null,"{ ratio: number; shouldScale: boolean; }"))}m.isMDXComponent=!0}}]);