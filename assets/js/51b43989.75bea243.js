"use strict";(self.webpackChunk_anocca_sequence_viewer_website=self.webpackChunk_anocca_sequence_viewer_website||[]).push([[4143],{2669:function(e,t,n){n.d(t,{Zo:function(){return s},kt:function(){return d}});var r=n(8851);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var c=r.createContext({}),u=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},s=function(e){var t=u(e.components);return r.createElement(c.Provider,{value:t},e.children)},f={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},h=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,c=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),h=u(n),d=a,v=h["".concat(c,".").concat(d)]||h[d]||f[d]||i;return n?r.createElement(v,o(o({ref:t},s),{},{components:n})):r.createElement(v,o({ref:t},s))}));function d(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,o=new Array(i);o[0]=h;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l.mdxType="string"==typeof e?e:a,o[1]=l;for(var u=2;u<i;u++)o[u]=n[u];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}h.displayName="MDXCreateElement"},1974:function(e,t,n){var r=n(8851);t.Z=function(e){var t=e.children,n=e.hidden,a=e.className;return r.createElement("div",{role:"tabpanel",hidden:n,className:a},t)}},8563:function(e,t,n){n.d(t,{Z:function(){return s}});var r=n(801),a=n(8851),i=n(1436),o=n(4539),l=n(6224),c="tabItem_ocwF";function u(e){var t,n,i,u=e.lazy,s=e.block,f=e.defaultValue,h=e.values,d=e.groupId,v=e.className,m=a.Children.map(e.children,(function(e){if((0,a.isValidElement)(e)&&void 0!==e.props.value)return e;throw new Error("Docusaurus error: Bad <Tabs> child <"+("string"==typeof e.type?e.type:e.type.name)+'>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.')})),p=null!=h?h:m.map((function(e){var t=e.props;return{value:t.value,label:t.label,attributes:t.attributes}})),b=(0,o.lx)(p,(function(e,t){return e.value===t.value}));if(b.length>0)throw new Error('Docusaurus error: Duplicate values "'+b.map((function(e){return e.value})).join(", ")+'" found in <Tabs>. Every value needs to be unique.');var y=null===f?f:null!=(t=null!=f?f:null==(n=m.find((function(e){return e.props.default})))?void 0:n.props.value)?t:null==(i=m[0])?void 0:i.props.value;if(null!==y&&!p.some((function(e){return e.value===y})))throw new Error('Docusaurus error: The <Tabs> has a defaultValue "'+y+'" but none of its children has the corresponding value. Available values are: '+p.map((function(e){return e.value})).join(", ")+". If you intend to show no default tab, use defaultValue={null} instead.");var g=(0,o.UB)(),T=g.tabGroupChoices,C=g.setTabGroupChoices,M=(0,a.useState)(y),k=M[0],w=M[1],A=[],P=(0,o.o5)().blockElementScrollPositionUntilNextRender;if(null!=d){var S=T[d];null!=S&&S!==k&&p.some((function(e){return e.value===S}))&&w(S)}var I=function(e){var t=e.currentTarget,n=A.indexOf(t),r=p[n].value;r!==k&&(P(t),w(r),null!=d&&C(d,r))},G=function(e){var t,n=null;switch(e.key){case"ArrowRight":var r=A.indexOf(e.currentTarget)+1;n=A[r]||A[0];break;case"ArrowLeft":var a=A.indexOf(e.currentTarget)-1;n=A[a]||A[A.length-1]}null==(t=n)||t.focus()};return a.createElement("div",{className:"tabs-container"},a.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,l.Z)("tabs",{"tabs--block":s},v)},p.map((function(e){var t=e.value,n=e.label,i=e.attributes;return a.createElement("li",(0,r.Z)({role:"tab",tabIndex:k===t?0:-1,"aria-selected":k===t,key:t,ref:function(e){return A.push(e)},onKeyDown:G,onFocus:I,onClick:I},i,{className:(0,l.Z)("tabs__item",c,null==i?void 0:i.className,{"tabs__item--active":k===t})}),null!=n?n:t)}))),u?(0,a.cloneElement)(m.filter((function(e){return e.props.value===k}))[0],{className:"margin-vert--md"}):a.createElement("div",{className:"margin-vert--md"},m.map((function(e,t){return(0,a.cloneElement)(e,{key:t,hidden:e.props.value!==k})}))))}function s(e){var t=(0,i.Z)();return a.createElement(u,(0,r.Z)({key:String(t)},e))}},8064:function(e,t,n){n.d(t,{Gk:function(){return i},Es:function(){return d},Ej:function(){return s},TC:function(){return u},QJ:function(){return o}});var r=n(3048),a=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];var n=e.reduce((function(e,t){return e+t}),0),r=n%(2*Math.PI);return r<0?2*Math.PI+r:r},i=function(e,t){e.zoom=Math.min(Math.max(e.zoom,0),t.zoom),e.angle=Math.min(Math.max(e.angle,0),t.angle),e.radius=Math.min(Math.max(e.radius,0),t.radius)},o=function(e,t,n){0!==e&&(e>0?t.angle<n.angle||t.zoom<n.zoom?(t.angle+=25*e,t.zoom+=7*e):t.radius+=7*e:t.radius>0?t.radius+=7*e:t.zoom+=7*e,i(t,n))},l=function(e){return 32*e/(2*Math.PI)},c=function(e,t,n){var r=Math.min(e,t)/2*.5,a=Math.min(e,t)/12;return a+(r-a)*n},u=function(e,t,n,r,a){var i=l(n),o=function(e,t,n){var r=n.end,a=n.start,i=l(e);return Math.min(t/(2*Math.sin(Math.PI*Math.min(r-a+2,e/2)/e)),i)}(n,e,a),u=c(e,t,r);return(o-u)/(i-u)},s=function(e){var t=e.w,n=e.h,i=e.data,o=e.sequence,u=e.circularSelection,s=n/2,f=t/2,h=o.length,d=h-1,v=l(h),m=function(e,t){return Math.min(e,t)/8}(t,n),p=c(t,n,i.circluarCamera.value.zoom),b=i.circluarCamera.value.radius*(v-p)+p,y=Math.max(b,m),g=function(e,t){return Math.max(Math.min(e*t,t),0)}(i.circluarCamera.value.radius,v),T=s+g,C=2*Math.PI/h,M=u[u.length-1]||{state:"selected",start:0,end:0,antiClockwise:void 0},k=M.start,w=M.end,A=M.antiClockwise,P=(0,r.R7)(k,w,h,A),S=a(i.circluarCamera.angleOffset,i.circluarCamera.scrollOffsetZooming),I=P*C,G=i.circluarCamera.value.angle,x=a(S,I),E=a(2*Math.PI,-x),R=0;R=x<=Math.PI?a(S,-x*G):a(S,E*G),R=a(R,i.circluarCamera.scrollOffsetZoomed);var N=i.mouseY-T,L=i.mouseX-f,O=Math.sqrt(Math.pow(L,2)+Math.pow(N,2)),D=Math.atan2(N,L),q=function(e,t,n,r){var a=t-r,i=e-n,o=Math.abs(Math.atan(a/i));return a<=0&&i>=0?Math.PI/2-o:a>0&&i>=0?o+Math.PI/2:a>0&&i<0?Math.PI-o+Math.PI/2:o+Math.PI/2+Math.PI}(f+y*Math.cos(D),T+y*Math.sin(D),f,T),F=Math.floor((q+C/2-R)/C);return F>=h?F%=h:F<0&&(F=(Math.ceil(Math.abs(F)/h)*h+F)%h),{circleY:T,angleDelta:C,angleOffset:R,radius:y,len:o.length,iLen:d,mouseAngle:q,hoveringCaretPosition:F,mouseRadius:O}},f=function(){return f=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var a in t=arguments[n])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e},f.apply(this,arguments)},h=function(e,t){var n="function"==typeof Symbol&&e[Symbol.iterator];if(!n)return e;var r,a,i=n.call(e),o=[];try{for(;(void 0===t||t-- >0)&&!(r=i.next()).done;)o.push(r.value)}catch(l){a={error:l}}finally{try{r&&!r.done&&(n=i.return)&&n.call(i)}finally{if(a)throw a.error}}return o},d=function(e){var t=e.c,n=e.w,a=e.h,i=e.ratio,o=e.data,l=e.sequence,c=e.circularSelection,u=e.searchResults,d=e.annotationLevels,v=e.renderStateRef,m=e.codons;t.save(),t.resetTransform(),t.scale(i,i),t.clearRect(0,0,n,a);var p=n/2,b=o.circluarCamera.value,y=b.zoom,g=b.radius,T=-Math.PI/2,C=s({data:o,sequence:l,w:n,h:a,circularSelection:c}),M=C.circleY,k=C.angleDelta,w=C.angleOffset,A=C.radius,P=C.len,S=C.iLen,I=C.mouseAngle,G=C.hoveringCaretPosition,x=C.mouseRadius,E=function(e,t){var n=p+e*Math.cos(t+T),a=M+e*Math.sin(t+T);return(0,r.bc)(n,a)},R=function(e,n,r,a){void 0===a&&(a="center");var i=t.measureText(e).width;if(e.length<3||e.length>100){var o=t.getTransform(),l=h(E(n,r),2),c=l[0],u=l[1],s=-i/2;"left"===a?s=0:"right"===a&&(s=i),t.translate(c,u),t.rotate(r),t.fillText(e,s,0),t.setTransform(o)}else{var f=i/n,d=r-f/2;"left"===a?d=r-f:"right"===a&&(d=r);for(var v=0;v<e.length;v+=1){var m=d+(0===v?0:t.measureText(e.slice(0,v)).width/i)*f,p=h(E(n,m),2);c=p[0],u=p[1],o=t.getTransform();t.translate(c,u),t.rotate(m),t.fillText(e[v],0,0),t.setTransform(o)}}},N=Math.max(Math.min(2*A*Math.PI/P,16),0),L=N>4?N:4,O=function(e){return{a0:e*k+w-k/2,a1:e*k+w+k/2,aMid:e*k+w}},D=function(e){var n=e.i,a=e.radius,i=e.complement,o=e.base||l[n],c=O(n).aMid,u=i?(0,r.Rj)(o):o;t.font=(0,r.qT)(N,"bold");var s=(0,r.B6)(u);t.fillStyle=s,t.textBaseline="top",R(u,a,c)},q=function(e,n){var a=O(e),i=a.a0,o=a.a1,u=a.aMid,s=(0,r.IW)(e,c);s&&function(r){var a=1.4*L;if(n&&(a=2.5*L),t.lineWidth=3,t.strokeStyle="black",t.beginPath(),t.arc(p,M,A-a,i+T,o+T,!1),t.stroke(),t.closePath(),e===r.end&&void 0!==r.antiClockwise){if(t.beginPath(),!0===r.antiClockwise){var l=h(E(A-a-L/2,i),2),c=l[0],u=l[1],s=h(E(A-a,i-L/(2*A)),2),f=s[0],d=s[1],v=h(E(A-a+L/2,i),2),m=v[0],b=v[1];t.moveTo(c,u),t.lineTo(f,d),t.lineTo(m,b)}if(!1===r.antiClockwise){var y=h(E(A-a-L/2,o),2),g=(c=y[0],u=y[1],h(E(A-a,o+L/(2*A)),2)),C=(f=g[0],d=g[1],h(E(A-a+L/2,o),2));m=C[0],b=C[1],t.moveTo(c,u),t.lineTo(f,d),t.lineTo(m,b)}t.closePath(),t.fillStyle="black",t.fill()}}(s);var f,d=Math.floor(P/4);y>.25&&(d=Math.floor(P/8)),g>0&&(d=Math.floor(P/16)),0===e%d&&(e+d/2)%P>=d/2&&(f=function(e,t,n){var a=h(E(e,n),2),i=a[0],o=a[1],l=h(E(t,n),2),c=l[0],u=l[1];return(0,r.bc)(i,o,c,u)}(A+2,A+8,u),t.lineWidth=1,t.beginPath(),t.moveTo(f[0],f[1]),t.lineTo(f[2],f[3]),t.closePath(),t.strokeStyle="black",t.stroke(),t.font=(0,r.qT)(16,"normal"),t.fillStyle="black",t.textBaseline="bottom",R(String(e+1),A+8,u));var v=function(n){var a=0;if(n&&(a=1.25*L),N>4)D({i:e,radius:A-2-a,complement:n});else{var c=h(E(A-a,i),2),u=c[0],s=c[1],f=h(E(A-a,o),2),d=f[0],v=f[1],m=h(E(A-a-4,o),2),p=m[0],b=m[1],y=h(E(A-a-4,i),2),g=y[0],T=y[1];t.strokeStyle="black",t.lineWidth=1,t.beginPath(),t.moveTo(u,s),t.lineTo(d,v),t.lineTo(p,b),t.lineTo(g,T),t.closePath();var C=(0,r.B6)(n?(0,r.Rj)(l[e]):l[e]);t.fillStyle=C,t.fill()}};v(!1),n&&v(!0)};N>4&&c.forEach((function(e){var n=e.end,a=e.start,i=e.antiClockwise,o=(0,r.R7)(a,n,P,i)*k+w,l=(0,r.GQ)(e);t.font=(0,r.qT)(N,"bold"),t.fillStyle="black",t.textBaseline="top";var c=2*L;i&&(c=3*L),R(l,A-c-16,o)}));var F,B=[],j=function(e){return N>5&&e.displayAsSequence},W=A+36;d.forEach((function(e,a){var i=0;e.forEach((function(e){var t=j(e)?N:14;i=Math.max(i,t)}));var o=W;W+=i+4,e.forEach((function(e){var a=e.locations;if(a.length>1){var l=a[0][0]-1,c=a[a.length-1][1],u=l*k+w+T-k/2,s=c*k+w+T-k/2;t.beginPath(),t.arc(p,M,o+i/2,u,s,e.direction===r.fn.REVERSE),t.lineWidth=1,t.strokeStyle="black",t.stroke(),t.closePath()}a.forEach((function(a){var l=String(e.displayLabel||e.label),c=a[0],u=a[1],s=c-1,d=u,m=s*k+w,b=d*k+w,y="normal",g=o+i;x<=g&&x>=o&&function(e,t,n,r){return n>t&&!1===r?e>=t&&e<=n:n<t&&!1===r?e>=t||e<=n:n<t&&!0===r?e>=n&&e<=t:n>t&&!0===r?e>=n||e<=t:e>=t&&e<=n}(G,Math.min(s,d),Math.max(s,d),d<s)&&(y="hovering",F=e.id),v.clickedFeatures.includes(e.id)&&(y="clicked");var C=e.color,S="rgb(0, 0, 0, 0.25)";"hovering"!==y&&"clicked"!==y||(S="rgb(0, 0, 0)"),t.save(),t.fillStyle=C,t.strokeStyle=S,t.lineWidth=1,t.beginPath();var I=T-k/2,N=(0,r.Ax)(P,!1,s,d)*g*Math.PI*2;if(e.direction===r.fn.FORWARD||e.direction===r.fn.REVERSE){var W=.2*Math.abs(d-s)*k,U=Math.min(Math.min(8/g,W),.1*N),V=Math.min(Math.min(8/o,W),.1*N);if(N<16&&(U=0,V=0),e.direction===r.fn.FORWARD){if(t.arc(p,M,g,m+I,b+I-U,!1),N>=16){var Z=h(E(o+i/2,b-k/2),2),_=Z[0],z=Z[1];t.lineTo(_,z)}t.arc(p,M,o,b+I-V,m+I,!0)}else{var Y=h(E(o+i/2,m-k/2),2);_=Y[0],z=Y[1];t.moveTo(_,z),t.arc(p,M,g,m+I+U,b+I,!1),t.arc(p,M,o,b+I,m+I+V,!0)}}else t.arc(p,M,g,m+I,b+I,!1),t.arc(p,M,o,b+I,m+I,!0);t.closePath(),j(e)?(t.fillStyle="white",t.fill(),t.fillStyle=C):t.fill(),t.stroke(),t.clip();var H=(0,r.uu)(C);t.fillStyle=H;var X=(0,r.R7)(Math.min(s,d),Math.max(s,d),P,d<s)*k,K=2*g<n?2*Math.PI:2*Math.PI*Math.asin(Math.min(n/(2*g),1))/Math.PI,Q=(2*Math.PI-w)%(2*Math.PI)/(2*Math.PI)*Math.PI*2,J=2*Math.PI,$=(Q-K/2+J+k)%J,ee=(Q+K/2+J)%J;!j(e)&&N>=16&&function(e){void 0===e&&(e=!1);var n=t.measureText(l).width/(g-i/2),a=X;if(e){var o=X,c=$,u=ee;$>Math.PI&&ee>Math.PI&&X<Math.PI?o=X+2*Math.PI:$<Math.PI&&ee<Math.PI&&X<Math.PI||($<Math.PI&&ee<Math.PI&&X>Math.PI?o=X-2*Math.PI:$>Math.PI&&ee>Math.PI&&X>Math.PI||($>Math.PI&&ee<Math.PI&&X<Math.PI?c=$-2*Math.PI:$>Math.PI&&ee<Math.PI&&X>Math.PI&&(u=ee+2*Math.PI))),o-n/2<c?a=$+n/2:o+n/2>u&&(a=ee-n/2)}t.font=(0,r.qT)(12,"bold"),t.textBaseline="middle",R(l,g-i/2,a+w-k/2)}(A>n/2),t.restore();var te=(g+o)/2+L/2;j(e)&&function(e){var t=e.startIndex,n=e.endIndex,a=e.sequence,i=a?{sequence:a,onRenderBase:function(e,t){D({i:e,radius:te,base:t})}}:{onRenderBase:function(e){D({i:e,radius:te})}};(0,r.XA)(f({len:P,startIndex:t,endIndex:n},i))}({startIndex:a[0]-1,endIndex:a[1]-1});var ne=e.rightTag;if(ne&&(t.fillStyle="black",t.font=(0,r.qT)(12,"bold"),t.textBaseline="middle",R(String(ne),g-i/2,b+I+Math.PI/2,"right")),(0,r.UG)(e,a,P,(function(e,t){D({i:e,radius:te,base:t})})),"DNA_RE_NUC"===e.type){var re=e.direction===r.fn.REVERSE,ae=e.cleavageSites,ie=ae[0],oe=ae[ae.length-1],le=ie[1],ce=oe[1];1===ae.length&&(le=ie[0],ce=ie[1]);var ue=[re?d-le:s+le,re?d-ce:s+ce].sort((function(e,t){return e-t}));B.push(ue);for(var se=ue[0];se<ue[1];se+=1){var fe=se;fe<0&&(fe=P+se),q(fe,!0)}ae.forEach((function(e){var n=h(e,2),r=n[0],a=n[1],i=O(re?d-a:s+r),o=i.a0;i.a1;if(t.strokeStyle="hovering"===y||"clicked"===y?"red":"black",t.lineWidth=3,t.beginPath(),r>a){var l=h(E(A,o),2),c=l[0],u=l[1];t.lineTo(c,u);var f=h(E(A-L,o),2),v=f[0],m=f[1];t.lineTo(v,m)}else{var b=h(E(A,o),2);c=b[0],u=b[1];t.lineTo(c,u);var g=h(E(A-L,o),2);v=g[0],m=g[1];t.lineTo(v,m)}var C=O(re?d-r:s+a).a0;if(t.arc(p,M,A-1.125*L-1.5,o+T,C+T,r>a),r>a){var k=h(E(A-2.5*L,C),2),w=k[0],P=k[1];t.lineTo(w,P)}else{var S=h(E(A-2.5*L,C),2);w=S[0],P=S[1];t.lineTo(w,P)}t.strokeStyle="hovering"===y||"clicked"===y?"red":"black",t.stroke(),t.closePath()}))}}))}))})),v.hoveringFeature=F,u.length>0&&u.forEach((function(e){var n=e.start,a=e.end,i=n*k+w+T-k/2,o=a*k+w+T-k/2,l=0,c=A*(0,r.Ax)(P,!1,n,a)*Math.PI*2;if(c<8){var u=(8-c)/2/A;i-=u,o+=u}if(e.complement){for(var s=n;s<a;s+=1)q(s,!0);l=1.2*-L}t.beginPath(),t.arc(p,M,A+l,i,o,!1),t.arc(p,M,A-Math.max(8,1.2*L)+l,o,i,!0),t.closePath();var f=Math.min(Math.max(1-y,.4),.8);t.fillStyle="rgba(255,151,0, "+f+")",e.active&&(t.fillStyle="rgba(0, 0, 255, "+f+")"),t.fill()}));var U=Math.floor(n/4),V=Math.ceil(U/P),Z="",_=function(e,n){if(3===(Z+=n.antiClockwise?(0,r.Rj)(l[e]):l[e]).length){var a=e+(n.antiClockwise?1:-1);-1===a&&(a=S),function(e,n,a){if(!(N<=4)){t.lineWidth=1;var i=m[n]||"X",o=(0,r.su)(i),l=O(e-1).a0,c=O(e+1).a1,u=A-(a?2.6:-1.5)*L;t.beginPath();var s=T;t.arc(p,M,u,l+s,c+s,!1),t.arc(p,M,u-L,c+s,l+s,!0),t.closePath(),t.fillStyle=o,t.strokeStyle="black",t.fill(),t.stroke(),t.font=(0,r.qT)(N,"bold"),t.fillStyle=(0,r.nU)(i)?"#c8d9fa":"#282c34",t.textBaseline="top";var f=O(e).aMid;N>4&&R(i,u,f)}}(a,Z,!!n.antiClockwise),Z=""}};if(2*A*Math.PI/P>4)for(var z=G+U,Y=G-U;Y<z;Y+=1){var H=(Y+P*V)%P,X=(0,r.IW)(H,c);q(H,!0===(null==X?void 0:X.antiClockwise))}else for(Y=0;Y<P;Y+=1){X=(0,r.IW)(Y,c);q(Y,!0===(null==X?void 0:X.antiClockwise))}c.forEach((function(e){if(Z="",(0,r.Wk)(e))if(e.antiClockwise){for(var t=e.start;t>=0;t-=1)_(t,e);for(t=S;t>=e.end;t-=1)_(t,e)}else{for(t=e.start;t<P;t+=1)_(t,e);for(t=0;t<=e.end;t+=1)_(t,e)}else if(e.antiClockwise)for(t=e.start;t>=e.end;t-=1)_(t,e);else for(t=e.start;t<=e.end;t+=1)_(t,e)}));var K=0,Q=!1,J=!1,$=!1,ee=c.find((function(e){return"selecting"===e.state})),te=(0,r.IW)(G,c);"selecting"===(null==ee?void 0:ee.state)&&(ee.antiClockwise&&(Q=!0,$=!0),Math.abs(ee.start-ee.end)>=2&&(J=!0)),te&&(Math.abs(te.start-te.end)>=2&&(J=!0),te.antiClockwise&&(Q=!0,$=!0)),B.some((function(e){var t=h(e,2),n=t[0],a=t[1];return(0,r.cd)(G,{start:n,end:a,antiClockwise:!1})}));var ne=1.2;return J&&$&&(ne=2.7),Q&&(K+=1.4*L),function(e,n,a){var i=h(E(e,I),2),o=i[0],l=i[1],c=h(E(n,I),2),u=c[0],s=c[1];t.strokeStyle="rgba(0, 0, 0, 0.5)",t.lineWidth=3,t.beginPath(),t.moveTo(o-1.5,l),t.lineTo(u-1.5,s),t.stroke(),t.closePath(),t.font=(0,r.qT)(16,"bold"),t.fillStyle="black",t.textBaseline="top",R(String(G+1),a,I-1.5/a,"center")}(A-K,A-K-1.125*L,A-K-L*ne),t.restore(),v}},3048:function(e,t,n){var r;n.d(t,{fn:function(){return r},J$:function(){return o},d1:function(){return q},uF:function(){return O},Wi:function(){return X},ee:function(){return H},Ds:function(){return w},Jn:function(){return l},SD:function(){return a},su:function(){return y},qT:function(){return G},R7:function(){return _},B6:function(){return b},Rj:function(){return A},Dc:function(){return x},zO:function(){return P},Lc:function(){return V},Ax:function(){return Z},GQ:function(){return z},IW:function(){return U},uu:function(){return L},Mu:function(){return u},cd:function(){return W},a$:function(){return j},Wk:function(){return B},h9:function(){return Q},UG:function(){return $},Oq:function(){return k},ci:function(){return c},XA:function(){return J},IS:function(){return E},$X:function(){return S},nU:function(){return m},bc:function(){return v}}),function(e){e.FORWARD="FORWARD",e.NOT_DEFINED="NOT_DEFINED",e.REVERSE="REVERSE"}(r||(r={}));var a={A:"#C20000",T:"#00B700",C:"#1000BA",G:"#FDE700",R:"black",Y:"black",W:"black",S:"black",M:"black",K:"black",H:"black",B:"black",V:"black",D:"black",N:"black"},i={R:"Y",Y:"R",W:"W",S:"S",M:"K",K:"M",H:"D",B:"V",V:"B",D:"H",N:"N",A:"T",T:"A",G:"C",C:"G"},o={A:{value:"A",name:"Alanine",threeLettersName:"Ala",hydrophobicity:1.8,color:"#A7A7A7"},R:{value:"R",name:"Arginine",threeLettersName:"Arg",hydrophobicity:-4.5,color:"#145AFF"},N:{value:"N",name:"Asparagine",threeLettersName:"Asn",hydrophobicity:-3.5,color:"#00DCDC"},D:{value:"D",name:"Aspartic acid",threeLettersName:"Asp",hydrophobicity:-3.5,color:"#E60A0A"},C:{value:"C",name:"Cysteine",threeLettersName:"Cys",hydrophobicity:2.5,color:"#E6E600"},E:{value:"E",name:"Glutamic acid",threeLettersName:"Glu",hydrophobicity:-3.5,color:"#E60A0A"},Q:{value:"Q",name:"Glutamine",threeLettersName:"Gln",hydrophobicity:-3.5,color:"#00DCDC"},G:{value:"G",name:"Glycine",threeLettersName:"Gly",hydrophobicity:-.4,color:"#A7A7A7"},H:{value:"H",name:"Histidine",threeLettersName:"His",hydrophobicity:-3.2,color:"#8282D2"},I:{value:"I",name:"Isoleucine ",threeLettersName:"Ile",hydrophobicity:4.5,color:"#0F820F"},L:{value:"L",name:"Leucine",threeLettersName:"Leu",hydrophobicity:3.8,color:"#0F820F"},K:{value:"K",name:"Lysine",threeLettersName:"Lys",hydrophobicity:-3.9,color:"#145AFF"},M:{value:"M",name:"Methionine",threeLettersName:"Met",hydrophobicity:1.9,color:"#E6E600"},F:{value:"F",name:"Phenylalanine",threeLettersName:"Phe",hydrophobicity:2.8,color:"#3232AA",doInvert:!0},P:{value:"P",name:"Proline",threeLettersName:"Pro",hydrophobicity:-1.6,color:"#DC9682"},S:{value:"S",name:"Serine",threeLettersName:"Ser",hydrophobicity:-.8,color:"#FA9600"},T:{value:"T",name:"Threonine",threeLettersName:"Thr",hydrophobicity:-.7,color:"#FA9600"},U:{value:"U",name:"Selenocysteine",threeLettersName:"Sec",color:"#FF0000"},W:{value:"W",name:"Tryptophan",threeLettersName:"Trp",hydrophobicity:-.9,color:"#B45AB4"},Y:{value:"Y",name:"Tyrosine",threeLettersName:"Tyr",hydrophobicity:-1.3,color:"#3232AA",doInvert:!0},V:{value:"V",name:"Valine",threeLettersName:"Val",hydrophobicity:4.2,color:"#0F820F"},"*":{value:"*",name:"Stop",threeLettersName:"Stop",color:"#000000"},".":{value:".",name:"Stop",threeLettersName:"Stop",color:"#000000"},"-":{value:"-",name:"Gap",threeLettersName:"Gap",color:"#ffffff"},B:{value:"B",threeLettersName:"ND",color:"lightpurple",isAmbiguous:!0,name:"B",aliases:"ND"},J:{value:"J",threeLettersName:"IL",color:"lightpurple",isAmbiguous:!0,name:"J",aliases:"IL"},X:{value:"X",threeLettersName:"ACDEFGHIKLMNPQRSTVWY",color:"lightpurple",isAmbiguous:!0,name:"X",aliases:"ACDEFGHIKLMNPQRSTVWY"},Z:{value:"Z",threeLettersName:"QE",color:"lightpurple",isAmbiguous:!0,name:"Z",aliases:"QE"}},l=24,c=150,u={TAG:"*",TAA:"*",TGA:"*",GCG:"A",GCA:"A",GCT:"A",GCC:"A",TGT:"C",TGC:"C",GAT:"D",GAC:"D",GAA:"E",GAG:"E",TTT:"F",TTC:"F",GGT:"G",GGA:"G",GGG:"G",GGC:"G",CAT:"H",CAC:"H",ATA:"I",ATT:"I",ATC:"I",AAA:"K",AAG:"K",CTA:"L",TTA:"L",CTT:"L",TTG:"L",CTC:"L",CTG:"L",ATG:"M",AAT:"N",AAC:"N",CCG:"P",CCA:"P",CCT:"P",CCC:"P",CAA:"Q",CAG:"Q",CGT:"R",CGA:"R",CGC:"R",AGA:"R",AGG:"R",CGG:"R",TCG:"S",AGT:"S",TCA:"S",TCT:"S",TCC:"S",AGC:"S",ACG:"T",ACT:"T",ACA:"T",ACC:"T",GTA:"V",GTT:"V",GTC:"V",GTG:"V",TGG:"W",TAT:"Y",TAC:"Y"},s=function(){return s=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var a in t=arguments[n])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e},s.apply(this,arguments)},f=function(e,t){var n="function"==typeof Symbol&&e[Symbol.iterator];if(!n)return e;var r,a,i=n.call(e),o=[];try{for(;(void 0===t||t-- >0)&&!(r=i.next()).done;)o.push(r.value)}catch(l){a={error:l}}finally{try{r&&!r.done&&(n=i.return)&&n.call(i)}finally{if(a)throw a.error}}return o},h=function(e,t){for(var n=0,r=t.length,a=e.length;n<r;n++,a++)e[a]=t[n];return e},d=function(e){var t="function"==typeof Symbol&&Symbol.iterator,n=t&&e[t],r=0;if(n)return n.call(e);if(e&&"number"==typeof e.length)return{next:function(){return e&&r>=e.length&&(e=void 0),{value:e&&e[r++],done:!e}}};throw new TypeError(t?"Object is not iterable.":"Symbol.iterator is not defined.")};function v(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];return e}function m(e){return"FYKRDELIV*.".includes(e)}var p,b=function(e){return a[e]},y=function(e){var t;return null===(t=o[e])||void 0===t?void 0:t.color},g=function(e){var t=0;return e.forEach((function(e){t+=e})),t},T=function(e){var t=e.rightTag;return t?2*String(t).length:0},C=function(e){var t=Math.min.apply(Math,h([],f(e.locations.flat()))),n=Math.max.apply(Math,h([],f(e.locations.flat())));return Math.abs(n-t)+T(e)},M=function e(t,n,r,a){var i=Math.min.apply(Math,h([],f(t.locations.map((function(e){return f(e,1)[0]})).flat()))),o=Math.max.apply(Math,h([],f(t.locations.map((function(e){return f(e,2)[1]})).flat()))),l=Math.min.apply(Math,h([],f(n.locations.map((function(e){return f(e,1)[0]})).flat()))),c=Math.max.apply(Math,h([],f(n.locations.map((function(e){return f(e,2)[1]})).flat()))),u=i>o,d=l>c;if(a.value+=1,a.value>20)return!0;if(!u&&!d)return Math.max(i,l)<=Math.min(o+T(t),c+T(n));var m=function(e){return s(s({},e),{locations:[v(Math.min.apply(Math,h([],f(e.locations.map((function(e){return f(e,1)[0]})).flat()))),r)]})},p=function(e){return s(s({},e),{locations:[v(0,Math.max.apply(Math,h([],f(e.locations.map((function(e){return f(e,2)[1]})).flat()))))]})};return u&&!d?e(m(t),n,r,a)||e(p(t),n,r,a):!u&&d?e(m(n),t,r,a)||e(p(n),t,r,a):!(!u||!d)&&(e(m(n),m(t),r,a)||e(p(n),p(t),r,a))},k=function(e,t){for(var n,r=[],a=h([],f(e)).sort((function(e,t){return C(e)-C(t)})),i=function(){var e,n,i=a.pop();if(!i)return"continue-stackLoop";try{for(var o=(e=void 0,d(r)),l=o.next();!l.done;l=o.next()){var c=l.value;if(c.every((function(e){return!M(i,e,t,{value:0})})))return c.push(i),"continue-stackLoop"}}catch(u){e={error:u}}finally{try{l&&!l.done&&(n=o.return)&&n.call(o)}finally{if(e)throw e.error}}r.push([i])};a.length;)i();return r.sort((n=!0,function(e,t){var r=n?1:-1,a=r*(e.length-t.length),i=r*g(e.map(C))-g(t.map(C));return 0===i?0:i<0?-1:i>0?1:0===a?0:a<0?-1:a>0?1:0})).reverse()},w=function(e){return function(){for(var t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];p&&window.cancelAnimationFrame(p),p=window.requestAnimationFrame((function(){e.apply(void 0,h([],f(t)))}))}},A=function(e){if(e.match(/-|\.| /))return e;var t=i[e];if(!t)throw new Error("invalid nucleotide "+e);return t},P=function(e,t){var n=t.split("");return n.reverse(),e?n.join(""):n.map(A).join("")};var S=function(e,t,n){return e?function(e,t){for(var n=0;n<t.length;n+=1)if(e[n]!==t[n])return!1;return!0}(t,n):function(e,t){if(t.length!==e.length)throw new Error("sequence and site must be the same length");for(var n=0;n<t.length;n+=1)if(r=e[n],a=t[n],!(r.match(/-|\.| /)&&a.match(/-|\.| /)||"A"===a&&"A"===r||"C"===a&&"C"===r||"G"===a&&"G"===r)&&("T"!==a&&"U"!==a||"T"!==r&&"U"!==r)&&("R"!==a||"A"!==r&&"G"!==r)&&("Y"!==a||"C"!==r&&"T"!==r&&"U"!==r)&&("S"!==a||"G"!==r&&"C"!==r)&&("W"!==a||"A"!==r&&"T"!==r&&"U"!==r)&&("K"!==a||"G"!==r&&"T"!==r&&"U"!==r)&&("M"!==a||"A"!==r&&"C"!==r)&&("B"!==a||"C"!==r&&"G"!==r&&"T"!==r&&"U"!==r)&&("D"!==a||"A"!==r&&"G"!==r&&"T"!==r&&"U"!==r)&&("H"!==a||"A"!==r&&"C"!==r&&"T"!==r&&"U"!==r)&&("V"!==a||"A"!==r&&"C"!==r&&"G"!==r)&&"N"!==a)return!1;var r,a;return!0}(t,n)},I=function(e,t){var n="function"==typeof Symbol&&e[Symbol.iterator];if(!n)return e;var r,a,i=n.call(e),o=[];try{for(;(void 0===t||t-- >0)&&!(r=i.next()).done;)o.push(r.value)}catch(l){a={error:l}}finally{try{r&&!r.done&&(n=i.return)&&n.call(i)}finally{if(a)throw a.error}}return o};function G(e,t){return void 0===t&&(t="normal"),"normal normal "+t+" "+e+"px sans-serif"}function x(e){var t=window.devicePixelRatio||1,n=e.webkitBackingStorePixelRatio||e.mozBackingStorePixelRatio||e.msBackingStorePixelRatio||e.oBackingStorePixelRatio||e.backingStorePixelRatio||1;return{ratio:t/n,shouldScale:t!==n}}function E(e,t,n){var r=e.getContext("2d");if(r){var a=x(r),i=a.ratio,o=a.shouldScale;return o?(e.width=t*i,e.height=n*i,e.style.width=t+"px",e.style.height=n+"px"):(e.width=t,e.height=n,e.style.width="",e.style.height=""),{ratio:i,shouldScale:o}}}var R=null,N=null,L=function(e){if(!R){var t=document.getElementById("seq-view-offscreen-canvas");t?R=t:((R=document.createElement("canvas")).id="seq-view-offscreen-canvas",R.style.position="absolute",R.style.left="-10px",R.style.width="1px",R.style.height="1px",R.width=2,R.height=2,R.style.visibility="hidden",document.body.appendChild(R))}N||(N=R.getContext("2d",{willReadFrequently:!0}));var n=N;if(n){n.clearRect(0,0,1,1),n.fillStyle=e,n.fillRect(0,0,1,1);var r=I(n.getImageData(0,0,1,1).data,3),a=r[0],i=r[1],o=r[2];return n.clearRect(0,0,1,1),.299*a+.587*i+.114*o>150?"black":"white"}return"black"},O={primaryText:"#000000",primaryBackground:"#ffffff",websiteSecondary:"#00647b",websiteSecondaryLight:"#008dae",websiteSecondaryDark:"#003b48",websiteTertiary:"#0A3D51",websiteTertiaryDark:"#041b24",websiteTertiaryLight:"#105f7e",secondaryText:"#1f497d",secondaryBackground:"#eeece1",accent1:"#139cb2",accent1Light:"#18c4e0",accent1Dark:"#0e7484",accent2:"#eaebe0",accent3:"#fc4711",accent3Light:"#fd6e43",accent3Dark:"#d73403",accent4:"#e20047",accent4Light:"#ff165f",accent4Dark:"#af0037",accent5:"#28a745",accent5Light:"#98d26c",accent5Dark:"#64a533",accent6:"#8af74d",accent6Light:"#aaf97e",accent6Dark:"#6af51c",link:"#0000ff"},D=function(e,t){var n="function"==typeof Symbol&&e[Symbol.iterator];if(!n)return e;var r,a,i=n.call(e),o=[];try{for(;(void 0===t||t-- >0)&&!(r=i.next()).done;)o.push(r.value)}catch(l){a={error:l}}finally{try{r&&!r.done&&(n=i.return)&&n.call(i)}finally{if(a)throw a.error}}return o},q=function(e,t){return t==r.REVERSE?F({start:e[1],end:e[0]},!0):F({start:e[0],end:e[1]},!1)},F=function(e,t){var n=e.start,r=e.end;if(n!==r){if(!0===t)return!(n>r);if(!1===t)return!(r>n)}return!1},B=function(e){return F(e,!!e.antiClockwise)},j=function(e,t){var n=D(e,2),r=n[0],a=n[1],i=t.start,o=t.end,l=t.antiClockwise;if(i===o&&o===r&&o===a)return!0;if(i!==o)if(!0===l){if(i>o){if(r>=o&&r<=i&&a>=o&&a<=i)return!0}else if(r>=o||a<=i)return!0}else if(!1===l)if(o>i){if(r>=i&&r<=o&&a>=i&&a<=o)return!0}else if(r>=i||a<=o)return!0;return!1},W=function(e,t){var n=t.start,r=t.end,a=t.antiClockwise;if(n===r&&r===e)return!0;if(n!==r)if(!0===a){if(n>r){if(e>=r&&e<=n)return!0}else if(e>=r||e<=n)return!0}else if(!1===a)if(r>n){if(e>=n&&e<=r)return!0}else if(e>=n||e<=r)return!0;return!1},U=function(e,t){return t.find((function(t){return W(e,t)}))},V=function(e,t,n,r){var a=n,i=r;return!0===t&&(a=r,i=n),a>i?e-a+i:i-a+1},Z=function(e,t,n,r){return V(e,t,n,r)/e},_=function(e,t,n,r){var a=(e+t)/2;return t>e&&!1===r?a=(e+t)/2:t<e&&!1===r?a=(e+(n-e+t)/2)%n:t<e&&!0===r?a=(e+t)/2:t>e&&!0===r&&(a=(t+(n-t+e)/2)%n),a},z=function(e){var t=e.end,n=e.start,r=e.antiClockwise;return n===t?String(n+1):r?t+1+" - "+(n+1):n+1+" - "+(t+1)},Y=function(){return Y=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var a in t=arguments[n])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e},Y.apply(this,arguments)},H=function(e,t){return{a:1,b:0,c:0,d:1,e:e,f:t}},X=function(e){return{a:e,b:0,c:0,d:1,e:0,f:0}},K=function(e,t){var n,r=e.a,a=e.b,i=e.c,o=e.d,l=e.e,c=e.f,u={g:(n=t).a,h:n.b,i:n.c,j:n.d,k:n.e,l:n.f},s=u.g,f=u.h,h=u.i,d=u.j,v=u.k,m=u.l;return{a:r*s+i*f,b:a*s+o*f,c:r*h+i*d,d:a*h+o*d,e:r*v+i*m+l,f:a*v+o*m+c}},Q=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];var n={a:1,b:0,c:0,d:1,e:0,f:0};return e.forEach((function(e){n=K(n,e)})),Y({},n)},J=function(e){var t=e.len,n=e.startIndex,r=e.endIndex,a=0,i="sequence"in e?function(t){return e.onRenderBase(t,e.sequence[a++])}:function(t){return e.onRenderBase(t)};if(n>r){for(var o=n;o<t;o+=1)i(o);for(o=0;o<r+1;o+=1)i(o)}else for(o=n;o<r+1;o+=1)i(o)},$=function(e,t,n,a){if("DNA_OLIGO"===e.type){var i=e.fivePExtension;i&&(e.direction===r.REVERSE?J({startIndex:t[1],endIndex:(t[1]+i.length-1)%n,sequence:i.split("").reverse().join(""),len:n,onRenderBase:a}):J({startIndex:(t[0]-1-i.length+n)%n,endIndex:(t[0]-2+n)%n,sequence:i,len:n,onRenderBase:a}))}}},1737:function(e,t,n){n.r(t),n.d(t,{contentTitle:function(){return v},default:function(){return y},frontMatter:function(){return d},metadata:function(){return m},toc:function(){return p}});var r=n(801),a=n(3108),i=n(8851),o=n(2669),l=n(8563),c=n(1974),u=n(8064),s=n(3048),f=function(){return i.createElement("canvas",{ref:function(e){if(e){(0,s.IS)(e,640,480);var t=e.getContext("2d"),n=(0,s.Dc)(t).ratio;(0,u.Es)({c:t,w:640,h:480,ratio:n,data:{mouseX:0,mouseY:0,circluarCamera:{angleOffset:0,scrollOffsetZoomed:0,scrollOffsetZooming:0,value:{zoom:1,angle:1,radius:1},target:{zoom:1,angle:1,radius:1}},matrix:{a:1,b:0,c:0,d:1,e:0,f:0}},isProtein:!1,sequence:"TCCTCGCATAGGGCGGATCGGTATTCAT",circularSelection:[],searchResults:[],annotationLevels:[],renderStateRef:{hoveringFeature:void 0,clickedFeatures:[]},codons:s.Mu})}}})},h=["components"],d={sidebar_position:3},v="Usage without react",m={unversionedId:"tutorial/usage-without-react",id:"tutorial/usage-without-react",title:"Usage without react",description:"These libraries do not depend on any third party libraries. These are the most low level libraries in the @anocca/sequence-viewer-* suite.",source:"@site/docs/tutorial/usage-without-react.mdx",sourceDirName:"tutorial",slug:"/tutorial/usage-without-react",permalink:"/sequence-viewer/docs/tutorial/usage-without-react",editUrl:"https://github.com/facebook/docusaurus/edit/master/website/docs/tutorial/usage-without-react.mdx",tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3},sidebar:"tutorialSidebar",previous:{title:"Usage without material UI and formik",permalink:"/sequence-viewer/docs/tutorial/usage-without-mui"}},p=[{value:"Installation",id:"installation",children:[],level:2},{value:"Usage",id:"usage",children:[],level:2}],b={toc:p};function y(e){var t=e.components,n=(0,a.Z)(e,h);return(0,o.kt)("wrapper",(0,r.Z)({},b,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"usage-without-react"},"Usage without react"),(0,o.kt)("p",null,"These libraries do not depend on ",(0,o.kt)("strong",{parentName:"p"},"any")," third party libraries. These are the most low level libraries in the ",(0,o.kt)("inlineCode",{parentName:"p"},"@anocca/sequence-viewer-*")," suite."),(0,o.kt)("h2",{id:"installation"},"Installation"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"# Pick one or both\nnpm i @anocca/sequence-viewer-render-circular\nnpm i @anocca/sequence-viewer-render-linear\n\n# utils is recommended to get started\nnpm i @anocca/sequence-viewer-utils\n")),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"-render-circular")," and ",(0,o.kt)("inlineCode",{parentName:"p"},"-render-linear")," both export a function called ",(0,o.kt)("inlineCode",{parentName:"p"},"drawCircular")," and ",(0,o.kt)("inlineCode",{parentName:"p"},"drawLinear"),"."),(0,o.kt)("p",null,'"Draw" refers to drawing the bitmap graphics on a ',(0,o.kt)("a",{parentName:"p",href:"https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API"},"HTML5 canvas")," element."),(0,o.kt)("h2",{id:"usage"},"Usage"),(0,o.kt)(l.Z,{mdxType:"Tabs"},(0,o.kt)(c.Z,{value:"example",label:"Example",mdxType:"TabItem"},(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-tsx"},"import { drawCircular } from '@anocca/sequence-viewer-render-circular';\n/* or for linear */\n// import { drawLinear } from '@anocca/sequence-viewer-render-linear';\nimport { getRatio, humanCodons, scaleBuffer } from '@anocca/sequence-viewer-utils';\n\nconst w = 640;\nconst h = 480;\n\nconst buffer = document.getElementById('canvas');\n\nscaleBuffer(buffer, w, h);\n\nconst c = buffer.getContext('2d')\n\nconst { ratio } = getRatio(c);\n\ndrawCircular({\n  c,\n  w,\n  h,\n  ratio,\n  data: {\n    mouseX: 0,\n    mouseY: 0,\n    circluarCamera: {\n      angleOffset: 0,\n      scrollOffsetZoomed: 0,\n      scrollOffsetZooming: 0,\n      value: {\n        zoom: 1,\n        angle: 1,\n        radius: 1,\n      },\n      target: {\n        zoom: 1,\n        angle: 1,\n        radius: 1\n      }\n    },\n    matrix: {\n      a: 1,\n      b: 0,\n      c: 0,\n      d: 1,\n      e: 0,\n      f: 0\n    }\n  },\n  isProtein: false,\n  sequence: 'TCCTCGCATAGGGCGGATCGGTATTCAT',\n  circularSelection: [],\n  searchResults: [],\n  annotationLevels: [],\n  renderStateRef: {\n    hoveringFeature: undefined,\n    clickedFeatures: []\n  },\n  codons: humanCodons\n});\n\n/* in html */\n\n<canvas id=\"canvas\"></canvas>\n\n"))),(0,o.kt)(c.Z,{value:"result",label:"Result",mdxType:"TabItem"},(0,o.kt)(f,{mdxType:"UsageWithoutReactResult"}),(0,o.kt)("p",null,"This just renderes the canvas statically without any DOM bindings and thus no out of the box support for zoom, drag and scroll"))))}y.isMDXComponent=!0}}]);