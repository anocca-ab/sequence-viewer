"use strict";(self.webpackChunk_anocca_sequence_viewer_website=self.webpackChunk_anocca_sequence_viewer_website||[]).push([[8785],{7019:function(e,t,n){n.d(t,{kC:function(){return i},$P:function(){return u},bc:function(){return v},QO:function(){return T}});var r=n(8927),o=function(){return o=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e},o.apply(this,arguments)},i=function(e){var t=e.children,n=e.style,i=e.alignItems,a=e.justifyContent;return(0,r.jsx)("div",o({style:o({display:"flex",alignItems:i,justifyContent:a},n)},{children:t}),void 0)},a=n(8851),c=n(3048),l=function(e,t){var n="function"==typeof Symbol&&e[Symbol.iterator];if(!n)return e;var r,o,i=n.call(e),a=[];try{for(;(void 0===t||t-- >0)&&!(r=i.next()).done;)a.push(r.value)}catch(c){o={error:c}}finally{try{r&&!r.done&&(n=i.return)&&n.call(i)}finally{if(o)throw o.error}}return a},u=function(){var e=l(a.useState(null),2),t=e[0],n=e[1],r=a.useCallback((function(e){e&&n(e)}),[]);return(0,c.bc)(t,r)},s=function(e,t,n,r,o,i,c){var l=a.useRef({onClick:t,onEndDrag:r,onMouseMove:i,onScroll:o,onStartDrag:n,onDblClick:c});l.current={onClick:t,onEndDrag:r,onMouseMove:i,onScroll:o,onStartDrag:n,onDblClick:c},a.useEffect((function(){var t=function(e){l.current.onEndDrag(e)};if(e){var n=function(e){l.current.onClick(e)},r=function(e){e.stopPropagation(),function(e){l.current.onStartDrag(e)}(e)},o=function(e){e.stopPropagation(),t(e)},i=function(e){t(e)},a=function(e){l.current.onScroll(e),e.preventDefault(),e.stopPropagation()},c=function(e){l.current.onMouseMove(e)},u=function(e){l.current.onDblClick(e)},s={passive:!0};return e.addEventListener("click",n,s),e.addEventListener("mousedown",r),window.addEventListener("mouseup",o),e.addEventListener("mouseup",o),window.addEventListener("mouseleave",i,s),e.addEventListener("mouseleave",i,s),e.addEventListener("wheel",a),e.addEventListener("mousemove",c,s),e.addEventListener("dblclick",u,s),function(){e.removeEventListener("click",n),e.removeEventListener("mousedown",r),window.removeEventListener("mouseup",o),e.removeEventListener("mouseup",o),window.removeEventListener("mouseleave",i),e.removeEventListener("mouseleave",i),e.removeEventListener("wheel",a),e.removeEventListener("mousemove",c),e.removeEventListener("dblclick",u)}}}),[e])},f=function(){return f=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e},f.apply(this,arguments)},h=function(e,t){var n="function"==typeof Symbol&&e[Symbol.iterator];if(!n)return e;var r,o,i=n.call(e),a=[];try{for(;(void 0===t||t-- >0)&&!(r=i.next()).done;)a.push(r.value)}catch(c){o={error:c}}finally{try{r&&!r.done&&(n=i.return)&&n.call(i)}finally{if(o)throw o.error}}return a},d=function(e,t){for(var n=0,r=t.length,o=e.length;n<r;n++,o++)e[o]=t[n];return e},v=function(e){var t=e.isProtein,n=e.clickedAnnotation,o=e.renderData,i=e.circularSelection,l=e.setCircularSelection,v=e.getCaretPosition,m=e.updateScroll,T=e.resetAngularScroll,p=e.zoomToSearchResult,y=e.draw,g=e.ref,C=e.width,b=e.height,A=e.sequence,S=e.allAnnotations,k=e.codons,G=e.Search,w=e.openAnnotationDialog,E=A.length,x=h(a.useState([]),2),R=x[0],L=x[1],P=h((0,a.useState)(null),2),M=P[0],D=P[1],N=h(u(),2),F=N[0],I=N[1],O=a.useMemo((function(){var e=new Set;return S.forEach((function(t){t.locations.forEach((function(n){i.forEach((function(r){(0,c.a$)([n[0]-1,n[1]-1],r)&&e.add(t.id)}))}))})),d([],h(e))}),[S,i]),W=a.useMemo((function(){return S.filter((function(e){return!e.hidden}))}),[S]),q=a.useMemo((function(){return(0,c.Oq)(W,E)}),[W,E]),B=h(a.useState(),2),j=B[0],V=B[1],Y=h(a.useState(void 0),2),X=Y[0],U=Y[1];a.useEffect((function(){M&&U((0,c.Dc)(M).ratio)}),[M]);var _=void 0!==X&&M&&o.current?{context:M,ratio:X,data:o.current}:void 0,K=a.useRef(!1),Z=function(){if(_){K.current=!0;var e=y({codons:k,annotationLevels:q,c:_.context,w:C,h:b,ratio:_.ratio,data:_.data,sequence:A,circularSelection:i,searchResults:R,renderStateRef:{hoveringFeature:j,clickedFeatures:O},isProtein:t}).hoveringFeature;V(e)}},H=function(e,t){if(e){var n=W.filter((function(t){return t.id===e})).flatMap((function(e){var t=e.direction===c.fn.REVERSE;return e.locations.map((function(e){var n={start:e[t?1:0]-1,end:e[t?0:1]-1};return f({state:"selected",antiClockwise:t},n)}))}));o.current&&T&&T(),l(e,t?d(d([],h(i)),h(n)):n)}};g&&("current"in g?g.current={onClickAnnotation:H}:g({onClickAnnotation:H}));var J=a.useRef(void 0),Q=(0,c.Ds)((function(e){e.preventDefault(),m(e.deltaX,e.deltaY,e.offsetX,e.offsetY,e.shiftKey),Z()})),z=!!i.find((function(e){return"selecting"===e.state})),$=function(e){if(!z)if(j)J.current=j;else if(J.current=void 0,o.current){var t=v(),n=d([],h(i));e.shiftKey||n.splice(0,n.length);var r=(0,c.IW)(t,n);r?(r.state="selecting",r.start===r.end&&n.splice(n.indexOf(r),1)):n.push({state:"selecting",start:t,end:t,antiClockwise:void 0}),l(void 0,n),T&&T(),Z()}},ee=function(e){if(j&&j===J.current)return H(j,e.shiftKey),void(J.current=void 0);J.current=void 0,z&&l(void 0,i.map((function(e){return f(f({},e),{state:"selected"})}))),Z()},te=a.useRef(!1);te.current=!1;var ne=(0,c.Ds)((function(e){if(!j&&J.current&&(J.current=void 0),1===e.buttons&&!z&&void 0===J.current&&!1===te.current)return te.current=!0,void $(e);if(0===e.buttons&&z&&void 0===J.current&&!1===te.current)return te.current=!0,void ee(e);var t=o.current;if(t){t.mouseX=e.offsetX,t.mouseY=e.offsetY;var n=v();if(1===e.buttons){var r=d([],h(i)),a=r.find((function(e){return"selecting"===e.state}));if(a){void 0===a.antiClockwise?a.start!==n&&(a.antiClockwise=n<a.start):a.start===n&&(a.antiClockwise=void 0),void 0!==a.antiClockwise&&(0,c.Ax)(E,a.antiClockwise,a.start,n)-(0,c.Ax)(E,a.antiClockwise,a.start,a.end)>.5&&(a.antiClockwise=!a.antiClockwise),a.end=n;var u=r.filter((function(e){return e!==a&&((0,c.cd)(e.start,a)||(0,c.cd)(e.end,a))}));u.length>0&&u.forEach((function(e){r.splice(r.indexOf(e),1)})),l(void 0,r)}}Z()}}));s(F,(function(){}),$,ee,Q,ne,(function(e){n&&w&&w(n)}));var re=a.useRef(Z);re.current=Z,(0,a.useEffect)((function(){F&&((0,c.IS)(F,C,b),D(F.getContext("2d")))}),[F,b,D,C]),(0,a.useEffect)((function(){_&&!K.current&&re.current()}),[_]),a.useEffect((function(){re.current()}),[i,S,C,b,t,n,A,k,R]),a.useLayoutEffect((function(){re.current()}),[i,S,C,b,t,n,A,k,R]);var oe=(0,r.jsx)("canvas",{ref:I},void 0),ie=function(e,t){p(e,t),l(void 0,[{state:"selected",start:e.complement?e.end-1:e.start,end:e.complement?e.start:e.end-1,antiClockwise:e.complement}]),re.current()},ae=G&&(0,r.jsx)(G,{isProtein:t,sequence:A,zoomOnResult:function(e){ie(e,!0)},onSearchResults:function(e){L(e)},spinOnResult:function(e){ie(e,!1)}},void 0);return{canvas:oe,selectedAnnotations:O,circularSelection:i,clickedAnnotation:n,search:ae,canvasRef:I,zoomToSearchResult:p,setSearchResults:L,render:Z}},m=function(e,t,n){var r=(e-96)/(t*(n?c.ci:c.Jn));return(0,c.h9)((0,c.ee)(48,0),(0,c.Wi)(r))},T=function(e,t,n){var r=a.useRef(null);return!r.current&&e&&(r.current={mouseX:0,mouseY:0,matrix:m(e,t.length,n),circluarCamera:{angleOffset:0,scrollOffsetZoomed:0,scrollOffsetZooming:0,value:{zoom:0,angle:0,radius:0},target:{zoom:1,angle:1,radius:1}}}),r}},442:function(e,t,n){n.d(t,{Ih:function(){return u},H:function(){return o},DC:function(){return i}});var r=n(3048),o=function(e){var t=e.a,n=e.b,r=e.c,o=e.d,i=e.e,a=e.f;return{a:-o/(r*n-t*o),b:n/(r*n-t*o),c:r/(r*n-t*o),d:-t/(r*n-t*o),e:(i*o-r*a)/(r*n-t*o),f:-(i*n-t*a)/(r*n-t*o)}},i=function(e,t,n){return{x:n.a*e+n.c*t+n.e,y:n.b*e+n.d*t+n.f}},a=function(e,t){var n="function"==typeof Symbol&&e[Symbol.iterator];if(!n)return e;var r,o,i=n.call(e),a=[];try{for(;(void 0===t||t-- >0)&&!(r=i.next()).done;)a.push(r.value)}catch(c){o={error:c}}finally{try{r&&!r.done&&(n=i.return)&&n.call(i)}finally{if(o)throw o.error}}return a},c=function(e,t){for(var n=0,r=t.length,o=e.length;n<r;n++,o++)e[o]=t[n];return e},l=64,u=function(e){var t=e.c,n=e.w,u=e.h,s=e.ratio,f=e.sequence,h=e.annotationLevels,d=e.data,v=e.renderStateRef,m=e.searchResults,T=e.isProtein,p=e.circularSelection,y=e.codons,g=f.length,C=g-1,b=T?r.ci:r.Jn;t.save(),t.resetTransform(),t.scale(s,s),t.clearRect(0,0,n,u),t.fillStyle="white",t.fillRect(0,0,n,u);var A=d.matrix,S=o(d.matrix),k=Math.max(Math.min(Math.floor(i(0,0,S).x/b),C),0),G=Math.max(Math.min(Math.floor(i(n,0,S).x/b),g),1),w=(i(n/2,0,S).x,i(0,0,S).x),E=i(n,0,S).x,x=i(d.mouseX,d.mouseY,S),R=x.x,L=x.y;t.save();var P=function(e){return e*A.a+A.e},M=function(e){return e+A.f},D=function(e,n,r,o,i){var a=t.measureText(e).width,c=n;"center"===i?c-=a/2/A.a:"end"===i&&(c-=a/A.a);var l=r;t.textBaseline="center"===o?"middle":"start"===o?"hanging":"bottom",t.fillText(e,P(c),M(l))},N=function(e){return e*b+0},F=0,I=24;if(T){for(var O=(0,r.bc)(4,48,200),W=(0,r.bc)(24,80,200),q=0;q<2;q+=1)W[F]*A.a<=W[F]-O[F]&&(F+=1);I=W[F]*A.a,2===F&&I<20&&(F+=1),3===F&&(I=Math.max(6,I))}else(I=24*A.a)<=6&&(F=3),3===F&&(I=6);var B=function(e){var n=e.base,o=e.i,i=e.top,a=e.align,c=void 0===a?"start":a,l=N(o),u=function(e,t){return e?r.J$[t].color:r.SD[t]}(T,n);if(t.fillStyle=u,t.textBaseline="bottom",3===F)t.lineWidth=1,t.strokeStyle="rgba(0, 0, 0, "+Math.min(1,Math.max(b*A.a-2,0))+")",t.fillRect(P(l),M(i),b*A.a,I),t.strokeRect(P(l),M(i),b*A.a,I);else{var s=function(e,t,n){return t?0===e?r.J$[n].name:1===e?r.J$[n].threeLettersName:n:n}(F,T,n);t.font=(0,r.qT)(I,"bold"),D(s,l+b/2,i,c,"center")}},j=[],V=l+4*I+16;h.forEach((function(e,n){var o=V+24*n+3+3;T&&(o=l+I+3+3+24*n+16+16),e.forEach((function(e,n){var i="normal",u=e.displayAsSequence&&F<3,s=u?I:20;if(e.locations.length>1){var h=Math.min.apply(Math,c([],a(e.locations.map((function(e){return e[0]}))))),d=Math.max.apply(Math,c([],a(e.locations.map((function(e){return e[1]})))));if((0,r.Wk)({start:e.locations[0][0],end:e.locations[e.locations.length-1][1],antiClockwise:e.direction===r.fn.REVERSE,state:"selected"})){t.lineWidth=1,t.strokeStyle="black";var m=function(e,n){t.lineTo(P(e+-15/A.a+2*n/A.a),M(o+s/2+2*(n%2==0?-1:1)))},T=function(e,n){var r="forward"===n?0:7;if(t.moveTo(P(e+-15/A.a+2*r/A.a),M(o+s/2+2*(r%2==0?-1:1))),"forward"===n)for(var i=1;i<=7;i+=1)m(e,i);else for(var a=6;a>=0;a-=1)m(e,a)};t.beginPath(),T(0,"forward"),t.lineTo(P(0),M(o+s/2)),t.lineTo(P(h*b),M(o+s/2)),t.stroke(),t.closePath(),t.beginPath(),T(g*b+17,"reverse"),t.lineTo(P(g*b),M(o+s/2)),t.lineTo(P(d*b),M(o+s/2)),t.stroke(),t.closePath()}else t.beginPath(),t.moveTo(P(h*b),M(o+s/2)),t.lineTo(P(d*b),M(o+s/2)),t.lineWidth=1,t.strokeStyle="black",t.stroke(),t.closePath()}e.locations.forEach((function(n){var c=[{loc:n}];(0,r.d1)(n,e.direction)&&(c=[{loc:(0,r.bc)(n[0],g),type:e.direction===r.fn.FORWARD?"tail":"head"},{loc:(0,r.bc)(1,n[1]),type:e.direction===r.fn.REVERSE?"tail":"head"}]),c.forEach((function(n){var c=n.loc,h=n.type,d=(c[0]-1)*b+0,m=(Math.abs(c[1]-c[0])+1)*b,T=d,p=d+m,y=o,C=o+s;R>=d&&R<=d+m&&L>=o&&L<=o+s?(v.hoveringFeature=e.id,i="hovering"):v.hoveringFeature===e.id&&(v.hoveringFeature=void 0),v.clickedFeatures.includes(e.id)&&(i="clicked");var S=8/A.a>=m?0:8/A.a,k=function(e){for(var n=1;n<=6;n+=1)t.lineTo(P(("right"===e?p:T)+("right"===e?-1:1)*(n%2==1?4/A.a:0)),M(C-n*s/6))},G=function(e,n){t.strokeStyle="rgba(100, 100, 100, 1)";var r="left"===e?T:p,o="left"===n?-1:1;e+n==="leftright"?r-=36/A.a:e+n==="rightleft"&&(r+=36/A.a),t.lineWidth=1,t.beginPath(),t.moveTo(P(r+o*(8/A.a)),M(y+1*s/4)),t.lineTo(P(r+o*(8/A.a)),M(C-1*s/4)),t.stroke(),t.closePath(),t.beginPath(),t.moveTo(P(r+o*(8/A.a)),M(C-1*s/4)),t.lineTo(P(r+o*(24/A.a)),M(C-1*s/4)),t.lineWidth=1,t.stroke(),t.closePath(),t.beginPath(),t.moveTo(P(r+o*(24/A.a)),M(C-1*s/4)),t.lineTo(P(r+o*(24/A.a)),M(C-1*s/4+1*s/6)),t.stroke(),t.closePath(),t.beginPath(),t.moveTo(P(r+o*(24/A.a)),M(C-1*s/4+1*s/6)),t.lineTo(P(r+o*(32/A.a)),M(C-s/2)),t.lineTo(P(r+o*(24/A.a)),M(y+1*s/4-1*s/6)),t.lineWidth=1,t.stroke(),t.closePath(),t.beginPath(),t.moveTo(P(r+o*(24/A.a)),M(y+1*s/4-1*s/6)),t.lineTo(P(r+o*(24/A.a)),M(y+1*s/4)),t.stroke(),t.closePath(),t.beginPath(),t.moveTo(P(r+o*(24/A.a)),M(y+1*s/4)),t.lineTo(P(r+o*(8/A.a)),M(y+1*s/4)),t.lineWidth=1,t.stroke(),t.closePath()};if("tail"===h?e.direction===r.fn.REVERSE?(G("left","left"),t.beginPath(),t.moveTo(P(p),M(y)),t.lineTo(P(p),M(C)),t.lineTo(P(T),M(C)),k("left"),t.closePath()):(G("right","right"),t.beginPath(),t.moveTo(P(T),M(y)),t.lineTo(P(T),M(C)),t.lineTo(P(p),M(C)),k("right"),t.lineTo(P(p),M(y)),t.closePath()):"head"===h?e.direction===r.fn.FORWARD?(G("left","right"),t.beginPath(),t.moveTo(P(T),M(y)),t.lineTo(P(p-S),M(y)),t.lineTo(P(p),M(y+s/2)),t.lineTo(P(p-S),M(C)),t.lineTo(P(T),M(C)),k("left"),t.closePath()):e.direction===r.fn.REVERSE&&(G("right","left"),t.beginPath(),t.moveTo(P(T+S),M(y)),t.lineTo(P(T),M(y+s/2)),t.lineTo(P(T+S),M(C)),t.lineTo(P(p),M(C)),k("right"),t.closePath()):void 0===e.direction||e.direction===r.fn.NOT_DEFINED?(t.beginPath(),t.moveTo(P(T),M(y)),t.lineTo(P(T),M(C)),t.lineTo(P(p),M(C)),t.lineTo(P(p),M(y)),t.closePath()):e.direction===r.fn.FORWARD?(t.beginPath(),t.moveTo(P(T),M(y)),t.lineTo(P(p-S),M(y)),t.lineTo(P(p),M(y+s/2)),t.lineTo(P(p-S),M(C)),t.lineTo(P(T),M(C)),t.closePath()):e.direction===r.fn.REVERSE&&(t.beginPath(),t.moveTo(P(T+S),M(y)),t.lineTo(P(T),M(y+s/2)),t.lineTo(P(T+S),M(C)),t.lineTo(P(p),M(C)),t.lineTo(P(p),M(y)),t.closePath()),u?(t.fillStyle="white",t.fill()):(t.fillStyle=e.color,t.fill()),t.lineWidth=1,t.strokeStyle="rgba(100, 100, 100, 1)",t.stroke(),t.save(),t.clip(),"hovering"!==i&&"clicked"!==i||(t.strokeStyle="black",t.stroke()),u)for(var x=c[0]-1;x<c[1];x+=1)B({base:f[x],i:x,top:o});else{var N=String(e.displayLabel||e.label);t.font=(0,r.qT)(12,"bold");var F=function(e){return t.measureText(e).width}(N),O=(0,r.uu)(e.color);t.fillStyle=O,F/A.a>m-4/A.a?D(N,d+2,o+s/2,"center","start"):D(N,Math.min(Math.max(d+m/2,w+8/A.a+F/A.a/2),E-8/A.a-F/A.a/2),o+s/2,"center","center")}t.restore();var W=e.rightTag;if(W&&(t.fillStyle="black",D(String(W),d+m+4/A.a,o+s/2,"center","start")),(0,r.UG)(e,c,g,(function(e,t){B({base:t,i:e,top:o+(s-I)/2,align:"start"})})),"DNA_RE_NUC"===e.type){var q=e.direction===r.fn.REVERSE,V=c[0],Y=c[1],X=V-1,U=Y,_=e.cleavageSites,K=_[0],Z=_[_.length-1],H=K[1],J=Z[1];1===_.length&&(H=K[0],J=K[1]);var Q=q?U-H:X+H,z=q?U-J:X+J,$=q?[z,Q]:[Q,z];j.push($);for(var ee=$[0];ee<$[1];ee+=1){var te=ee;te<0&&(te=g+ee),B({base:(0,r.Rj)(f[te]),i:te,top:l+2*I+3})}_.forEach((function(e){var n=a(e,2),r=n[0],o=n[1],c=q?U-o:X+r,u=a([c*b,l+1*I],2),s=u[0],f=u[1],h=a([c*b,l+2*I],2),d=h[0],v=h[1];t.strokeStyle="hovering"===i||"clicked"===i?"red":"black",t.lineWidth=3,t.beginPath(),t.lineTo(P(s),M(f)),t.lineTo(P(d),M(v));var m=q?U-r:X+o;t.lineTo(P(m*b),M(l+2*I));var T=a([m*b,l+3*I],2),p=T[0],y=T[1];t.strokeStyle="hovering"===i||"clicked"===i?"red":"black",t.lineTo(P(p),M(y)),t.stroke(),t.closePath()}))}}))}))}))}));for(var Y=function(e){var n=N(e);if(n+b<w||n>E)return"continue";B({base:f[e],i:e,top:l+(T?0:I)});var o=48/(b*A.a),i=Math.floor(C/o),a=Math.max(Math.floor(C/i),1),c=function(){t.fillStyle="black",t.font=(0,r.qT)(12,"normal"),D(String(e+1),n+b/2,l-A.f,"end","center")};(0===e||e===C||e%a==0&&e>.7*a&&e<g-.7*a)&&c()},X=k;X<Math.min(G+1,f.length);X+=1)Y(X);t.restore(),m.length>0&&m.forEach((function(e){var n=e.start,o=e.end,i=n*b,a=o*b,c=l;if(T||(c+=I),e.complement&&!T){c+=I+3;for(var u=n;u<o;u+=1)B({base:(0,r.Rj)(f[u]),i:u,top:c})}var s=Math.min(Math.max(1-A.a,.4),.8);t.fillStyle="rgba(255,151,0, "+s+")",e.active&&(t.fillStyle="rgba(0, 0, 255, "+s+")"),t.beginPath(),t.moveTo(P(i),M(c)),t.lineTo(P(a),M(c)),t.lineTo(P(a),M(c+I)),t.lineTo(P(i),M(c+I)),t.closePath(),t.fill()}));var U=Math.max(Math.min(I/3,8),4),_=l+I*(T?1:2)+3;p.forEach((function(e){var n=e.start,o=e.end+1;!0===e.antiClockwise&&(n=e.end,o=e.start+1);var i=n*b,a=o*b;!1===e.antiClockwise&&(a-=U/A.a),!0===e.antiClockwise&&(i+=U/A.a);var c=_;!0!==e.antiClockwise||T||(c+=I),t.beginPath(),t.moveTo(P(i),M(c)),t.lineTo(P(a),M(c)),t.lineWidth=3,t.strokeStyle="black",t.fillStyle="black",t.stroke(),t.closePath(),t.beginPath(),!0===e.antiClockwise&&(t.moveTo(P(i),M(c-U)),t.lineTo(P(i-U/A.a),M(c)),t.lineTo(P(i),M(c+U))),!1===e.antiClockwise&&(t.moveTo(P(a),M(c-U)),t.lineTo(P(a+U/A.a),M(c)),t.lineTo(P(a),M(c+U))),t.closePath(),t.fill();var u=function(e,n,o){var i=y[e]||"X",a=(0,r.su)(i);t.fillStyle=a,t.strokeStyle="rgba(0, 0, 0, "+Math.min(1,Math.max(b*A.a-2,0))+")",t.beginPath(),t.lineWidth=1,t.rect(P(n*b),M(_+o),3*b*A.a,I),t.fill(),t.stroke(),t.closePath(),t.font=(0,r.qT)(I,"bold"),t.fillStyle=(0,r.nU)(i)?"#c8d9fa":"#282c34",t.textBaseline="top",F<=2&&D(i,(n+1.5)*b,_+o,"start","center")},s="";if(!T)if(!0===e.antiClockwise)for(var h=e.start;h>=e.end;h-=1){var d=(0,r.Rj)(f[h]);B({base:d,i:h,top:_}),3===(s+=d).length&&(u(s,h,I),s="")}else if(!1===e.antiClockwise)for(var v=e.start;v<=e.end;v+=1)3===(s+=f[v]).length&&(u(s,v-2,-2*I-3),s="");var m=e.end,p=e.start,C=e.antiClockwise,S=(0,r.GQ)(e);t.font=(0,r.qT)(16,"bold"),t.fillStyle="black",t.textBaseline="top";var k=(0,r.R7)(p,m,g,C),G=2*I;C&&(G=4*I),T&&(G=I),D(S,k*b+b/2,l+G+3+3,"start","center")}));var K=Math.min(Math.max(R,0),g*b),Z=Math.max(Math.min(Math.floor(K/b),C),0),H=(0,r.IW)(Z,p),J=!1;H&&!0===H.antiClockwise&&(J=!0);var Q=70,z=Q+I+(J?I:0),$=Q+2*I+(J?I:0),ee=Q+2*I+(J?((0,r.Lc)(g,!0,H.start,H.end)>=3?2:1)*I:0);return T&&(z=Q+I,$=Q+I+16,ee=Q+I+16),t.beginPath(),t.moveTo(P(K),M(z)),t.lineTo(P(K),M($)),t.lineWidth=3,t.strokeStyle="rgba(0, 0, 0, 0.5)",t.stroke(),t.closePath(),t.font=(0,r.qT)(16,"bold"),t.fillStyle="black",D(String(Z+1),K,ee,"start","center"),t.restore(),v}},3048:function(e,t,n){var r;n.d(t,{fn:function(){return r},J$:function(){return a},d1:function(){return O},uF:function(){return F},Wi:function(){return H},ee:function(){return Z},Ds:function(){return k},Jn:function(){return c},SD:function(){return o},su:function(){return y},qT:function(){return R},R7:function(){return U},B6:function(){return p},Rj:function(){return G},Dc:function(){return L},zO:function(){return w},Lc:function(){return Y},Ax:function(){return X},GQ:function(){return _},IW:function(){return V},uu:function(){return N},Mu:function(){return u},cd:function(){return j},a$:function(){return B},Wk:function(){return q},h9:function(){return Q},UG:function(){return $},Oq:function(){return S},ci:function(){return l},XA:function(){return z},IS:function(){return P},$X:function(){return E},nU:function(){return m},bc:function(){return v}}),function(e){e.FORWARD="FORWARD",e.NOT_DEFINED="NOT_DEFINED",e.REVERSE="REVERSE"}(r||(r={}));var o={A:"#C20000",T:"#00B700",C:"#1000BA",G:"#FDE700",R:"black",Y:"black",W:"black",S:"black",M:"black",K:"black",H:"black",B:"black",V:"black",D:"black",N:"black"},i={R:"Y",Y:"R",W:"W",S:"S",M:"K",K:"M",H:"D",B:"V",V:"B",D:"H",N:"N",A:"T",T:"A",G:"C",C:"G"},a={A:{value:"A",name:"Alanine",threeLettersName:"Ala",hydrophobicity:1.8,color:"#A7A7A7"},R:{value:"R",name:"Arginine",threeLettersName:"Arg",hydrophobicity:-4.5,color:"#145AFF"},N:{value:"N",name:"Asparagine",threeLettersName:"Asn",hydrophobicity:-3.5,color:"#00DCDC"},D:{value:"D",name:"Aspartic acid",threeLettersName:"Asp",hydrophobicity:-3.5,color:"#E60A0A"},C:{value:"C",name:"Cysteine",threeLettersName:"Cys",hydrophobicity:2.5,color:"#E6E600"},E:{value:"E",name:"Glutamic acid",threeLettersName:"Glu",hydrophobicity:-3.5,color:"#E60A0A"},Q:{value:"Q",name:"Glutamine",threeLettersName:"Gln",hydrophobicity:-3.5,color:"#00DCDC"},G:{value:"G",name:"Glycine",threeLettersName:"Gly",hydrophobicity:-.4,color:"#A7A7A7"},H:{value:"H",name:"Histidine",threeLettersName:"His",hydrophobicity:-3.2,color:"#8282D2"},I:{value:"I",name:"Isoleucine ",threeLettersName:"Ile",hydrophobicity:4.5,color:"#0F820F"},L:{value:"L",name:"Leucine",threeLettersName:"Leu",hydrophobicity:3.8,color:"#0F820F"},K:{value:"K",name:"Lysine",threeLettersName:"Lys",hydrophobicity:-3.9,color:"#145AFF"},M:{value:"M",name:"Methionine",threeLettersName:"Met",hydrophobicity:1.9,color:"#E6E600"},F:{value:"F",name:"Phenylalanine",threeLettersName:"Phe",hydrophobicity:2.8,color:"#3232AA",doInvert:!0},P:{value:"P",name:"Proline",threeLettersName:"Pro",hydrophobicity:-1.6,color:"#DC9682"},S:{value:"S",name:"Serine",threeLettersName:"Ser",hydrophobicity:-.8,color:"#FA9600"},T:{value:"T",name:"Threonine",threeLettersName:"Thr",hydrophobicity:-.7,color:"#FA9600"},U:{value:"U",name:"Selenocysteine",threeLettersName:"Sec",color:"#FF0000"},W:{value:"W",name:"Tryptophan",threeLettersName:"Trp",hydrophobicity:-.9,color:"#B45AB4"},Y:{value:"Y",name:"Tyrosine",threeLettersName:"Tyr",hydrophobicity:-1.3,color:"#3232AA",doInvert:!0},V:{value:"V",name:"Valine",threeLettersName:"Val",hydrophobicity:4.2,color:"#0F820F"},"*":{value:"*",name:"Stop",threeLettersName:"Stop",color:"#000000"},".":{value:".",name:"Stop",threeLettersName:"Stop",color:"#000000"},"-":{value:"-",name:"Gap",threeLettersName:"Gap",color:"#ffffff"},B:{value:"B",threeLettersName:"ND",color:"lightpurple",isAmbiguous:!0,name:"B",aliases:"ND"},J:{value:"J",threeLettersName:"IL",color:"lightpurple",isAmbiguous:!0,name:"J",aliases:"IL"},X:{value:"X",threeLettersName:"ACDEFGHIKLMNPQRSTVWY",color:"lightpurple",isAmbiguous:!0,name:"X",aliases:"ACDEFGHIKLMNPQRSTVWY"},Z:{value:"Z",threeLettersName:"QE",color:"lightpurple",isAmbiguous:!0,name:"Z",aliases:"QE"}},c=24,l=150,u={TAG:"*",TAA:"*",TGA:"*",GCG:"A",GCA:"A",GCT:"A",GCC:"A",TGT:"C",TGC:"C",GAT:"D",GAC:"D",GAA:"E",GAG:"E",TTT:"F",TTC:"F",GGT:"G",GGA:"G",GGG:"G",GGC:"G",CAT:"H",CAC:"H",ATA:"I",ATT:"I",ATC:"I",AAA:"K",AAG:"K",CTA:"L",TTA:"L",CTT:"L",TTG:"L",CTC:"L",CTG:"L",ATG:"M",AAT:"N",AAC:"N",CCG:"P",CCA:"P",CCT:"P",CCC:"P",CAA:"Q",CAG:"Q",CGT:"R",CGA:"R",CGC:"R",AGA:"R",AGG:"R",CGG:"R",TCG:"S",AGT:"S",TCA:"S",TCT:"S",TCC:"S",AGC:"S",ACG:"T",ACT:"T",ACA:"T",ACC:"T",GTA:"V",GTT:"V",GTC:"V",GTG:"V",TGG:"W",TAT:"Y",TAC:"Y"},s=function(){return s=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e},s.apply(this,arguments)},f=function(e,t){var n="function"==typeof Symbol&&e[Symbol.iterator];if(!n)return e;var r,o,i=n.call(e),a=[];try{for(;(void 0===t||t-- >0)&&!(r=i.next()).done;)a.push(r.value)}catch(c){o={error:c}}finally{try{r&&!r.done&&(n=i.return)&&n.call(i)}finally{if(o)throw o.error}}return a},h=function(e,t){for(var n=0,r=t.length,o=e.length;n<r;n++,o++)e[o]=t[n];return e},d=function(e){var t="function"==typeof Symbol&&Symbol.iterator,n=t&&e[t],r=0;if(n)return n.call(e);if(e&&"number"==typeof e.length)return{next:function(){return e&&r>=e.length&&(e=void 0),{value:e&&e[r++],done:!e}}};throw new TypeError(t?"Object is not iterable.":"Symbol.iterator is not defined.")};function v(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];return e}function m(e){return"FYKRDELIV*.".includes(e)}var T,p=function(e){return o[e]},y=function(e){var t;return null===(t=a[e])||void 0===t?void 0:t.color},g=function(e){var t=0;return e.forEach((function(e){t+=e})),t},C=function(e){var t=e.rightTag;return t?2*String(t).length:0},b=function(e){var t=Math.min.apply(Math,h([],f(e.locations.flat()))),n=Math.max.apply(Math,h([],f(e.locations.flat())));return Math.abs(n-t)+C(e)},A=function e(t,n,r,o){var i=Math.min.apply(Math,h([],f(t.locations.map((function(e){return f(e,1)[0]})).flat()))),a=Math.max.apply(Math,h([],f(t.locations.map((function(e){return f(e,2)[1]})).flat()))),c=Math.min.apply(Math,h([],f(n.locations.map((function(e){return f(e,1)[0]})).flat()))),l=Math.max.apply(Math,h([],f(n.locations.map((function(e){return f(e,2)[1]})).flat()))),u=i>a,d=c>l;if(o.value+=1,o.value>20)return!0;if(!u&&!d)return Math.max(i,c)<=Math.min(a+C(t),l+C(n));var m=function(e){return s(s({},e),{locations:[v(Math.min.apply(Math,h([],f(e.locations.map((function(e){return f(e,1)[0]})).flat()))),r)]})},T=function(e){return s(s({},e),{locations:[v(0,Math.max.apply(Math,h([],f(e.locations.map((function(e){return f(e,2)[1]})).flat()))))]})};return u&&!d?e(m(t),n,r,o)||e(T(t),n,r,o):!u&&d?e(m(n),t,r,o)||e(T(n),t,r,o):!(!u||!d)&&(e(m(n),m(t),r,o)||e(T(n),T(t),r,o))},S=function(e,t){for(var n,r=[],o=h([],f(e)).sort((function(e,t){return b(e)-b(t)})),i=function(){var e,n,i=o.pop();if(!i)return"continue-stackLoop";try{for(var a=(e=void 0,d(r)),c=a.next();!c.done;c=a.next()){var l=c.value;if(l.every((function(e){return!A(i,e,t,{value:0})})))return l.push(i),"continue-stackLoop"}}catch(u){e={error:u}}finally{try{c&&!c.done&&(n=a.return)&&n.call(a)}finally{if(e)throw e.error}}r.push([i])};o.length;)i();return r.sort((n=!0,function(e,t){var r=n?1:-1,o=r*(e.length-t.length),i=r*g(e.map(b))-g(t.map(b));return 0===i?0:i<0?-1:i>0?1:0===o?0:o<0?-1:o>0?1:0})).reverse()},k=function(e){return function(){for(var t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];T&&window.cancelAnimationFrame(T),T=window.requestAnimationFrame((function(){e.apply(void 0,h([],f(t)))}))}},G=function(e){if(e.match(/-|\.| /))return e;var t=i[e];if(!t)throw new Error("invalid nucleotide "+e);return t},w=function(e,t){var n=t.split("");return n.reverse(),e?n.join(""):n.map(G).join("")};var E=function(e,t,n){return e?function(e,t){for(var n=0;n<t.length;n+=1)if(e[n]!==t[n])return!1;return!0}(t,n):function(e,t){if(t.length!==e.length)throw new Error("sequence and site must be the same length");for(var n=0;n<t.length;n+=1)if(r=e[n],o=t[n],!(r.match(/-|\.| /)&&o.match(/-|\.| /)||"A"===o&&"A"===r||"C"===o&&"C"===r||"G"===o&&"G"===r)&&("T"!==o&&"U"!==o||"T"!==r&&"U"!==r)&&("R"!==o||"A"!==r&&"G"!==r)&&("Y"!==o||"C"!==r&&"T"!==r&&"U"!==r)&&("S"!==o||"G"!==r&&"C"!==r)&&("W"!==o||"A"!==r&&"T"!==r&&"U"!==r)&&("K"!==o||"G"!==r&&"T"!==r&&"U"!==r)&&("M"!==o||"A"!==r&&"C"!==r)&&("B"!==o||"C"!==r&&"G"!==r&&"T"!==r&&"U"!==r)&&("D"!==o||"A"!==r&&"G"!==r&&"T"!==r&&"U"!==r)&&("H"!==o||"A"!==r&&"C"!==r&&"T"!==r&&"U"!==r)&&("V"!==o||"A"!==r&&"C"!==r&&"G"!==r)&&"N"!==o)return!1;var r,o;return!0}(t,n)},x=function(e,t){var n="function"==typeof Symbol&&e[Symbol.iterator];if(!n)return e;var r,o,i=n.call(e),a=[];try{for(;(void 0===t||t-- >0)&&!(r=i.next()).done;)a.push(r.value)}catch(c){o={error:c}}finally{try{r&&!r.done&&(n=i.return)&&n.call(i)}finally{if(o)throw o.error}}return a};function R(e,t){return void 0===t&&(t="normal"),"normal normal "+t+" "+e+"px sans-serif"}function L(e){var t=window.devicePixelRatio||1,n=e.webkitBackingStorePixelRatio||e.mozBackingStorePixelRatio||e.msBackingStorePixelRatio||e.oBackingStorePixelRatio||e.backingStorePixelRatio||1;return{ratio:t/n,shouldScale:t!==n}}function P(e,t,n){var r=e.getContext("2d");if(r){var o=L(r),i=o.ratio,a=o.shouldScale;return a?(e.width=t*i,e.height=n*i,e.style.width=t+"px",e.style.height=n+"px"):(e.width=t,e.height=n,e.style.width="",e.style.height=""),{ratio:i,shouldScale:a}}}var M=null,D=null,N=function(e){if(!M){var t=document.getElementById("seq-view-offscreen-canvas");t?M=t:((M=document.createElement("canvas")).id="seq-view-offscreen-canvas",M.style.position="absolute",M.style.left="-10px",M.style.width="1px",M.style.height="1px",M.width=2,M.height=2,M.style.visibility="hidden",document.body.appendChild(M))}D||(D=M.getContext("2d",{willReadFrequently:!0}));var n=D;if(n){n.clearRect(0,0,1,1),n.fillStyle=e,n.fillRect(0,0,1,1);var r=x(n.getImageData(0,0,1,1).data,3),o=r[0],i=r[1],a=r[2];return n.clearRect(0,0,1,1),.299*o+.587*i+.114*a>150?"black":"white"}return"black"},F={primaryText:"#000000",primaryBackground:"#ffffff",websiteSecondary:"#00647b",websiteSecondaryLight:"#008dae",websiteSecondaryDark:"#003b48",websiteTertiary:"#0A3D51",websiteTertiaryDark:"#041b24",websiteTertiaryLight:"#105f7e",secondaryText:"#1f497d",secondaryBackground:"#eeece1",accent1:"#139cb2",accent1Light:"#18c4e0",accent1Dark:"#0e7484",accent2:"#eaebe0",accent3:"#fc4711",accent3Light:"#fd6e43",accent3Dark:"#d73403",accent4:"#e20047",accent4Light:"#ff165f",accent4Dark:"#af0037",accent5:"#28a745",accent5Light:"#98d26c",accent5Dark:"#64a533",accent6:"#8af74d",accent6Light:"#aaf97e",accent6Dark:"#6af51c",link:"#0000ff"},I=function(e,t){var n="function"==typeof Symbol&&e[Symbol.iterator];if(!n)return e;var r,o,i=n.call(e),a=[];try{for(;(void 0===t||t-- >0)&&!(r=i.next()).done;)a.push(r.value)}catch(c){o={error:c}}finally{try{r&&!r.done&&(n=i.return)&&n.call(i)}finally{if(o)throw o.error}}return a},O=function(e,t){return t==r.REVERSE?W({start:e[1],end:e[0]},!0):W({start:e[0],end:e[1]},!1)},W=function(e,t){var n=e.start,r=e.end;if(n!==r){if(!0===t)return!(n>r);if(!1===t)return!(r>n)}return!1},q=function(e){return W(e,!!e.antiClockwise)},B=function(e,t){var n=I(e,2),r=n[0],o=n[1],i=t.start,a=t.end,c=t.antiClockwise;if(i===a&&a===r&&a===o)return!0;if(i!==a)if(!0===c){if(i>a){if(r>=a&&r<=i&&o>=a&&o<=i)return!0}else if(r>=a||o<=i)return!0}else if(!1===c)if(a>i){if(r>=i&&r<=a&&o>=i&&o<=a)return!0}else if(r>=i||o<=a)return!0;return!1},j=function(e,t){var n=t.start,r=t.end,o=t.antiClockwise;if(n===r&&r===e)return!0;if(n!==r)if(!0===o){if(n>r){if(e>=r&&e<=n)return!0}else if(e>=r||e<=n)return!0}else if(!1===o)if(r>n){if(e>=n&&e<=r)return!0}else if(e>=n||e<=r)return!0;return!1},V=function(e,t){return t.find((function(t){return j(e,t)}))},Y=function(e,t,n,r){var o=n,i=r;return!0===t&&(o=r,i=n),o>i?e-o+i:i-o+1},X=function(e,t,n,r){return Y(e,t,n,r)/e},U=function(e,t,n,r){var o=(e+t)/2;return t>e&&!1===r?o=(e+t)/2:t<e&&!1===r?o=(e+(n-e+t)/2)%n:t<e&&!0===r?o=(e+t)/2:t>e&&!0===r&&(o=(t+(n-t+e)/2)%n),o},_=function(e){var t=e.end,n=e.start,r=e.antiClockwise;return n===t?String(n+1):r?t+1+" - "+(n+1):n+1+" - "+(t+1)},K=function(){return K=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e},K.apply(this,arguments)},Z=function(e,t){return{a:1,b:0,c:0,d:1,e:e,f:t}},H=function(e){return{a:e,b:0,c:0,d:1,e:0,f:0}},J=function(e,t){var n,r=e.a,o=e.b,i=e.c,a=e.d,c=e.e,l=e.f,u={g:(n=t).a,h:n.b,i:n.c,j:n.d,k:n.e,l:n.f},s=u.g,f=u.h,h=u.i,d=u.j,v=u.k,m=u.l;return{a:r*s+i*f,b:o*s+a*f,c:r*h+i*d,d:o*h+a*d,e:r*v+i*m+c,f:o*v+a*m+l}},Q=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];var n={a:1,b:0,c:0,d:1,e:0,f:0};return e.forEach((function(e){n=J(n,e)})),K({},n)},z=function(e){var t=e.len,n=e.startIndex,r=e.endIndex,o=0,i="sequence"in e?function(t){return e.onRenderBase(t,e.sequence[o++])}:function(t){return e.onRenderBase(t)};if(n>r){for(var a=n;a<t;a+=1)i(a);for(a=0;a<r+1;a+=1)i(a)}else for(a=n;a<r+1;a+=1)i(a)},$=function(e,t,n,o){if("DNA_OLIGO"===e.type){var i=e.fivePExtension;i&&(e.direction===r.REVERSE?z({startIndex:t[1],endIndex:(t[1]+i.length-1)%n,sequence:i.split("").reverse().join(""),len:n,onRenderBase:o}):z({startIndex:(t[0]-1-i.length+n)%n,endIndex:(t[0]-2+n)%n,sequence:i,len:n,onRenderBase:o}))}}},3167:function(e,t,n){n.d(t,{j:function(){return o}});var r=n(8851),o=function(e){var t=e.children;return r.createElement("div",{style:{textAlign:"center"}},r.createElement("div",{style:{boxShadow:"0 0 60px rgba(0, 0, 0, 0.04)",borderRadius:"16px",overflow:"hidden",margin:"0 auto",display:"flex",justifyContent:"center"}},t))}},2104:function(e,t,n){n.d(t,{G:function(){return u}});var r=n(8851),o=n(3167),i=n(442),a=n(3048),c=n(7019),l=n(256),u=function(e){var t=e.w,n=void 0===t?640:t,u=e.h,s=void 0===u?480:u,f=e.mouseX,h=void 0===f?0:f,d=e.mouseY,v=void 0===d?s:d,m=e.sequence,T=void 0===m?"TCCTCGCATAGGGCGGATCGGTATTCATGGGACGCCACACAACTCTTAGATTGATTGTCGCTTTCAGGCGTGTCATCCTGCGCCCCGGCACGAGCTCGTCCGGCGGTATAGTCGTATGTGCTTATACACATCAAAGCTAACAAATCTTTCTGCGGGCGGTCGTCACGACACACGTTCTTACG":m,p=e.len,y=void 0===p?T.length:p,g=e.isProtein,C=e.mid,b=void 0===C?y/2:C,A=e.annotationLevels,S=void 0===A?[]:A,k=e.startZoom,G=void 0===k?55:k,w=e.circularSelection,E=void 0===w?[]:w,x=e.searchResults,R=void 0===x?[]:x,L=(0,c.$P)(),P=L[0],M=L[1],D=r.useState(G),N=D[0],F=D[1],I=r.useRef(void 0);P&&!I.current&&((0,a.IS)(P,n,s),I.current=P.getContext("2d"));var O=r.useRef(!1),W=function(e){var t=I.current;if(t){O.current=!0;var r=(0,a.Dc)(t).ratio;(0,i.Ih)({c:t,w:n,h:s,ratio:r,circularSelection:E,codons:a.Mu,data:{mouseX:h,mouseY:v,matrix:(0,a.h9)((0,a.ee)(n/2,0),(0,a.Wi)(N/100),(0,a.ee)(-n/2/N/100,0),(0,a.ee)(-(g?a.ci:a.Jn)*b,0)),circluarCamera:{angleOffset:0,scrollOffsetZoomed:0,scrollOffsetZooming:0,value:{zoom:0,angle:0,radius:0},target:{zoom:1,angle:1,radius:1}}},sequence:T.slice(0,y),annotationLevels:S,renderStateRef:{hoveringFeature:void 0,clickedFeatures:[]},isProtein:g,searchResults:R})}},q=(0,a.Ds)(W),B=function(e){return{zoom:1,angle:Math.min(e,50)/50,radius:Math.max(0,e-50)/50}},j=r.useRef(W);return j.current=W,r.useEffect((function(){P&&I.current&&!O.current&&j.current(B(N))}),[P,N]),r.createElement("div",{style:{width:n+"px",height:s+"px"}},r.createElement(o.j,null,r.createElement("canvas",{ref:M})),r.createElement(l.ZP,{value:N,onChange:function(e,t){var n=t;F(n),q(B(n))},min:1}))}},2883:function(e,t,n){n.r(t),n.d(t,{contentTitle:function(){return u},default:function(){return d},frontMatter:function(){return l},metadata:function(){return s},toc:function(){return f}});var r=n(801),o=n(3108),i=(n(8851),n(2669)),a=n(2104),c=(n(3048),["components"]),l={sidebar_position:2},u="Selections",s={unversionedId:"examples/linear/selections",id:"examples/linear/selections",title:"Selections",description:"Caret",source:"@site/docs/examples/linear/selections.mdx",sourceDirName:"examples/linear",slug:"/examples/linear/selections",permalink:"/sequence-viewer/docs/examples/linear/selections",editUrl:"https://github.com/facebook/docusaurus/edit/master/website/docs/examples/linear/selections.mdx",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"exampleSidebar",previous:{title:"App",permalink:"/sequence-viewer/docs/examples/linear/app"},next:{title:"Annotations",permalink:"/sequence-viewer/docs/examples/linear/annotations"}},f=[{value:"Caret",id:"caret",children:[],level:2},{value:"Selections",id:"selections-1",children:[],level:2},{value:"Search result",id:"search-result",children:[],level:2}],h={toc:f};function d(e){var t=e.components,n=(0,o.Z)(e,c);return(0,i.kt)("wrapper",(0,r.Z)({},h,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"selections"},"Selections"),(0,i.kt)("h2",{id:"caret"},"Caret"),(0,i.kt)(a.G,{w:640,h:480,len:200,circularSelection:[{state:"selected",start:0,end:0,antiClockwise:void 0}],annotationLevels:[],startZoom:100,mouseX:360,mouseY:0,mdxType:"StaticLinear"}),(0,i.kt)("h2",{id:"selections-1"},"Selections"),(0,i.kt)(a.G,{w:640,h:480,len:20,circularSelection:[{state:"selected",start:0,end:2,antiClockwise:!1},{state:"selected",start:6,end:4,antiClockwise:!0}],annotationLevels:[],startZoom:100,mdxType:"StaticLinear"}),(0,i.kt)("h2",{id:"search-result"},"Search result"),(0,i.kt)(a.G,{w:640,h:480,len:20,circularSelection:[{state:"selected",start:0,end:0,antiClockwise:void 0}],annotationLevels:[],startZoom:100,searchResults:[{start:0,end:3,active:!1,complement:!1},{start:5,end:8,active:!1,complement:!0},{start:13,end:18,active:!0,complement:!1}],mdxType:"StaticLinear"}))}d.isMDXComponent=!0}}]);