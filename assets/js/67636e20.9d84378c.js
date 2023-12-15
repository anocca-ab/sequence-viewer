"use strict";(self.webpackChunk_anocca_sequence_viewer_website=self.webpackChunk_anocca_sequence_viewer_website||[]).push([[6274],{2669:function(e,t,n){n.d(t,{Zo:function(){return p},kt:function(){return f}});var r=n(8851);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function u(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var c=r.createContext({}),l=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},p=function(e){var t=l(e.components);return r.createElement(c.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,c=e.parentName,p=u(e,["components","mdxType","originalType","parentName"]),m=l(n),f=a,d=m["".concat(c,".").concat(f)]||m[f]||s[f]||i;return n?r.createElement(d,o(o({ref:t},p),{},{components:n})):r.createElement(d,o({ref:t},p))}));function f(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,o=new Array(i);o[0]=m;var u={};for(var c in t)hasOwnProperty.call(t,c)&&(u[c]=t[c]);u.originalType=e,u.mdxType="string"==typeof e?e:a,o[1]=u;for(var l=2;l<i;l++)o[l]=n[l];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},666:function(e,t,n){n.r(t),n.d(t,{contentTitle:function(){return c},default:function(){return m},frontMatter:function(){return u},metadata:function(){return l},toc:function(){return p}});var r=n(801),a=n(3108),i=(n(8851),n(2669)),o=["components"],u={title:"getFont"},c=void 0,l={unversionedId:"api/sequence-viewer-utils.getfont",id:"api/sequence-viewer-utils.getfont",title:"getFont",description:"Home &gt; @anocca/sequence-viewer-utils &gt; getFont",source:"@site/docs/api/sequence-viewer-utils.getfont.md",sourceDirName:"api",slug:"/api/sequence-viewer-utils.getfont",permalink:"/sequence-viewer/docs/api/sequence-viewer-utils.getfont",editUrl:"https://github.com/facebook/docusaurus/edit/master/website/docs/api/sequence-viewer-utils.getfont.md",tags:[],version:"current",frontMatter:{title:"getFont"},sidebar:"apiSidebar",previous:{title:"DrawFunction",permalink:"/sequence-viewer/docs/api/sequence-viewer-utils.drawfunction"},next:{title:"getRatio",permalink:"/sequence-viewer/docs/api/sequence-viewer-utils.getratio"}},p=[{value:"Parameters",id:"parameters",children:[],level:2}],s={toc:p};function m(e){var t=e.components,n=(0,a.Z)(e,o);return(0,i.kt)("wrapper",(0,r.Z)({},s,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/sequence-viewer/docs/api/"},"Home")," ",">"," ",(0,i.kt)("a",{parentName:"p",href:"/sequence-viewer/docs/api/sequence-viewer-utils"},"@anocca/sequence-viewer-utils")," ",">"," ",(0,i.kt)("a",{parentName:"p",href:"/sequence-viewer/docs/api/sequence-viewer-utils.getfont"},"getFont")),(0,i.kt)("p",null,"Creates a font string based on fontSize and fontWeight"),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"Signature:")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-typescript"},"export declare function getFont(size: number, weight?: 'normal' | 'bold' | number): string;\n")),(0,i.kt)("h2",{id:"parameters"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:null},"Parameter"),(0,i.kt)("th",{parentName:"tr",align:null},"Type"),(0,i.kt)("th",{parentName:"tr",align:null},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"size"),(0,i.kt)("td",{parentName:"tr",align:null},"number"),(0,i.kt)("td",{parentName:"tr",align:null})),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"weight"),(0,i.kt)("td",{parentName:"tr",align:null},"'normal' ","|"," 'bold' ","|"," number"),(0,i.kt)("td",{parentName:"tr",align:null})))),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"Returns:")),(0,i.kt)("p",null,"string"))}m.isMDXComponent=!0}}]);