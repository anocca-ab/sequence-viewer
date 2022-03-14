"use strict";(self.webpackChunk_anocca_sequence_viewer_website=self.webpackChunk_anocca_sequence_viewer_website||[]).push([[5754],{2669:function(e,r,n){n.d(r,{Zo:function(){return p},kt:function(){return f}});var t=n(8851);function c(e,r,n){return r in e?Object.defineProperty(e,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[r]=n,e}function a(e,r){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);r&&(t=t.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),n.push.apply(n,t)}return n}function o(e){for(var r=1;r<arguments.length;r++){var n=null!=arguments[r]?arguments[r]:{};r%2?a(Object(n),!0).forEach((function(r){c(e,r,n[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))}))}return e}function s(e,r){if(null==e)return{};var n,t,c=function(e,r){if(null==e)return{};var n,t,c={},a=Object.keys(e);for(t=0;t<a.length;t++)n=a[t],r.indexOf(n)>=0||(c[n]=e[n]);return c}(e,r);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(t=0;t<a.length;t++)n=a[t],r.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(c[n]=e[n])}return c}var i=t.createContext({}),u=function(e){var r=t.useContext(i),n=r;return e&&(n="function"==typeof e?e(r):o(o({},r),e)),n},p=function(e){var r=u(e.components);return t.createElement(i.Provider,{value:r},e.children)},l={inlineCode:"code",wrapper:function(e){var r=e.children;return t.createElement(t.Fragment,{},r)}},m=t.forwardRef((function(e,r){var n=e.components,c=e.mdxType,a=e.originalType,i=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),m=u(n),f=c,d=m["".concat(i,".").concat(f)]||m[f]||l[f]||a;return n?t.createElement(d,o(o({ref:r},p),{},{components:n})):t.createElement(d,o({ref:r},p))}));function f(e,r){var n=arguments,c=r&&r.mdxType;if("string"==typeof e||c){var a=n.length,o=new Array(a);o[0]=m;var s={};for(var i in r)hasOwnProperty.call(r,i)&&(s[i]=r[i]);s.originalType=e,s.mdxType="string"==typeof e?e:c,o[1]=s;for(var u=2;u<a;u++)o[u]=n[u];return t.createElement.apply(null,o)}return t.createElement.apply(null,n)}m.displayName="MDXCreateElement"},1511:function(e,r,n){n.r(r),n.d(r,{contentTitle:function(){return i},default:function(){return m},frontMatter:function(){return s},metadata:function(){return u},toc:function(){return p}});var t=n(9779),c=n(3938),a=(n(8851),n(2669)),o=["components"],s={title:"SearchComponent"},i=void 0,u={unversionedId:"api/sequence-viewer-react-shared.searchcomponent",id:"api/sequence-viewer-react-shared.searchcomponent",title:"SearchComponent",description:"Home &gt; @anocca/sequence-viewer-react-shared &gt; SearchComponent",source:"@site/docs/api/sequence-viewer-react-shared.searchcomponent.md",sourceDirName:"api",slug:"/api/sequence-viewer-react-shared.searchcomponent",permalink:"/sequence-viewer/docs/api/sequence-viewer-react-shared.searchcomponent",editUrl:"https://github.com/facebook/docusaurus/edit/master/website/docs/api/sequence-viewer-react-shared.searchcomponent.md",tags:[],version:"current",frontMatter:{title:"SearchComponent"},sidebar:"apiSidebar",previous:{title:"ControllerProps",permalink:"/sequence-viewer/docs/api/sequence-viewer-react-shared.controllerprops"},next:{title:"useController",permalink:"/sequence-viewer/docs/api/sequence-viewer-react-shared.usecontroller"}},p=[],l={toc:p};function m(e){var r=e.components,n=(0,c.Z)(e,o);return(0,a.kt)("wrapper",(0,t.Z)({},l,n,{components:r,mdxType:"MDXLayout"}),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/sequence-viewer/docs/api/"},"Home")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/sequence-viewer/docs/api/sequence-viewer-react-shared"},"@anocca/sequence-viewer-react-shared")," ",">"," ",(0,a.kt)("a",{parentName:"p",href:"/sequence-viewer/docs/api/sequence-viewer-react-shared.searchcomponent"},"SearchComponent")),(0,a.kt)("p",null,"Search component that can be passed to the circular controller."),(0,a.kt)("p",null,"See: ",(0,a.kt)("a",{parentName:"p",href:"/sequence-viewer/docs/api/sequence-viewer-utils.searchresult"},"SearchResult")),(0,a.kt)("b",null,"Signature:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},"export declare type SearchComponent = ({ sequence, zoomOnResult, onSearchResults, spinOnResult, isProtein }: {\n    sequence: string;\n    zoomOnResult: (range: SearchResult) => void;\n    spinOnResult: (range: SearchResult) => void;\n    onSearchResults: (results: SearchResult[]) => void;\n    isProtein: boolean;\n}) => JSX.Element;\n")),(0,a.kt)("b",null,"References:"),(0,a.kt)("p",null," ",(0,a.kt)("a",{parentName:"p",href:"/sequence-viewer/docs/api/sequence-viewer-utils.searchresult"},"SearchResult")))}m.isMDXComponent=!0}}]);