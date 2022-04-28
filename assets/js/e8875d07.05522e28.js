"use strict";(self.webpackChunk_anocca_sequence_viewer_website=self.webpackChunk_anocca_sequence_viewer_website||[]).push([[5151],{2669:function(e,n,t){t.d(n,{Zo:function(){return p},kt:function(){return f}});var r=t(8851);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function c(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?c(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):c(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function o(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},c=Object.keys(e);for(r=0;r<c.length;r++)t=c[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(r=0;r<c.length;r++)t=c[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var s=r.createContext({}),u=function(e){var n=r.useContext(s),t=n;return e&&(t="function"==typeof e?e(n):i(i({},n),e)),t},p=function(e){var n=u(e.components);return r.createElement(s.Provider,{value:n},e.children)},d={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},l=r.forwardRef((function(e,n){var t=e.components,a=e.mdxType,c=e.originalType,s=e.parentName,p=o(e,["components","mdxType","originalType","parentName"]),l=u(t),f=a,b=l["".concat(s,".").concat(f)]||l[f]||d[f]||c;return t?r.createElement(b,i(i({ref:n},p),{},{components:t})):r.createElement(b,i({ref:n},p))}));function f(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var c=t.length,i=new Array(c);i[0]=l;var o={};for(var s in n)hasOwnProperty.call(n,s)&&(o[s]=n[s]);o.originalType=e,o.mdxType="string"==typeof e?e:a,i[1]=o;for(var u=2;u<c;u++)i[u]=t[u];return r.createElement.apply(null,i)}return r.createElement.apply(null,t)}l.displayName="MDXCreateElement"},5451:function(e,n,t){t.r(n),t.d(n,{contentTitle:function(){return s},default:function(){return l},frontMatter:function(){return o},metadata:function(){return u},toc:function(){return p}});var r=t(801),a=t(3108),c=(t(8851),t(2669)),i=["components"],o={title:"useBackend"},s=void 0,u={unversionedId:"api/sequence-viewer-backend-react-state.usebackend",id:"api/sequence-viewer-backend-react-state.usebackend",title:"useBackend",description:"Home &gt; @anocca/sequence-viewer-backend-react-state &gt; useBackend",source:"@site/docs/api/sequence-viewer-backend-react-state.usebackend.md",sourceDirName:"api",slug:"/api/sequence-viewer-backend-react-state.usebackend",permalink:"/sequence-viewer/docs/api/sequence-viewer-backend-react-state.usebackend",editUrl:"https://github.com/facebook/docusaurus/edit/master/website/docs/api/sequence-viewer-backend-react-state.usebackend.md",tags:[],version:"current",frontMatter:{title:"useBackend"},sidebar:"apiSidebar",previous:{title:"@anocca/sequence-viewer-backend-react-state",permalink:"/sequence-viewer/docs/api/sequence-viewer-backend-react-state"},next:{title:"@anocca/sequence-viewer-react-circular",permalink:"/sequence-viewer/docs/api/sequence-viewer-react-circular"}},p=[],d={toc:p};function l(e){var n=e.components,t=(0,a.Z)(e,i);return(0,c.kt)("wrapper",(0,r.Z)({},d,t,{components:n,mdxType:"MDXLayout"}),(0,c.kt)("p",null,(0,c.kt)("a",{parentName:"p",href:"/sequence-viewer/docs/api/"},"Home")," ",">"," ",(0,c.kt)("a",{parentName:"p",href:"/sequence-viewer/docs/api/sequence-viewer-backend-react-state"},"@anocca/sequence-viewer-backend-react-state")," ",">"," ",(0,c.kt)("a",{parentName:"p",href:"/sequence-viewer/docs/api/sequence-viewer-backend-react-state.usebackend"},"useBackend")),(0,c.kt)("p",null,"Creates an annotation backend that stores annotations in React.setState."),(0,c.kt)("p",null,"See: ",(0,c.kt)("a",{parentName:"p",href:"/sequence-viewer/docs/api/sequence-viewer-utils.annotation"},"Annotation")),(0,c.kt)("b",null,"Signature:"),(0,c.kt)("pre",null,(0,c.kt)("code",{parentName:"pre",className:"language-typescript"},"useBackend: (initialAnnotations?: Annotation[]) => {\n    annotations: Annotation[];\n    getAnnotationLabelById: (id: string) => string;\n    getAnnotationById: (id: string) => Annotation;\n    addAnnotation: (annotation: Annotation) => void;\n    deleteAnnotations: (ids: string[]) => void;\n    showAnnotations: (ids: string[]) => void;\n    hideAnnotations: (ids: string[]) => void;\n    updateAnnotation: (annotation: Annotation) => void;\n}\n")))}l.isMDXComponent=!0}}]);