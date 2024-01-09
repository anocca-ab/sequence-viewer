"use strict";(self.webpackChunk_anocca_sequence_viewer_website=self.webpackChunk_anocca_sequence_viewer_website||[]).push([[578],{2669:function(e,t,n){n.d(t,{Zo:function(){return p},kt:function(){return d}});var r=n(8851);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=r.createContext({}),l=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=l(e.components);return r.createElement(s.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,s=e.parentName,p=c(e,["components","mdxType","originalType","parentName"]),m=l(n),d=a,f=m["".concat(s,".").concat(d)]||m[d]||u[d]||o;return n?r.createElement(f,i(i({ref:t},p),{},{components:n})):r.createElement(f,i({ref:t},p))}));function d(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=m;var c={};for(var s in t)hasOwnProperty.call(t,s)&&(c[s]=t[s]);c.originalType=e,c.mdxType="string"==typeof e?e:a,i[1]=c;for(var l=2;l<o;l++)i[l]=n[l];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},5722:function(e,t,n){n.r(t),n.d(t,{assets:function(){return p},contentTitle:function(){return s},default:function(){return d},frontMatter:function(){return c},metadata:function(){return l},toc:function(){return u}});var r=n(801),a=n(3108),o=(n(8851),n(2669)),i=["components"],c={slug:"welcome",title:"Welcome",tags:["anocca","sequence-viewer"]},s=void 0,l={permalink:"/sequence-viewer/blog/welcome",editUrl:"https://github.com/anocca-ab/sequence-viewer/edit/main/website/blog/blog/2022-03-14-welcome.md",source:"@site/blog/2022-03-14-welcome.md",title:"Welcome",description:"Anocca is now releasing our internal tool for displaying DNA and protein sequences as an open source library.",date:"2022-03-14T00:00:00.000Z",formattedDate:"March 14, 2022",tags:[{label:"anocca",permalink:"/sequence-viewer/blog/tags/anocca"},{label:"sequence-viewer",permalink:"/sequence-viewer/blog/tags/sequence-viewer"}],readingTime:.78,truncated:!1,authors:[],frontMatter:{slug:"welcome",title:"Welcome",tags:["anocca","sequence-viewer"]}},p={authorsImageUrls:[]},u=[],m={toc:u};function d(e){var t=e.components,n=(0,a.Z)(e,i);return(0,o.kt)("wrapper",(0,r.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"Anocca is now releasing our internal tool for displaying DNA and protein sequences as an open source library."),(0,o.kt)("p",null,"There are a few open source sequence viewers out there such as ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/Lattice-Automation/seqviz"},"SeqViz")," and the ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/TeselaGen/openVectorEditor"},"openVectorEditor"),". "),(0,o.kt)("p",null,"The things we were looking for in a sequence viewer was:"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"modularity - we don't want a library full of features which we don't use. We want to be able to pick the features we are looking for"),(0,o.kt)("li",{parentName:"ol"},"non-wrapping linear viewer - we like the linear viewer which doesn't wrap but instead supports zoom and pan"),(0,o.kt)("li",{parentName:"ol"},"custom rendering of annotations")),(0,o.kt)("p",null,"The Anocca sequence viewer consists of a set of npm modules named ",(0,o.kt)("inlineCode",{parentName:"p"},"@anocca/sequence-viewer-*")," which allows for modularity. None of the sequence viewer npm modules has any third party dependencies and consists of commonjs and es6 code as well as typescript definitions."),(0,o.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,o.kt)("div",{parentName:"div",className:"admonition-heading"},(0,o.kt)("h5",{parentName:"div"},(0,o.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,o.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,o.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,o.kt)("div",{parentName:"div",className:"admonition-content"},(0,o.kt)("p",{parentName:"div"},"@anocca/sequence-viewer-app has react-icons, @mui/material, @emotion/react, @emotion/styled and formik as peer dependencies."),(0,o.kt)("p",{parentName:"div"},"See ",(0,o.kt)("a",{parentName:"p",href:"/docs/api/sequence-viewer-app.sequenceviewerapp"},"SequenceViewerApp")," and ",(0,o.kt)("a",{parentName:"p",href:"/docs/tutorial/get-started"},"Getting started")))))}d.isMDXComponent=!0}}]);