import{r as e,X as N,k as A,o as re,B as L,c as R,p as I,m as le,I as ne,e as M,i as ie,g as W,d as q,K as se,F as ae,Y as oe}from"./index-BMJCQ3hz.js";import{u as ue}from"./useEventListener-gMPMx9JI.js";import{g as ce}from"./focusable-qbXKtj5n.js";const de=l=>e.createElement("div",{style:{position:"absolute",inset:-6,display:"grid",pointerEvents:"none"}},e.createElement(me,null),e.createElement(fe,l));let fe=l=>{let{elementRef:t,containerRef:r,onResizeStart:a,onResizeEnd:p}=l,b=e.useRef(!1),i=n=>{if(!t.current||n.button!==0)return;let o=n.clientX,v=n.clientY,[g,C]=N(t.current),{width:h,height:c}=t.current.getBoundingClientRect(),d=`${h}px`,E=`${c}px`,s=g,f=C,D=parseFloat(getComputedStyle(t.current).minWidth);Number.isNaN(D)&&(D=380);let z=parseFloat(getComputedStyle(t.current).minHeight),m=n.currentTarget.dataset.iuiResizer,x=t.current.ownerDocument||document,S=x.body.style.userSelect;x.body.style.userSelect="none";let F=B=>{var O;if(!t.current)return;b.current||(b.current=!0,a==null||a());let y=(O=r==null?void 0:r.current)==null?void 0:O.getBoundingClientRect(),H=A(B.clientX,(y==null?void 0:y.left)??0,(y==null?void 0:y.right)??x.documentElement.clientWidth??0),X=A(B.clientY,(y==null?void 0:y.top)??0,(y==null?void 0:y.bottom)??x.documentElement.clientHeight??0),k=o-H,P=v-X;switch(m){case"top-left":{let w=c+P;w>=z&&(E=t.current.style.height=`${w}px`,f=C-P);let T=h+k;T>=D&&(d=t.current.style.width=`${T}px`,s=g-k),t.current.style.transform=`translate(${s}px, ${f}px)`;break}case"top":{let w=c+P;if(w<z)break;E=t.current.style.height=`${w}px`,f=C-P,t.current.style.transform=`translate(${s}px, ${f}px)`;break}case"top-right":{let w=c+P;w>=z&&(E=t.current.style.height=`${w}px`,f=C-P),d=t.current.style.width=`${h-k}px`,t.current.style.transform=`translate(${s}px, ${f}px)`;break}case"right":d=t.current.style.width=`${h-k}px`,E=t.current.style.height=`${c}px`,t.current.style.transform=`translate(${s}px, ${f}px)`;break;case"bottom-right":d=t.current.style.width=`${h-k}px`,E=t.current.style.height=`${c-P}px`,t.current.style.transform=`translate(${s}px, ${f}px)`;break;case"bottom":E=t.current.style.height=`${c-P}px`,t.current.style.transform=`translate(${s}px, ${f}px)`;break;case"bottom-left":{let w=h+k;w>=D&&(d=t.current.style.width=`${w}px`,s=g-k),E=t.current.style.height=`${c-P}px`,t.current.style.transform=`translate(${s}px, ${f}px)`;break}case"left":{let w=h+k;if(w<D)break;d=t.current.style.width=`${w}px`,E=t.current.style.height=`${c}px`,s=g-k,t.current.style.transform=`translate(${s}px, ${f}px)`;break}}};x.addEventListener("pointermove",F),x.addEventListener("pointerup",()=>{x.removeEventListener("pointermove",F),t.current&&(x.body.style.userSelect=S,b.current=!1,p==null||p({width:d,height:E,transform:`translate(${s}px, ${f}px)`}))},{once:!0})};return e.createElement(e.Fragment,null,e.createElement("div",{"data-iui-resizer":"top-left",onPointerDown:i,style:{cursor:"nw-resize"}}),e.createElement("div",{"data-iui-resizer":"top",onPointerDown:i,style:{cursor:"n-resize"}}),e.createElement("div",{"data-iui-resizer":"top-right",onPointerDown:i,style:{cursor:"ne-resize"}}),e.createElement("div",{"data-iui-resizer":"right",onPointerDown:i,style:{cursor:"e-resize"}}),e.createElement("div",{"data-iui-resizer":"bottom-right",onPointerDown:i,style:{cursor:"se-resize"}}),e.createElement("div",{"data-iui-resizer":"bottom",onPointerDown:i,style:{cursor:"s-resize"}}),e.createElement("div",{"data-iui-resizer":"bottom-left",onPointerDown:i,style:{cursor:"sw-resize"}}),e.createElement("div",{"data-iui-resizer":"left",onPointerDown:i,style:{cursor:"w-resize"}}))},me=e.memo(()=>e.createElement("style",null,pe)),pe=`
[data-iui-resizer] {
  pointer-events: auto;
  grid-area: 1 / 1 / -1 / -1;
  width: 12px;
  height: 12px;
  z-index: 1;
}
[data-iui-resizer='top'],
[data-iui-resizer='bottom'] {
  height: 8px;
  width: auto;
  z-index: 0;
}
[data-iui-resizer='left'],
[data-iui-resizer='right'] {
  height: auto;
  width: 8px;
  z-index: 0;
}
[data-iui-resizer^='top'] {
  align-self: start;
}
[data-iui-resizer^='bottom'] {
  align-self: end;
}
[data-iui-resizer$='left'] {
  justify-self: start;
}
[data-iui-resizer$='right'] {
  justify-self: end;
}`;const ge=l=>{let{children:t}=l,r=e.useRef(null),a=e.useCallback(()=>{var g;let i=(g=r.current)==null?void 0:g.nextElementSibling,n=ce(i),o=n[0],v=n[(n.length||1)-1];return[o,v]},[]),p=e.useCallback(i=>{let[n,o]=a();i.relatedTarget===n?o==null||o.focus():n==null||n.focus()},[a]),b=e.useCallback(i=>{let[n,o]=a();i.relatedTarget===o?n==null||n.focus():o==null||o.focus()},[a]);return e.createElement(e.Fragment,null,e.createElement("div",{ref:r,tabIndex:0,onFocus:p,"aria-hidden":!0}),t,e.createElement("div",{tabIndex:0,onFocus:b,"aria-hidden":!0}))},be=l=>e.createElement(re,l,e.createElement("path",{d:"m14 0-6 6-6-6-2 2 6 6-6 6 2 2 6-6 6 6 2-2-6-6 6-6"})),he=e.forwardRef((l,t)=>{let{isVisible:r=!0,className:a,...p}=l;return e.createElement(L,{className:R("iui-backdrop",{"iui-backdrop-visible":r},a),ref:t,...p})}),Q=e.createContext(void 0),j=()=>e.useContext(Q)||{},Z=e.createContext(null),_=()=>e.useContext(Z),G=I.div("iui-dialog-title"),ee=e.createContext(void 0),xe=()=>({...e.useContext(ee)}),ye=Object.assign(e.forwardRef((l,t)=>{let r=j(),a=_(),{children:p,titleText:b,isDismissible:i=r.isDismissible,onClose:n=r.onClose,isDraggable:o=r.isDraggable,className:v,onPointerDown:g,...C}=l,{onPointerDown:h}=xe(),c=e.useCallback(d=>{a==null||a.beforeClose(),n==null||n(d)},[a,n]);return e.createElement(L,{className:R("iui-dialog-title-bar",v,{"iui-dialog-title-bar-filled":o}),ref:t,onPointerDown:le(g,h),...C},p||e.createElement(e.Fragment,null,e.createElement(G,null,b),i&&e.createElement(ne,{size:"small",styleType:"borderless",onClick:c,"aria-label":"Close","data-iui-shift":"right"},e.createElement(be,null))))}),{Title:G}),we=I.div("iui-dialog-content"),Ee=e.forwardRef((l,t)=>{let r=j(),a=_(),{isVisible:p=r.isOpen,isDismissible:b=r.isDismissible,onClose:i=r.onClose,closeOnExternalClick:n=r.closeOnExternalClick,relativeTo:o=r.relativeTo,onMouseDown:v,className:g,style:C,...h}=l,c=e.useRef(null),d=M(c,t),E=s=>{s.persist(),s.target===c.current&&(b&&n&&i&&(a==null||a.beforeClose(),i(s)),v==null||v(s))};return e.createElement(he,{isVisible:p,className:R({"iui-backdrop-fixed":o==="viewport"},g),ref:d,onMouseDown:E,style:{pointerEvents:"auto",...C},...h})}),De=I.div("iui-dialog-button-bar");let J=l=>{var r,a,p;let t=(r=l==null?void 0:l.current)==null?void 0:r.getBoundingClientRect();return{top:(t==null?void 0:t.top)??0,right:(t==null?void 0:t.right)??((a=W())==null?void 0:a.innerWidth)??0,bottom:(t==null?void 0:t.bottom)??((p=W())==null?void 0:p.innerHeight)??0,left:(t==null?void 0:t.left)??0}};const ve=(l,t,r=!0)=>{let a=e.useRef(0),p=e.useRef(0),b=e.useRef(void 0),i=e.useRef(void 0),n=e.useRef(J(t)),o=e.useCallback(()=>{var S;if(!l.current||!r)return;let{top:s,right:f,bottom:D,left:z}=(S=l.current)==null?void 0:S.getBoundingClientRect(),[m,x]=N(l.current);n.current=J(t),D>n.current.bottom&&(x-=D-n.current.bottom),s<n.current.top&&(x+=n.current.top-s),f>n.current.right&&(m-=f-n.current.right),z<n.current.left&&(m+=n.current.left-z),b.current=m,i.current=x,l.current.style.transform=`translate(${m}px, ${x}px)`},[t,l,r]),[v,g]=ie(o);v(t==null?void 0:t.current),e.useEffect(()=>()=>{g==null||g.disconnect()},[g]),ue("resize",()=>{o(),b.current!=null&&i.current!=null&&h(`translate(${b.current}px, ${i.current}px)`)},W());let[C,h]=e.useState(""),c=e.useRef(s=>{if(!l.current)return;let f=s.clientX-a.current,D=s.clientY-p.current;l.current.style.transform=`translate(${f}px, ${D}px)`,o()}),d=e.useRef("");return{onPointerDown:e.useCallback(s=>{if(!l.current||s.button!==0||!r)return;let[f,D]=N(l.current);a.current=s.clientX-f,p.current=s.clientY-D,d.current=l.current.style.userSelect,l.current.style.userSelect="none";let z=l.current.ownerDocument||document;z.addEventListener("pointermove",c.current),z.addEventListener("pointerup",()=>{h(`translate(${b.current}px, ${i.current}px)`),z.removeEventListener("pointermove",c.current),l.current&&(l.current.style.userSelect=d.current)},{once:!0})},[l,r]),transform:C}},Ce=e.forwardRef((l,t)=>{let r=j(),{className:a,children:p,styleType:b="default",isOpen:i=r.isOpen,isDismissible:n=r.isDismissible,onClose:o=r.onClose,closeOnEsc:v=r.closeOnEsc,trapFocus:g=r.trapFocus,setFocus:C=r.setFocus,preventDocumentScroll:h=r.preventDocumentScroll,onKeyDown:c,isDraggable:d=r.isDraggable,isResizable:E=r.isResizable,style:s,placement:f=r.placement,...D}=l,{dialogRootRef:z}=r,m=e.useRef(null),x=e.useRef(null),[S,F]=e.useState(),B=e.useRef(!1),y=e.useRef("");q(()=>{i&&(y.current=document.body.style.overflow)},[i]),e.useEffect(()=>{var $;let u=($=m.current)==null?void 0:$.ownerDocument;if(!(!u||!h||y.current==="hidden"))return i?u.body.style.overflow="hidden":u.body.style.overflow=y.current,()=>{u.body.style.overflow=y.current}},[m,i,h]);let H=u=>{u.altKey||(u.persist(),n&&v&&u.key==="Escape"&&o&&(T(),o(u)),c==null||c(u))},{onPointerDown:X,transform:k}=ve(m,z,d),P=e.useCallback(u=>{d&&X(u)},[d,X]);q(()=>{if(!d||!i)return;let[u,$]=N(m.current);F(Y=>{var K,U;return{...Y,insetInlineStart:(K=m.current)==null?void 0:K.offsetLeft,insetBlockStart:(U=m.current)==null?void 0:U.offsetTop,transform:`translate(${u}px,${$}px)`}})},[m,d,i]);let O=e.useCallback(u=>{F($=>({...$,...u}))},[]),w=e.useCallback(()=>{var u,$;x.current=(u=m.current)==null?void 0:u.ownerDocument.activeElement,C&&(($=m.current)==null||$.focus({preventScroll:!0}))},[C]),T=e.useCallback(()=>{var u,$,Y;($=m.current)!=null&&$.contains((u=m.current)==null?void 0:u.ownerDocument.activeElement)&&((Y=x.current)==null||Y.focus())},[m,x]),te=e.useCallback(u=>{u&&w()},[w]),V=e.createElement(L,{className:R("iui-dialog",{"iui-dialog-default":b==="default","iui-dialog-full-page":b==="fullPage","iui-dialog-visible":i,"iui-dialog-draggable":d},a),role:"dialog",ref:M(m,te,t),onKeyDown:H,tabIndex:-1,"data-iui-placement":f,style:{transform:k,...S,...s},...D},e.createElement(se,null,e.createElement("slot",null),E&&e.createElement(de,{elementRef:m,containerRef:z,onResizeStart:()=>{B.current||(B.current=!0,O({maxInlineSize:"100%"}))},onResizeEnd:O})),p);return e.createElement(Z.Provider,{value:e.useMemo(()=>({beforeClose:T}),[T])},e.createElement(ee.Provider,{value:{onPointerDown:P}},g&&e.createElement(ge,null,V),!g&&V))});let ze=e.forwardRef((l,t)=>{let{trapFocus:r=!1,setFocus:a=r,preventDocumentScroll:p=!1,isOpen:b=!1,isDismissible:i=!0,closeOnEsc:n=!0,closeOnExternalClick:o=!1,onClose:v,isDraggable:g=!1,isResizable:C=!1,relativeTo:h="viewport",placement:c,className:d,portal:E=!1,...s}=l,f=e.useRef(null),[D,z]=e.useState(null),m=M(t,f,z);return b?e.createElement(Q.Provider,{value:{isOpen:b,onClose:v,closeOnEsc:n,closeOnExternalClick:o,isDismissible:i,preventDocumentScroll:p,trapFocus:r,setFocus:a,isDraggable:g,isResizable:C,relativeTo:h,placement:c}},e.createElement(ae,{portal:E},e.createElement(oe.Provider,{value:D},e.createElement(L,{className:R("iui-dialog-wrapper",d),"data-iui-relative":h==="container",ref:m,...s})))):null});const Se=Object.assign(ze,{Backdrop:Ee,Main:Ce,TitleBar:ye,Content:we,ButtonBar:De});export{Se as D,we as a,De as b};
