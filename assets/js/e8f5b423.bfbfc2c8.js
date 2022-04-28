"use strict";(self.webpackChunk_anocca_sequence_viewer_website=self.webpackChunk_anocca_sequence_viewer_website||[]).push([[1174],{2669:function(e,n,t){t.d(n,{Zo:function(){return l},kt:function(){return d}});var r=t(8851);function i(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function a(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function c(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?a(Object(t),!0).forEach((function(n){i(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function o(e,n){if(null==e)return{};var t,r,i=function(e,n){if(null==e)return{};var t,r,i={},a=Object.keys(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||(i[t]=e[t]);return i}(e,n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(i[t]=e[t])}return i}var u=r.createContext({}),s=function(e){var n=r.useContext(u),t=n;return e&&(t="function"==typeof e?e(n):c(c({},n),e)),t},l=function(e){var n=s(e.components);return r.createElement(u.Provider,{value:n},e.children)},p={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},f=r.forwardRef((function(e,n){var t=e.components,i=e.mdxType,a=e.originalType,u=e.parentName,l=o(e,["components","mdxType","originalType","parentName"]),f=s(t),d=i,w=f["".concat(u,".").concat(d)]||f[d]||p[d]||a;return t?r.createElement(w,c(c({ref:n},l),{},{components:t})):r.createElement(w,c({ref:n},l))}));function d(e,n){var t=arguments,i=n&&n.mdxType;if("string"==typeof e||i){var a=t.length,c=new Array(a);c[0]=f;var o={};for(var u in n)hasOwnProperty.call(n,u)&&(o[u]=n[u]);o.originalType=e,o.mdxType="string"==typeof e?e:i,c[1]=o;for(var s=2;s<a;s++)c[s]=t[s];return r.createElement.apply(null,c)}return r.createElement.apply(null,t)}f.displayName="MDXCreateElement"},5407:function(e,n,t){t.r(n),t.d(n,{contentTitle:function(){return u},default:function(){return f},frontMatter:function(){return o},metadata:function(){return s},toc:function(){return l}});var r=t(801),i=t(3108),a=(t(8851),t(2669)),c=["components"],o={title:"DrawFunction"},u=void 0,s={unversionedId:"api/sequence-viewer-utils.drawfunction",id:"api/sequence-viewer-utils.drawfunction",title:"DrawFunction",description:"Home &gt; @anocca/sequence-viewer-utils &gt; DrawFunction",source:"@site/docs/api/sequence-viewer-utils.drawfunction.md",sourceDirName:"api",slug:"/api/sequence-viewer-utils.drawfunction",permalink:"/sequence-viewer/docs/api/sequence-viewer-utils.drawfunction",editUrl:"https://github.com/facebook/docusaurus/edit/master/website/docs/api/sequence-viewer-utils.drawfunction.md",tags:[],version:"current",frontMatter:{title:"DrawFunction"},sidebar:"apiSidebar",previous:{title:"CircularSelection",permalink:"/sequence-viewer/docs/api/sequence-viewer-utils.circularselection"},next:{title:"getFont",permalink:"/sequence-viewer/docs/api/sequence-viewer-utils.getfont"}},l=[],p={toc:l};function f(e){var n=e.components,t=(0,i.Z)(e,c);return(0,a.kt)("wrapper",(0,r.Z)({},p,t,{components:n,mdxType:"MDXLayout"}),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/sequence-viewer/docs/api/"},"Home")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/sequence-viewer/docs/api/sequence-viewer-utils"},"@anocca/sequence-viewer-utils")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/sequence-viewer/docs/api/sequence-viewer-utils.drawfunction"},"DrawFunction")),(0,a.kt)("p",null,"The draw function, e.g. drawLinear or drawCircular that paints the canvas element"),(0,a.kt)("b",null,"Signature:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},"export declare type DrawFunction = (props: {\n    c: CanvasRenderingContext2D;\n    w: number;\n    h: number;\n    ratio: number;\n    data: RenderData;\n    sequence: string;\n    circularSelection: CircularSelection[];\n    searchResults: {\n        start: number;\n        end: number;\n        active: boolean;\n        complement: boolean;\n    }[];\n    annotationLevels: Annotations[];\n    renderStateRef: {\n        clickedFeatures: string[];\n        hoveringFeature: undefined | string;\n    };\n    codons: {\n        [k: string]: string;\n    };\n    isProtein: boolean;\n}) => {\n    clickedFeatures: string[];\n    hoveringFeature: undefined | string;\n};\n")),(0,a.kt)("b",null,"References:"),(0,a.kt)("p",null," ",(0,a.kt)("a",{parentName:"p",href:"/sequence-viewer/docs/api/sequence-viewer-utils.renderdata"},"RenderData"),", ",(0,a.kt)("a",{parentName:"p",href:"/sequence-viewer/docs/api/sequence-viewer-utils.circularselection"},"CircularSelection"),", ",(0,a.kt)("a",{parentName:"p",href:"/sequence-viewer/docs/api/sequence-viewer-utils.annotations"},"Annotations")))}f.isMDXComponent=!0}}]);