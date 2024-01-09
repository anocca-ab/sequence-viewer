"use strict";(self.webpackChunk_anocca_sequence_viewer_website=self.webpackChunk_anocca_sequence_viewer_website||[]).push([[9523],{7019:function(e,t,n){n.d(t,{kC:function(){return i},$P:function(){return u},bc:function(){return v},QO:function(){return p}});var r=n(8927),o=function(){return o=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e},o.apply(this,arguments)},i=function(e){var t=e.children,n=e.style,i=e.alignItems,a=e.justifyContent;return(0,r.jsx)("div",o({style:o({display:"flex",alignItems:i,justifyContent:a},n)},{children:t}),void 0)},a=n(8851),c=n(3048),l=function(e,t){var n="function"==typeof Symbol&&e[Symbol.iterator];if(!n)return e;var r,o,i=n.call(e),a=[];try{for(;(void 0===t||t-- >0)&&!(r=i.next()).done;)a.push(r.value)}catch(c){o={error:c}}finally{try{r&&!r.done&&(n=i.return)&&n.call(i)}finally{if(o)throw o.error}}return a},u=function(){var e=l(a.useState(null),2),t=e[0],n=e[1],r=a.useCallback((function(e){e&&n(e)}),[]);return(0,c.bc)(t,r)},s=function(e,t,n,r,o,i,c){var l=a.useRef({onClick:t,onEndDrag:r,onMouseMove:i,onScroll:o,onStartDrag:n,onDblClick:c});l.current={onClick:t,onEndDrag:r,onMouseMove:i,onScroll:o,onStartDrag:n,onDblClick:c},a.useEffect((function(){var t=function(e){l.current.onEndDrag(e)};if(e){var n=function(e){l.current.onClick(e)},r=function(e){e.stopPropagation(),function(e){l.current.onStartDrag(e)}(e)},o=function(e){e.stopPropagation(),t(e)},i=function(e){t(e)},a=function(e){l.current.onScroll(e),e.preventDefault(),e.stopPropagation()},c=function(e){l.current.onMouseMove(e)},u=function(e){l.current.onDblClick(e)},s={passive:!0};return e.addEventListener("click",n,s),e.addEventListener("mousedown",r),window.addEventListener("mouseup",o),e.addEventListener("mouseup",o),window.addEventListener("mouseleave",i,s),e.addEventListener("mouseleave",i,s),e.addEventListener("wheel",a),e.addEventListener("mousemove",c,s),e.addEventListener("dblclick",u,s),function(){e.removeEventListener("click",n),e.removeEventListener("mousedown",r),window.removeEventListener("mouseup",o),e.removeEventListener("mouseup",o),window.removeEventListener("mouseleave",i),e.removeEventListener("mouseleave",i),e.removeEventListener("wheel",a),e.removeEventListener("mousemove",c),e.removeEventListener("dblclick",u)}}}),[e])},f=function(){return f=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e},f.apply(this,arguments)},h=function(e,t){var n="function"==typeof Symbol&&e[Symbol.iterator];if(!n)return e;var r,o,i=n.call(e),a=[];try{for(;(void 0===t||t-- >0)&&!(r=i.next()).done;)a.push(r.value)}catch(c){o={error:c}}finally{try{r&&!r.done&&(n=i.return)&&n.call(i)}finally{if(o)throw o.error}}return a},d=function(e,t){for(var n=0,r=t.length,o=e.length;n<r;n++,o++)e[o]=t[n];return e},v=function(e){var t=e.isProtein,n=e.chromatogramData,o=e.clickedAnnotation,i=e.renderData,l=e.circularSelection,v=e.setCircularSelection,m=e.getCaretPosition,p=e.updateScroll,T=e.resetAngularScroll,g=e.zoomToSearchResult,y=e.draw,b=e.ref,C=e.width,A=e.height,k=e.sequence,S=e.allAnnotations,G=e.codons,x=e.Search,E=e.FilterChromatogram,w=e.openAnnotationDialog,R=e.isCircularView,L=k.length,M=h(a.useState([]),2),P=M[0],D=M[1],N=h((0,a.useState)(null),2),O=N[0],F=N[1],I=h(u(),2),W=I[0],q=I[1],V=a.useMemo((function(){var e=new Set;return S.forEach((function(t){t.locations.forEach((function(n){l.forEach((function(r){(0,c.a$)([n[0]-1,n[1]-1],r)&&e.add(t.id)}))}))})),d([],h(e))}),[S,l]),j=a.useMemo((function(){return S.filter((function(e){return!e.hidden}))}),[S]),B=a.useMemo((function(){return(0,c.Oq)(j,L)}),[j,L]),Y=h(a.useState(),2),U=Y[0],_=Y[1],K=h(a.useState(void 0),2),X=K[0],H=K[1],Z=h(a.useState(["A","C","G","T","phred"]),2),z=Z[0],J=Z[1];a.useEffect((function(){O&&H((0,c.Dc)(O).ratio)}),[O]);var Q=void 0!==X&&O&&i.current?{context:O,ratio:X,data:i.current}:void 0,$=a.useRef(!1),ee=function(){if(Q){$.current=!0;var e=y({codons:G,annotationLevels:B,c:Q.context,w:C,h:A,ratio:Q.ratio,data:Q.data,sequence:k,circularSelection:l,searchResults:P,renderStateRef:{hoveringFeature:U,clickedFeatures:V},isProtein:t,filterChromOptions:z,chromatogramData:n}).hoveringFeature;_(e)}},te=function(e,t){if(e){var n=j.filter((function(t){return t.id===e})).flatMap((function(e){var t=e.direction===c.fn.REVERSE;return e.locations.map((function(e){var n={start:e[t?1:0]-1,end:e[t?0:1]-1};return f({state:"selected",antiClockwise:t},n)}))}));i.current&&T&&T(),v(e,t?d(d([],h(l)),h(n)):n)}};b&&("current"in b?b.current={onClickAnnotation:te}:b({onClickAnnotation:te}));var ne=a.useRef(void 0),re=(0,c.Ds)((function(e){e.preventDefault(),p(e.deltaX,e.deltaY,e.offsetX,e.offsetY,e.shiftKey),ee()})),oe=!!l.find((function(e){return"selecting"===e.state})),ie=function(e){if(!oe)if(U)ne.current=U;else if(ne.current=void 0,i.current){var t=m(),n=d([],h(l));e.metaKey||e.shiftKey||n.splice(0,n.length);var r=(0,c.IW)(t,n);r?(r.state="selecting",r.start===r.end&&n.splice(n.indexOf(r),1)):n.push({state:"selecting",start:t,end:t,antiClockwise:void 0}),v(void 0,n),T&&T(),ee()}},ae=function(e){if(U&&U===ne.current)return te(U,e.metaKey),void(ne.current=void 0);ne.current=void 0,oe&&v(void 0,l.map((function(e){return f(f({},e),{state:"selected"})}))),ee()},ce=a.useRef(!1);ce.current=!1;var le=(0,c.Ds)((function(e){if(!U&&ne.current&&(ne.current=void 0),1===e.buttons&&!oe&&void 0===ne.current&&!1===ce.current)return ce.current=!0,void ie(e);if(0===e.buttons&&oe&&void 0===ne.current&&!1===ce.current)return ce.current=!0,void ae(e);var t=i.current;if(t){t.mouseX=e.offsetX,t.mouseY=e.offsetY;var n=m();if(1===e.buttons){var r=d([],h(l)),o=r.find((function(e){return"selecting"===e.state}));if(o){void 0===o.antiClockwise?o.start!==n&&(o.antiClockwise=n<o.start):o.start===n&&(o.antiClockwise=void 0),void 0!==o.antiClockwise&&(0,c.Ax)(L,o.antiClockwise,o.start,n)-(0,c.Ax)(L,o.antiClockwise,o.start,o.end)>.5&&(o.antiClockwise=!o.antiClockwise),o.end=n;var a=r.filter((function(e){return e!==o&&((0,c.cd)(e.start,o)||(0,c.cd)(e.end,o))}));a.length>0&&a.forEach((function(e){r.splice(r.indexOf(e),1)})),v(void 0,r)}}ee()}}));s(W,(function(e){var t;if(e.shiftKey){var n=null===(t=l[0])||void 0===t?void 0:t.start,r=m();void 0!==n&&v(void 0,[{start:n,end:r,antiClockwise:function(){if(n!==r)return R?n>r?n-r<L/2:r-n>L/2:n>r}(),state:"selecting"}])}}),ie,ae,re,le,(function(e){o&&w&&w(o)}));var ue=a.useRef(ee);ue.current=ee,(0,a.useEffect)((function(){W&&((0,c.IS)(W,C,A),F(W.getContext("2d")))}),[W,A,F,C]),(0,a.useEffect)((function(){Q&&!$.current&&ue.current()}),[Q]),a.useEffect((function(){ue.current()}),[l,S,C,A,t,o,k,G,P,z]),a.useLayoutEffect((function(){ue.current()}),[l,S,C,A,t,o,k,G,P]);var se=(0,r.jsx)("canvas",{ref:q},void 0),fe=function(e,t){g(e,t),v(void 0,[{state:"selected",start:e.complement?e.end-1:e.start,end:e.complement?e.start:e.end-1,antiClockwise:e.complement}]),ue.current()},he=x&&(0,r.jsx)(x,{isProtein:t,sequence:k,zoomOnResult:function(e){fe(e,!0)},onSearchResults:function(e){D(e)},spinOnResult:function(e){fe(e,!1)}},void 0),de=n&&E&&(0,r.jsx)(E,{optionsToRender:z,setOptionsToRender:function(e){return J(e)}},void 0);return{canvas:se,selectedAnnotations:V,circularSelection:l,setCircularSelection:v,clickedAnnotation:o,search:he,filterChromatogram:de,canvasRef:q,zoomToSearchResult:g,setSearchResults:D,render:ee}},m=function(e,t,n){var r=(e-96)/(t*(n?c.ci:c.Jn));return(0,c.h9)((0,c.ee)(48,0),(0,c.Wi)(r))},p=function(e,t,n){var r=a.useRef(null);return!r.current&&e&&(r.current={mouseX:0,mouseY:0,matrix:m(e,t.length,n),circluarCamera:{angleOffset:0,scrollOffsetZoomed:0,scrollOffsetZooming:0,value:{zoom:0,angle:0,radius:0},target:{zoom:1,angle:1,radius:1}}}),r}},442:function(e,t,n){n.d(t,{Ih:function(){return d},H:function(){return i},DC:function(){return a}});var r=n(3048),o=function(e,t){return e?r.J$[t].color:r.SD[t]},i=function(e){var t=e.a,n=e.b,r=e.c,o=e.d,i=e.e,a=e.f;return{a:-o/(r*n-t*o),b:n/(r*n-t*o),c:r/(r*n-t*o),d:-t/(r*n-t*o),e:(i*o-r*a)/(r*n-t*o),f:-(i*n-t*a)/(r*n-t*o)}},a=function(e,t,n){return{x:n.a*e+n.c*t+n.e,y:n.b*e+n.d*t+n.f}},c=function(e,t){var n="function"==typeof Symbol&&e[Symbol.iterator];if(!n)return e;var r,o,i=n.call(e),a=[];try{for(;(void 0===t||t-- >0)&&!(r=i.next()).done;)a.push(r.value)}catch(c){o={error:c}}finally{try{r&&!r.done&&(n=i.return)&&n.call(i)}finally{if(o)throw o.error}}return a},l=function(e,t){for(var n=0,r=t.length,o=e.length;n<r;n++,o++)e[o]=t[n];return e},u=64,s=function(e){var t,n=[];return function(){for(var r=[],o=0;o<arguments.length;o++)r[o]=arguments[o];return r.every((function(e,t){return e===n[t]}))||(t=e.apply(void 0,l([],c(r))),n=r),t}},f=s((function(e){for(var t=[],n=0;n<=e.length;n++){for(var o=n>0?e[n]-e[n-1]:e[n],i=0;i<o;i++){var a=n+i/o;t.push((0,r.bc)(a,n))}n===e.length&&t.push((0,r.bc)(n,n))}return t})),h=s((function(e){var t=Math.max.apply(Math,l([],c(e.phred))),n=t-Math.sqrt(t),r=function(t){return e.peakLocations.map((function(e){return t[e]})).filter((function(t,r){var o=e.phred;if(r>4||r<o.length-4){for(var i=0,a=r-4;a<r+4;a++)i+=o[a];return i/8>n}return!1}))},o=function(t){return e.peakLocations.map((function(e){return t[e]})).filter((function(t,n){var r=e.phred;return n>r.length/3&&n<2*r.length/3}))},i=l(l(l(l([],c(r(e.aTrace))),c(r(e.cTrace))),c(r(e.gTrace))),c(r(e.tTrace))),a=l(l(l(l([],c(o(e.aTrace))),c(o(e.cTrace))),c(o(e.gTrace))),c(o(e.tTrace)));return i.length>0?Math.max.apply(Math,l([],c(i))):Math.max.apply(Math,l([],c(a)))})),d=function(e){var t=e.c,n=e.w,s=e.h,d=e.ratio,v=e.sequence,m=e.annotationLevels,p=e.data,T=e.renderStateRef,g=e.searchResults,y=e.filterChromOptions,b=e.isProtein,C=e.chromatogramData,A=e.circularSelection,k=e.codons,S=v.length,G=S-1,x=b?r.ci:r.Jn;t.save(),t.resetTransform(),t.scale(d,d),t.clearRect(0,0,n,s),t.fillStyle="white",t.fillRect(0,0,n,s);var E=p.matrix,w=i(p.matrix),R=Math.max(Math.min(Math.floor(a(0,0,w).x/x),G),0),L=Math.max(Math.min(Math.floor(a(n,0,w).x/x),S),1),M=(a(n/2,0,w).x,a(0,0,w).x),P=a(n,0,w).x,D=a(p.mouseX,p.mouseY,w),N=D.x,O=D.y;t.save();var F=function(e){return e*E.a+E.e},I=function(e){return e+E.f},W=function(e,n,r,o,i){var a=t.measureText(e).width,c=n;"center"===i?c-=a/2/E.a:"end"===i&&(c-=a/E.a);var l=r;t.textBaseline="center"===o?"middle":"start"===o?"hanging":"bottom",t.fillText(e,F(c),I(l))},q=function(e){return e*x+0},V=0,j=24;if(b){for(var B=(0,r.bc)(4,48,200),Y=(0,r.bc)(24,80,200),U=0;U<2;U+=1)Y[V]*E.a<=Y[V]-B[V]&&(V+=1);j=Y[V]*E.a,2===V&&j<20&&(V+=1),3===V&&(j=Math.max(6,j))}else(j=24*E.a)<=6&&(V=3),3===V&&(j=6);var _=function(e){var n=e.i,r=e.phred,o=e.yMax,i=q(n);if(y.includes("phred")){var a=u+j-E.f,c=54*(1-r/o)-54;t.lineWidth=1,t.strokeStyle="rgba(0, 0, 0, 0.075)",t.strokeRect(F(i),I(a),x*E.a,c)}},K=function(e){var n=e.base,r=e.iInterpol,i=e.iNext,a=e.value,c=e.nextValue,l=e.top,u=e.yMax,s=j+5,f=function(e){return q(e)-x/2},h=function(e){return(l-s)*(1-e/u)-E.f},d=o(b,n);t.lineWidth=1,t.strokeStyle=d,t.beginPath(),t.moveTo(F(f(r)),I(h(a))),t.lineTo(F(f(i)),I(h(c))),t.stroke()},X=function(e){var n=e.base,i=e.i,a=e.top,c=e.align,l=void 0===c?"start":c,u=q(i),s=o(b,n);if(t.fillStyle=s,t.textBaseline="bottom",3===V)t.lineWidth=1,t.strokeStyle="rgba(0, 0, 0, "+Math.min(1,Math.max(x*E.a-2,0))+")",t.fillRect(F(u),I(a),x*E.a,j),t.strokeRect(F(u),I(a),x*E.a,j);else{var f=function(e,t,n){return t?0===e?r.J$[n].name:1===e?r.J$[n].threeLettersName:n:n}(V,b,n);t.font=(0,r.qT)(j,"bold"),W(f,u+x/2,a,l,"center")}},H=[],Z=u+4*j+16;m.forEach((function(e,n){var o=Z+24*n+3+3;b&&(o=u+j+3+3+24*n+16+16),e.forEach((function(e,n){var i="normal",a=e.displayAsSequence&&V<3,s=a?j:20;if(e.locations.length>1){var f=Math.min.apply(Math,l([],c(e.locations.map((function(e){return e[0]}))))),h=Math.max.apply(Math,l([],c(e.locations.map((function(e){return e[1]})))));if((0,r.Wk)({start:e.locations[0][0],end:e.locations[e.locations.length-1][1],antiClockwise:e.direction===r.fn.REVERSE,state:"selected"})){t.lineWidth=1,t.strokeStyle="black";var d=function(e,n){t.lineTo(F(e+-15/E.a+2*n/E.a),I(o+s/2+2*(n%2==0?-1:1)))},m=function(e,n){var r="forward"===n?0:7;if(t.moveTo(F(e+-15/E.a+2*r/E.a),I(o+s/2+2*(r%2==0?-1:1))),"forward"===n)for(var i=1;i<=7;i+=1)d(e,i);else for(var a=6;a>=0;a-=1)d(e,a)};t.beginPath(),m(0,"forward"),t.lineTo(F(0),I(o+s/2)),t.lineTo(F(f*x),I(o+s/2)),t.stroke(),t.closePath(),t.beginPath(),m(S*x+17,"reverse"),t.lineTo(F(S*x),I(o+s/2)),t.lineTo(F(h*x),I(o+s/2)),t.stroke(),t.closePath()}else t.beginPath(),t.moveTo(F(f*x),I(o+s/2)),t.lineTo(F(h*x),I(o+s/2)),t.lineWidth=1,t.strokeStyle="black",t.stroke(),t.closePath()}e.locations.forEach((function(n){var l=[{loc:n}];(0,r.d1)(n,e.direction)&&(l=[{loc:(0,r.bc)(n[0],S),type:e.direction===r.fn.FORWARD?"tail":"head"},{loc:(0,r.bc)(1,n[1]),type:e.direction===r.fn.REVERSE?"tail":"head"}]),l.forEach((function(n){var l=n.loc,f=n.type,h=(l[0]-1)*x+0,d=(Math.abs(l[1]-l[0])+1)*x,m=h,p=h+d,g=o,y=o+s;N>=h&&N<=h+d&&O>=o&&O<=o+s?(T.hoveringFeature=e.id,i="hovering"):T.hoveringFeature===e.id&&(T.hoveringFeature=void 0),T.clickedFeatures.includes(e.id)&&(i="clicked");var b=8/E.a>=d?0:8/E.a,C=function(e){for(var n=1;n<=6;n+=1)t.lineTo(F(("right"===e?p:m)+("right"===e?-1:1)*(n%2==1?4/E.a:0)),I(y-n*s/6))},A=function(e,n){t.strokeStyle="rgba(100, 100, 100, 1)";var r="left"===e?m:p,o="left"===n?-1:1;e+n==="leftright"?r-=36/E.a:e+n==="rightleft"&&(r+=36/E.a),t.lineWidth=1,t.beginPath(),t.moveTo(F(r+o*(8/E.a)),I(g+1*s/4)),t.lineTo(F(r+o*(8/E.a)),I(y-1*s/4)),t.stroke(),t.closePath(),t.beginPath(),t.moveTo(F(r+o*(8/E.a)),I(y-1*s/4)),t.lineTo(F(r+o*(24/E.a)),I(y-1*s/4)),t.lineWidth=1,t.stroke(),t.closePath(),t.beginPath(),t.moveTo(F(r+o*(24/E.a)),I(y-1*s/4)),t.lineTo(F(r+o*(24/E.a)),I(y-1*s/4+1*s/6)),t.stroke(),t.closePath(),t.beginPath(),t.moveTo(F(r+o*(24/E.a)),I(y-1*s/4+1*s/6)),t.lineTo(F(r+o*(32/E.a)),I(y-s/2)),t.lineTo(F(r+o*(24/E.a)),I(g+1*s/4-1*s/6)),t.lineWidth=1,t.stroke(),t.closePath(),t.beginPath(),t.moveTo(F(r+o*(24/E.a)),I(g+1*s/4-1*s/6)),t.lineTo(F(r+o*(24/E.a)),I(g+1*s/4)),t.stroke(),t.closePath(),t.beginPath(),t.moveTo(F(r+o*(24/E.a)),I(g+1*s/4)),t.lineTo(F(r+o*(8/E.a)),I(g+1*s/4)),t.lineWidth=1,t.stroke(),t.closePath()};if("tail"===f?e.direction===r.fn.REVERSE?(A("left","left"),t.beginPath(),t.moveTo(F(p),I(g)),t.lineTo(F(p),I(y)),t.lineTo(F(m),I(y)),C("left"),t.closePath()):(A("right","right"),t.beginPath(),t.moveTo(F(m),I(g)),t.lineTo(F(m),I(y)),t.lineTo(F(p),I(y)),C("right"),t.lineTo(F(p),I(g)),t.closePath()):"head"===f?e.direction===r.fn.FORWARD?(A("left","right"),t.beginPath(),t.moveTo(F(m),I(g)),t.lineTo(F(p-b),I(g)),t.lineTo(F(p),I(g+s/2)),t.lineTo(F(p-b),I(y)),t.lineTo(F(m),I(y)),C("left"),t.closePath()):e.direction===r.fn.REVERSE&&(A("right","left"),t.beginPath(),t.moveTo(F(m+b),I(g)),t.lineTo(F(m),I(g+s/2)),t.lineTo(F(m+b),I(y)),t.lineTo(F(p),I(y)),C("right"),t.closePath()):void 0===e.direction||e.direction===r.fn.NOT_DEFINED?(t.beginPath(),t.moveTo(F(m),I(g)),t.lineTo(F(m),I(y)),t.lineTo(F(p),I(y)),t.lineTo(F(p),I(g)),t.closePath()):e.direction===r.fn.FORWARD?(t.beginPath(),t.moveTo(F(m),I(g)),t.lineTo(F(p-b),I(g)),t.lineTo(F(p),I(g+s/2)),t.lineTo(F(p-b),I(y)),t.lineTo(F(m),I(y)),t.closePath()):e.direction===r.fn.REVERSE&&(t.beginPath(),t.moveTo(F(m+b),I(g)),t.lineTo(F(m),I(g+s/2)),t.lineTo(F(m+b),I(y)),t.lineTo(F(p),I(y)),t.lineTo(F(p),I(g)),t.closePath()),a?(t.fillStyle="white",t.fill()):(t.fillStyle=e.color,t.fill()),t.lineWidth=1,t.strokeStyle="rgba(100, 100, 100, 1)",t.stroke(),t.save(),t.clip(),"hovering"!==i&&"clicked"!==i||(t.strokeStyle="black",t.stroke()),a)for(var k=l[0]-1;k<l[1];k+=1)X({base:v[k],i:k,top:o});else{var G=String(e.displayLabel||e.label);t.font=(0,r.qT)(12,"bold");var w=function(e){return t.measureText(e).width}(G),R=(0,r.uu)(e.color);t.fillStyle=R,w/E.a>d-4/E.a?W(G,h+2,o+s/2,"center","start"):W(G,Math.min(Math.max(h+d/2,M+8/E.a+w/E.a/2),P-8/E.a-w/E.a/2),o+s/2,"center","center")}t.restore();var L=e.rightTag;if(L&&(t.fillStyle="black",W(String(L),h+d+4/E.a,o+s/2,"center","start")),(0,r.UG)(e,l,S,(function(e,t){X({base:t,i:e,top:o+(s-j)/2,align:"start"})})),"DNA_RE_NUC"===e.type){var D=e.direction===r.fn.REVERSE,q=l[0],V=l[1],B=q-1,Y=V,U=e.cleavageSites,_=U[0],K=U[U.length-1],Z=_[1],z=K[1];1===U.length&&(Z=_[0],z=_[1]);var J=D?Y-Z:B+Z,Q=D?Y-z:B+z,$=D?[Q,J]:[J,Q];H.push($);for(var ee=$[0];ee<$[1];ee+=1){var te=ee;te<0&&(te=S+ee),X({base:(0,r.Rj)(v[te]),i:te,top:u+2*j+3})}U.forEach((function(e){var n=c(e,2),r=n[0],o=n[1],a=D?Y-o:B+r,l=c([a*x,u+1*j],2),s=l[0],f=l[1],h=c([a*x,u+2*j],2),d=h[0],v=h[1];t.strokeStyle="hovering"===i||"clicked"===i?"red":"black",t.lineWidth=3,t.beginPath(),t.lineTo(F(s),I(f)),t.lineTo(F(d),I(v));var m=D?Y-r:B+o;t.lineTo(F(m*x),I(u+2*j));var p=c([m*x,u+3*j],2),T=p[0],g=p[1];t.strokeStyle="hovering"===i||"clicked"===i?"red":"black",t.lineTo(F(T),I(g)),t.stroke(),t.closePath()}))}}))}))}))}));for(var z=function(e){var n=q(e);if(n+x<M||n>P)return"continue";X({base:v[e],i:e,top:u-E.f+(b?0:j)});var o=48/(x*E.a),i=Math.floor(G/o),a=Math.max(Math.floor(G/i),1),c=function(){t.fillStyle="black",t.font=(0,r.qT)(12,"normal"),W(String(e+1),n+x/2,u-E.f,"end","center")};(0===e||e===G||e%a==0&&e>.7*a&&e<S-.7*a)&&c()},J=R;J<Math.min(L+1,v.length);J+=1)z(J);t.restore(),g.length>0&&g.forEach((function(e){var n=e.start,o=e.end,i=n*x,a=o*x,c=u;if(b||(c+=j),e.complement&&!b){c+=j+3;for(var l=n;l<o;l+=1)X({base:(0,r.Rj)(v[l]),i:l,top:c})}var s=Math.min(Math.max(1-E.a,.4),.8);t.fillStyle="rgba(255,151,0, "+s+")",e.active&&(t.fillStyle="rgba(0, 0, 255, "+s+")"),t.beginPath(),t.moveTo(F(i),I(c)),t.lineTo(F(a),I(c)),t.lineTo(F(a),I(c+j)),t.lineTo(F(i),I(c+j)),t.closePath(),t.fill()}));var Q=Math.max(Math.min(j/3,8),4),$=u+j*(b?1:2)+3;A.forEach((function(e){var n=e.start,o=e.end+1;!0===e.antiClockwise&&(n=e.end,o=e.start+1);var i=n*x,a=o*x;!1===e.antiClockwise&&(a-=Q/E.a),!0===e.antiClockwise&&(i+=Q/E.a);var c=$-E.f;!0!==e.antiClockwise||b||(c+=j),t.beginPath(),t.moveTo(F(i),I(c)),t.lineTo(F(a),I(c)),t.lineWidth=3,t.strokeStyle="black",t.fillStyle="black",t.stroke(),t.closePath(),t.beginPath(),!0===e.antiClockwise&&(t.moveTo(F(i),I(c-Q)),t.lineTo(F(i-Q/E.a),I(c)),t.lineTo(F(i),I(c+Q))),!1===e.antiClockwise&&(t.moveTo(F(a),I(c-Q)),t.lineTo(F(a+Q/E.a),I(c)),t.lineTo(F(a),I(c+Q))),t.closePath(),t.fill();var l=function(e,n,o){var i=k[e]||"X",a=(0,r.su)(i);t.fillStyle=a,t.strokeStyle="rgba(0, 0, 0, "+Math.min(1,Math.max(x*E.a-2,0))+")",t.beginPath(),t.lineWidth=1,t.rect(F(n*x),I($+o),3*x*E.a,j),t.fill(),t.stroke(),t.closePath(),t.font=(0,r.qT)(j,"bold"),t.fillStyle=(0,r.nU)(i)?"#c8d9fa":"#282c34",t.textBaseline="top",V<=2&&W(i,(n+1.5)*x,$+o,"start","center")},s="";if(!b)if(!0===e.antiClockwise)for(var f=e.start;f>=e.end;f-=1){var h=(0,r.Rj)(v[f]);X({base:h,i:f,top:$-E.f}),3===(s+=h).length&&(l(s,f,j-E.f),s="")}else if(!1===e.antiClockwise)for(var d=e.start;d<=e.end;d+=1)3===(s+=v[d]).length&&(l(s,d-2,j-E.f),s="");var m=e.end,p=e.start,T=e.antiClockwise,g=(0,r.GQ)(e,b,v.length);t.font=(0,r.qT)(16,"bold"),t.fillStyle="black",t.textBaseline="top";var y=(0,r.R7)(p,m,S,T),C=4*j;b&&(C=j),W(g,y*x+x/2,u+C+3+3-E.f,"start","center")}));var ee=Math.min(Math.max(N,0),S*x),te=Math.max(Math.min(Math.floor(ee/x),G),0),ne=(0,r.IW)(te,A),re=!1;ne&&!0===ne.antiClockwise&&(re=!0);var oe=70,ie=oe+j+(re?j:0),ae=oe+2*j+(re?j:0),ce=oe+2*j+(re?((0,r.Lc)(S,!0,ne.start,ne.end)>=3?2:1)*j:0);if(b&&(ie=oe+j,ae=oe+j+16,ce=oe+j+16),t.beginPath(),t.moveTo(F(ee),I(ie)-E.f),t.lineTo(F(ee),I(ae)-E.f),t.lineWidth=3,t.strokeStyle="rgba(0, 0, 0, 0.5)",t.stroke(),t.closePath(),t.font=(0,r.qT)(16,"bold"),t.fillStyle="black",W(String(te+1),ee,ce-E.f,"start","center"),C){for(var le=C.peakLocations,ue=C.phred,se=0;se<ue.length;se++){var fe=Math.max.apply(Math,l([],c(ue)));_({i:se,phred:ue[se],yMax:fe})}Object.entries(C).filter((function(e){var t=c(e,2),n=t[0];t[1];return n.includes("Trace")&&y.includes(n.charAt(0).toUpperCase())})).forEach((function(e){var t=c(e,2),n=t[0],r=t[1];if("string"!=typeof r&&n.includes("Trace"))for(var o=r,i=n.charAt(0).toUpperCase(),a=f(le),l=h(C),u=0;u<a.length-1;u++)a[u][1]<R||a[u][1]>L||K({base:i,iInterpol:a[u][0],iNext:a[u+1][0],value:o[u],nextValue:o[u+1],top:$,yMax:l})}))}return t.restore(),T}},3048:function(e,t,n){var r;n.d(t,{fn:function(){return r},J$:function(){return a},d1:function(){return I},uF:function(){return O},Wi:function(){return Z},ee:function(){return H},Ds:function(){return S},Jn:function(){return c},SD:function(){return o},su:function(){return g},qT:function(){return R},R7:function(){return _},B6:function(){return T},Rj:function(){return G},Dc:function(){return L},zO:function(){return x},Lc:function(){return Y},Ax:function(){return U},GQ:function(){return K},IW:function(){return B},uu:function(){return N},Mu:function(){return u},cd:function(){return j},a$:function(){return V},Wk:function(){return q},h9:function(){return J},UG:function(){return $},Oq:function(){return k},ci:function(){return l},XA:function(){return Q},IS:function(){return M},$X:function(){return E},nU:function(){return m},bc:function(){return v}}),function(e){e.FORWARD="FORWARD",e.NOT_DEFINED="NOT_DEFINED",e.REVERSE="REVERSE"}(r||(r={}));var o={A:"#C20000",T:"#00B700",C:"#1000BA",G:"#F5BF02",R:"black",Y:"black",W:"black",S:"black",M:"black",K:"black",H:"black",B:"black",V:"black",D:"black",N:"black"},i={R:"Y",Y:"R",W:"W",S:"S",M:"K",K:"M",H:"D",B:"V",V:"B",D:"H",N:"N",A:"T",T:"A",G:"C",C:"G"},a={A:{value:"A",name:"Alanine",threeLettersName:"Ala",hydrophobicity:1.8,color:"#A7A7A7"},R:{value:"R",name:"Arginine",threeLettersName:"Arg",hydrophobicity:-4.5,color:"#145AFF"},N:{value:"N",name:"Asparagine",threeLettersName:"Asn",hydrophobicity:-3.5,color:"#00DCDC"},D:{value:"D",name:"Aspartic acid",threeLettersName:"Asp",hydrophobicity:-3.5,color:"#E60A0A"},C:{value:"C",name:"Cysteine",threeLettersName:"Cys",hydrophobicity:2.5,color:"#E6E600"},E:{value:"E",name:"Glutamic acid",threeLettersName:"Glu",hydrophobicity:-3.5,color:"#E60A0A"},Q:{value:"Q",name:"Glutamine",threeLettersName:"Gln",hydrophobicity:-3.5,color:"#00DCDC"},G:{value:"G",name:"Glycine",threeLettersName:"Gly",hydrophobicity:-.4,color:"#A7A7A7"},H:{value:"H",name:"Histidine",threeLettersName:"His",hydrophobicity:-3.2,color:"#8282D2"},I:{value:"I",name:"Isoleucine ",threeLettersName:"Ile",hydrophobicity:4.5,color:"#0F820F"},L:{value:"L",name:"Leucine",threeLettersName:"Leu",hydrophobicity:3.8,color:"#0F820F"},K:{value:"K",name:"Lysine",threeLettersName:"Lys",hydrophobicity:-3.9,color:"#145AFF"},M:{value:"M",name:"Methionine",threeLettersName:"Met",hydrophobicity:1.9,color:"#E6E600"},F:{value:"F",name:"Phenylalanine",threeLettersName:"Phe",hydrophobicity:2.8,color:"#3232AA",doInvert:!0},P:{value:"P",name:"Proline",threeLettersName:"Pro",hydrophobicity:-1.6,color:"#DC9682"},S:{value:"S",name:"Serine",threeLettersName:"Ser",hydrophobicity:-.8,color:"#FA9600"},T:{value:"T",name:"Threonine",threeLettersName:"Thr",hydrophobicity:-.7,color:"#FA9600"},U:{value:"U",name:"Selenocysteine",threeLettersName:"Sec",color:"#FF0000"},W:{value:"W",name:"Tryptophan",threeLettersName:"Trp",hydrophobicity:-.9,color:"#B45AB4"},Y:{value:"Y",name:"Tyrosine",threeLettersName:"Tyr",hydrophobicity:-1.3,color:"#3232AA",doInvert:!0},V:{value:"V",name:"Valine",threeLettersName:"Val",hydrophobicity:4.2,color:"#0F820F"},"*":{value:"*",name:"Stop",threeLettersName:"Stop",color:"#000000"},".":{value:".",name:"Stop",threeLettersName:"Stop",color:"#000000"},"-":{value:"-",name:"Gap",threeLettersName:"Gap",color:"#ffffff"},B:{value:"B",threeLettersName:"ND",color:"lightpurple",isAmbiguous:!0,name:"B",aliases:"ND"},J:{value:"J",threeLettersName:"IL",color:"lightpurple",isAmbiguous:!0,name:"J",aliases:"IL"},X:{value:"X",threeLettersName:"ACDEFGHIKLMNPQRSTVWY",color:"lightpurple",isAmbiguous:!0,name:"X",aliases:"ACDEFGHIKLMNPQRSTVWY"},Z:{value:"Z",threeLettersName:"QE",color:"lightpurple",isAmbiguous:!0,name:"Z",aliases:"QE"}},c=24,l=150,u={TAG:"*",TAA:"*",TGA:"*",GCG:"A",GCA:"A",GCT:"A",GCC:"A",TGT:"C",TGC:"C",GAT:"D",GAC:"D",GAA:"E",GAG:"E",TTT:"F",TTC:"F",GGT:"G",GGA:"G",GGG:"G",GGC:"G",CAT:"H",CAC:"H",ATA:"I",ATT:"I",ATC:"I",AAA:"K",AAG:"K",CTA:"L",TTA:"L",CTT:"L",TTG:"L",CTC:"L",CTG:"L",ATG:"M",AAT:"N",AAC:"N",CCG:"P",CCA:"P",CCT:"P",CCC:"P",CAA:"Q",CAG:"Q",CGT:"R",CGA:"R",CGC:"R",AGA:"R",AGG:"R",CGG:"R",TCG:"S",AGT:"S",TCA:"S",TCT:"S",TCC:"S",AGC:"S",ACG:"T",ACT:"T",ACA:"T",ACC:"T",GTA:"V",GTT:"V",GTC:"V",GTG:"V",TGG:"W",TAT:"Y",TAC:"Y"},s=function(){return s=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e},s.apply(this,arguments)},f=function(e,t){var n="function"==typeof Symbol&&e[Symbol.iterator];if(!n)return e;var r,o,i=n.call(e),a=[];try{for(;(void 0===t||t-- >0)&&!(r=i.next()).done;)a.push(r.value)}catch(c){o={error:c}}finally{try{r&&!r.done&&(n=i.return)&&n.call(i)}finally{if(o)throw o.error}}return a},h=function(e,t){for(var n=0,r=t.length,o=e.length;n<r;n++,o++)e[o]=t[n];return e},d=function(e){var t="function"==typeof Symbol&&Symbol.iterator,n=t&&e[t],r=0;if(n)return n.call(e);if(e&&"number"==typeof e.length)return{next:function(){return e&&r>=e.length&&(e=void 0),{value:e&&e[r++],done:!e}}};throw new TypeError(t?"Object is not iterable.":"Symbol.iterator is not defined.")};function v(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];return e}function m(e){return"FYKRDELIV*.".includes(e)}var p,T=function(e){return o[e]},g=function(e){var t;return null===(t=a[e])||void 0===t?void 0:t.color},y=function(e){var t=0;return e.forEach((function(e){t+=e})),t},b=function(e){var t=e.rightTag;return t?2*String(t).length:0},C=function(e){var t=Math.min.apply(Math,h([],f(e.locations.flat()))),n=Math.max.apply(Math,h([],f(e.locations.flat())));return Math.abs(n-t)+b(e)},A=function e(t,n,r,o){var i=Math.min.apply(Math,h([],f(t.locations.map((function(e){return f(e,1)[0]})).flat()))),a=Math.max.apply(Math,h([],f(t.locations.map((function(e){return f(e,2)[1]})).flat()))),c=Math.min.apply(Math,h([],f(n.locations.map((function(e){return f(e,1)[0]})).flat()))),l=Math.max.apply(Math,h([],f(n.locations.map((function(e){return f(e,2)[1]})).flat()))),u=i>a,d=c>l;if(o.value+=1,o.value>20)return!0;if(!u&&!d)return Math.max(i,c)<=Math.min(a+b(t),l+b(n));var m=function(e){return s(s({},e),{locations:[v(Math.min.apply(Math,h([],f(e.locations.map((function(e){return f(e,1)[0]})).flat()))),r)]})},p=function(e){return s(s({},e),{locations:[v(0,Math.max.apply(Math,h([],f(e.locations.map((function(e){return f(e,2)[1]})).flat()))))]})};return u&&!d?e(m(t),n,r,o)||e(p(t),n,r,o):!u&&d?e(m(n),t,r,o)||e(p(n),t,r,o):!(!u||!d)&&(e(m(n),m(t),r,o)||e(p(n),p(t),r,o))},k=function(e,t){for(var n,r=[],o=h([],f(e)).sort((function(e,t){return C(e)-C(t)})),i=function(){var e,n,i=o.pop();if(!i)return"continue-stackLoop";try{for(var a=(e=void 0,d(r)),c=a.next();!c.done;c=a.next()){var l=c.value;if(l.every((function(e){return!A(i,e,t,{value:0})})))return l.push(i),"continue-stackLoop"}}catch(u){e={error:u}}finally{try{c&&!c.done&&(n=a.return)&&n.call(a)}finally{if(e)throw e.error}}r.push([i])};o.length;)i();return r.sort((n=!0,function(e,t){var r=n?1:-1,o=r*(e.length-t.length),i=r*y(e.map(C))-y(t.map(C));return 0===i?0:i<0?-1:i>0?1:0===o?0:o<0?-1:o>0?1:0})).reverse()},S=function(e){return function(){for(var t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];p&&window.cancelAnimationFrame(p),p=window.requestAnimationFrame((function(){e.apply(void 0,h([],f(t)))}))}},G=function(e){if(e.match(/-|\.| /))return e;var t=i[e];if(!t)throw new Error("invalid nucleotide "+e);return t},x=function(e,t){var n=t.split("");return n.reverse(),e?n.join(""):n.map(G).join("")};var E=function(e,t,n){return e?function(e,t){for(var n=0;n<t.length;n+=1)if(e[n]!==t[n])return!1;return!0}(t,n):function(e,t){if(t.length!==e.length)throw new Error("sequence and site must be the same length");for(var n=0;n<t.length;n+=1)if(r=e[n],o=t[n],!(r.match(/-|\.| /)&&o.match(/-|\.| /)||"A"===o&&"A"===r||"C"===o&&"C"===r||"G"===o&&"G"===r)&&("T"!==o&&"U"!==o||"T"!==r&&"U"!==r)&&("R"!==o||"A"!==r&&"G"!==r)&&("Y"!==o||"C"!==r&&"T"!==r&&"U"!==r)&&("S"!==o||"G"!==r&&"C"!==r)&&("W"!==o||"A"!==r&&"T"!==r&&"U"!==r)&&("K"!==o||"G"!==r&&"T"!==r&&"U"!==r)&&("M"!==o||"A"!==r&&"C"!==r)&&("B"!==o||"C"!==r&&"G"!==r&&"T"!==r&&"U"!==r)&&("D"!==o||"A"!==r&&"G"!==r&&"T"!==r&&"U"!==r)&&("H"!==o||"A"!==r&&"C"!==r&&"T"!==r&&"U"!==r)&&("V"!==o||"A"!==r&&"C"!==r&&"G"!==r)&&"N"!==o)return!1;var r,o;return!0}(t,n)},w=function(e,t){var n="function"==typeof Symbol&&e[Symbol.iterator];if(!n)return e;var r,o,i=n.call(e),a=[];try{for(;(void 0===t||t-- >0)&&!(r=i.next()).done;)a.push(r.value)}catch(c){o={error:c}}finally{try{r&&!r.done&&(n=i.return)&&n.call(i)}finally{if(o)throw o.error}}return a};function R(e,t){return void 0===t&&(t="normal"),"normal normal "+t+" "+e+"px sans-serif"}function L(e){var t=window.devicePixelRatio||1,n=e.webkitBackingStorePixelRatio||e.mozBackingStorePixelRatio||e.msBackingStorePixelRatio||e.oBackingStorePixelRatio||e.backingStorePixelRatio||1;return{ratio:t/n,shouldScale:t!==n}}function M(e,t,n){var r=e.getContext("2d");if(r){var o=L(r),i=o.ratio,a=o.shouldScale;return a?(e.width=t*i,e.height=n*i,e.style.width=t+"px",e.style.height=n+"px"):(e.width=t,e.height=n,e.style.width="",e.style.height=""),{ratio:i,shouldScale:a}}}var P=null,D=null,N=function(e){if(!P){var t=document.getElementById("seq-view-offscreen-canvas");t?P=t:((P=document.createElement("canvas")).id="seq-view-offscreen-canvas",P.style.position="absolute",P.style.left="-10px",P.style.width="1px",P.style.height="1px",P.width=2,P.height=2,P.style.visibility="hidden",document.body.appendChild(P))}D||(D=P.getContext("2d",{willReadFrequently:!0}));var n=D;if(n){n.clearRect(0,0,1,1),n.fillStyle=e,n.fillRect(0,0,1,1);var r=w(n.getImageData(0,0,1,1).data,3),o=r[0],i=r[1],a=r[2];return n.clearRect(0,0,1,1),.299*o+.587*i+.114*a>150?"black":"white"}return"black"},O={primaryText:"#000000",primaryBackground:"#ffffff",websiteSecondary:"#00647b",websiteSecondaryLight:"#008dae",websiteSecondaryDark:"#003b48",websiteTertiary:"#0A3D51",websiteTertiaryDark:"#041b24",websiteTertiaryLight:"#105f7e",secondaryText:"#1f497d",secondaryBackground:"#eeece1",accent1:"#139cb2",accent1Light:"#18c4e0",accent1Dark:"#0e7484",accent2:"#eaebe0",accent3:"#fc4711",accent3Light:"#fd6e43",accent3Dark:"#d73403",accent4:"#e20047",accent4Light:"#ff165f",accent4Dark:"#af0037",accent5:"#28a745",accent5Light:"#98d26c",accent5Dark:"#64a533",accent6:"#8af74d",accent6Light:"#aaf97e",accent6Dark:"#6af51c",link:"#0000ff"},F=function(e,t){var n="function"==typeof Symbol&&e[Symbol.iterator];if(!n)return e;var r,o,i=n.call(e),a=[];try{for(;(void 0===t||t-- >0)&&!(r=i.next()).done;)a.push(r.value)}catch(c){o={error:c}}finally{try{r&&!r.done&&(n=i.return)&&n.call(i)}finally{if(o)throw o.error}}return a},I=function(e,t){return t==r.REVERSE?W({start:e[1],end:e[0]},!0):W({start:e[0],end:e[1]},!1)},W=function(e,t){var n=e.start,r=e.end;if(n!==r){if(!0===t)return!(n>r);if(!1===t)return!(r>n)}return!1},q=function(e){return W(e,!!e.antiClockwise)},V=function(e,t){var n=F(e,2),r=n[0],o=n[1],i=t.start,a=t.end,c=t.antiClockwise;if(i===a&&a===r&&a===o)return!0;if(i!==a)if(!0===c){if(i>a){if(r>=a&&r<=i&&o>=a&&o<=i)return!0}else if(r>=a||o<=i)return!0}else if(!1===c)if(a>i){if(r>=i&&r<=a&&o>=i&&o<=a)return!0}else if(r>=i||o<=a)return!0;return!1},j=function(e,t){var n=t.start,r=t.end,o=t.antiClockwise;if(n===r&&r===e)return!0;if(n!==r)if(!0===o){if(n>r){if(e>=r&&e<=n)return!0}else if(e>=r||e<=n)return!0}else if(!1===o)if(r>n){if(e>=n&&e<=r)return!0}else if(e>=n||e<=r)return!0;return!1},B=function(e,t){return t.find((function(t){return j(e,t)}))},Y=function(e,t,n,r){var o=n,i=r;return!0===t&&(o=r,i=n),o>i?e-o+i:i-o+1},U=function(e,t,n,r){return Y(e,t,n,r)/e},_=function(e,t,n,r){var o=(e+t)/2;return t>e&&!1===r?o=(e+t)/2:t<e&&!1===r?o=(e+(n-e+t)/2)%n:t<e&&!0===r?o=(e+t)/2:t>e&&!0===r&&(o=(t+(n-t+e)/2)%n),o},K=function(e,t,n){var r=e.end,o=e.start,i=e.antiClockwise,a=o+1+" - "+(r+1);a=o===r?String(o+1):i?r+1+" - "+(o+1):o+1+" - "+(r+1);var c=0;if((c=i&&o<r?o+n-r:!i&&r<o?r+n-o:r-o>0?r-o:o-r)>0){var l=Math.floor((c+1)/3);a+=" ("+(c+1)+" "+(t?"aa":"bp"),l>0&&!t&&(a+=", "+l+" aa"),a+=")"}return a},X=function(){return X=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e},X.apply(this,arguments)},H=function(e,t){return{a:1,b:0,c:0,d:1,e:e,f:t}},Z=function(e){return{a:e,b:0,c:0,d:1,e:0,f:0}},z=function(e,t){var n,r=e.a,o=e.b,i=e.c,a=e.d,c=e.e,l=e.f,u={g:(n=t).a,h:n.b,i:n.c,j:n.d,k:n.e,l:n.f},s=u.g,f=u.h,h=u.i,d=u.j,v=u.k,m=u.l;return{a:r*s+i*f,b:o*s+a*f,c:r*h+i*d,d:o*h+a*d,e:r*v+i*m+c,f:o*v+a*m+l}},J=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];var n={a:1,b:0,c:0,d:1,e:0,f:0};return e.forEach((function(e){n=z(n,e)})),X({},n)},Q=function(e){var t=e.len,n=e.startIndex,r=e.endIndex,o=0,i="sequence"in e?function(t){return e.onRenderBase(t,e.sequence[o++])}:function(t){return e.onRenderBase(t)};if(n>r){for(var a=n;a<t;a+=1)i(a);for(a=0;a<r+1;a+=1)i(a)}else for(a=n;a<r+1;a+=1)i(a)},$=function(e,t,n,o){if("DNA_OLIGO"===e.type){var i=e.fivePExtension;i&&(e.direction===r.REVERSE?Q({startIndex:t[1],endIndex:(t[1]+i.length-1)%n,sequence:i.split("").reverse().join(""),len:n,onRenderBase:o}):Q({startIndex:(t[0]-1-i.length+n)%n,endIndex:(t[0]-2+n)%n,sequence:i,len:n,onRenderBase:o}))}}},3167:function(e,t,n){n.d(t,{j:function(){return o}});var r=n(8851),o=function(e){var t=e.children;return r.createElement("div",{style:{textAlign:"center"}},r.createElement("div",{style:{boxShadow:"0 0 60px rgba(0, 0, 0, 0.04)",borderRadius:"16px",overflow:"hidden",margin:"0 auto",display:"flex",justifyContent:"center"}},t))}},2104:function(e,t,n){n.d(t,{G:function(){return u}});var r=n(8851),o=n(3167),i=n(442),a=n(3048),c=n(7019),l=n(256),u=function(e){var t=e.w,n=void 0===t?640:t,u=e.h,s=void 0===u?480:u,f=e.mouseX,h=void 0===f?0:f,d=e.mouseY,v=void 0===d?s:d,m=e.sequence,p=void 0===m?"TCCTCGCATAGGGCGGATCGGTATTCATGGGACGCCACACAACTCTTAGATTGATTGTCGCTTTCAGGCGTGTCATCCTGCGCCCCGGCACGAGCTCGTCCGGCGGTATAGTCGTATGTGCTTATACACATCAAAGCTAACAAATCTTTCTGCGGGCGGTCGTCACGACACACGTTCTTACG":m,T=e.len,g=void 0===T?p.length:T,y=e.isProtein,b=e.mid,C=void 0===b?g/2:b,A=e.annotationLevels,k=void 0===A?[]:A,S=e.startZoom,G=void 0===S?55:S,x=e.circularSelection,E=void 0===x?[]:x,w=e.searchResults,R=void 0===w?[]:w,L=(0,c.$P)(),M=L[0],P=L[1],D=r.useState(G),N=D[0],O=D[1],F=r.useRef(void 0);M&&!F.current&&((0,a.IS)(M,n,s),F.current=M.getContext("2d"));var I=r.useRef(!1),W=function(e){var t=F.current;if(t){I.current=!0;var r=(0,a.Dc)(t).ratio;(0,i.Ih)({c:t,w:n,h:s,ratio:r,circularSelection:E,codons:a.Mu,data:{mouseX:h,mouseY:v,matrix:(0,a.h9)((0,a.ee)(n/2,0),(0,a.Wi)(N/100),(0,a.ee)(-n/2/N/100,0),(0,a.ee)(-(y?a.ci:a.Jn)*C,0)),circluarCamera:{angleOffset:0,scrollOffsetZoomed:0,scrollOffsetZooming:0,value:{zoom:0,angle:0,radius:0},target:{zoom:1,angle:1,radius:1}}},sequence:p.slice(0,g),annotationLevels:k,renderStateRef:{hoveringFeature:void 0,clickedFeatures:[]},isProtein:y,searchResults:R})}},q=(0,a.Ds)(W),V=function(e){return{zoom:1,angle:Math.min(e,50)/50,radius:Math.max(0,e-50)/50}},j=r.useRef(W);return j.current=W,r.useEffect((function(){M&&F.current&&!I.current&&j.current(V(N))}),[M,N]),r.createElement("div",{style:{width:n+"px",height:s+"px"}},r.createElement(o.j,null,r.createElement("canvas",{ref:P})),r.createElement(l.ZP,{value:N,onChange:function(e,t){var n=t;O(n),q(V(n))},min:1}))}},3438:function(e,t,n){n.r(t),n.d(t,{contentTitle:function(){return s},default:function(){return v},frontMatter:function(){return u},metadata:function(){return f},toc:function(){return h}});var r=n(801),o=n(3108),i=(n(8851),n(2669)),a=n(2104),c=n(3048),l=["components"],u={sidebar_position:5},s="Oligos",f={unversionedId:"examples/linear/oligos",id:"examples/linear/oligos",title:"Oligos",description:"Oligo",source:"@site/docs/examples/linear/oligos.mdx",sourceDirName:"examples/linear",slug:"/examples/linear/oligos",permalink:"/sequence-viewer/docs/examples/linear/oligos",editUrl:"https://github.com/facebook/docusaurus/edit/master/website/docs/examples/linear/oligos.mdx",tags:[],version:"current",sidebarPosition:5,frontMatter:{sidebar_position:5},sidebar:"exampleSidebar",previous:{title:"Enzymes",permalink:"/sequence-viewer/docs/examples/linear/enzymes"}},h=[{value:"Oligo",id:"oligo",children:[],level:2}],d={toc:h};function v(e){var t=e.components,n=(0,o.Z)(e,l);return(0,i.kt)("wrapper",(0,r.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"oligos"},"Oligos"),(0,i.kt)("h2",{id:"oligo"},"Oligo"),(0,i.kt)(a.G,{w:640,h:480,len:50,mid:8,startZoom:100,circularSelection:[{state:"selected",start:7,end:7,antiClockwise:void 0}],annotationLevels:[[{id:"eb5e3fd6-f487-4852-8d39-973954c036f8",type:"DNA_OLIGO",fivePExtension:"ATTAGCGA",label:"FakEI",color:"#25c2a0",locations:[(0,c.bc)(4,10)],hidden:!1,displayAsSequence:!1,rightTag:"",displayLabel:"",direction:c.fn.FORWARD}]],mdxType:"StaticLinear"}),(0,i.kt)(a.G,{w:640,h:480,len:50,mid:8,startZoom:100,circularSelection:[{state:"selected",start:7,end:7,antiClockwise:void 0}],annotationLevels:[[{id:"eb5e3fd6-f487-4852-8d39-973954c036f8",type:"DNA_OLIGO",fivePExtension:"ATTAGCGA",label:"FakEI",color:"#25c2a0",locations:[(0,c.bc)(4,10)],hidden:!1,displayAsSequence:!1,rightTag:"",displayLabel:"",direction:c.fn.REVERSE}]],mdxType:"StaticLinear"}))}v.isMDXComponent=!0}}]);