import{r as e,o as Q,v as X,w as Y,x as Z,t as _,y as $,z as ee,A as te,e as A,C as ne,D as ae,E as oe,G as re,B as le,c as D,H as se,J as ie,m as V,l as ue}from"./index-Cvt5k5E7.js";import{u as ce}from"./focusable-CsIlAukz.js";import{L as m}from"./ListItem-BbmnPtX6.js";const de=p=>e.createElement(Q,p,e.createElement("path",{d:"M6.003 4.807v6.4a.28.28 0 0 0 .443.24L9.9 8.27a.34.34 0 0 0 0-.48L6.446 4.566a.269.269 0 0 0-.443.24z"})),me=e.forwardRef((p,N)=>{let{className:R,trigger:x,positionReference:i,portal:d=!0,popoverProps:C,children:f,...g}=p,n=X(),u=Y(),s=Z(),{interactions:S,visible:v,onVisibleChange:M,...r}=C??{},{listNavigation:w,hover:o,...b}=S??{},[I,c]=_(!1,v,M),[H,h]=e.useState(!1),[k,P]=e.useState(null),{focusableElementsRef:z,focusableElements:T}=ce(k,{filter:t=>t.filter(a=>!(t!=null&&t.some(E=>E.contains(a.parentElement))))}),[F,L]=e.useState(null),l=$({nodeId:u,visible:I,onVisibleChange:t=>t?c(!0):U(),interactions:{hover:n==null?o:{enabled:!!o&&!H,...o},...b},...r,middleware:{size:{maxHeight:"var(--iui-menu-max-height)"},...r.middleware}}),{getReferenceProps:B,getFloatingProps:q,getItemProps:J}=ee([te(l.context,{activeIndex:F,focusItemOnHover:!1,listRef:z,onNavigate:L,...w})]);e.useEffect(()=>{i!==void 0&&l.refs.setPositionReference(i)},[l.refs,i]);let K=A(P,N,l.refs.setFloating),y=e.useRef(null),U=e.useCallback(()=>{var t;c(!1),s==null&&((t=y.current)==null||t.focus({preventScroll:!0}))},[s,c]);ne(e.useCallback(()=>{let t=a=>{(s===a.parentId&&u!==a.nodeId||s===a.nodeId)&&(c(!1),h(!1))};return n==null||n.events.on("onNodeFocused",t),()=>{n==null||n.events.off("onNodeFocused",t)}},[u,s,n==null?void 0:n.events,c]),()=>{},()=>{});let W=({focusableItemIndex:t,userProps:a})=>J({...a,tabIndex:F!=null&&F>=0&&t!=null&&t>=0&&F===t?0:-1,onFocus:V(a==null?void 0:a.onFocus,()=>{queueMicrotask(()=>{h(!0)}),n==null||n.events.emit("onNodeFocused",{nodeId:u,parentId:s})}),onMouseEnter:V(a==null?void 0:a.onMouseEnter,E=>{t!=null&&t>=0&&L(t),E.target===E.currentTarget&&E.currentTarget.focus()})}),j=ae(x,t=>B(l.getReferenceProps({...t.props,"aria-expanded":l.open,ref:oe(y,l.refs.setReference)}))),G=l.open&&e.createElement(re,{portal:d},e.createElement(le,{as:"div",className:D("iui-menu",R),ref:K,...q(l.getFloatingProps({role:"menu",...g}))},f));return e.createElement(e.Fragment,null,e.createElement(O.Provider,{value:{popoverGetItemProps:W,focusableElements:T}},e.createElement(se.Provider,{value:l.open},j),n!=null?e.createElement(ie,{id:u},G):G))}),O=e.createContext(void 0),ve=e.forwardRef((p,N)=>{let{className:R,children:x,isSelected:i,disabled:d,value:C,onClick:f,sublabel:g,size:n=g?"large":"default",icon:u,startIcon:s=u,badge:S,endIcon:v=S,role:M="menuitem",subMenuItems:r=[],...w}=p,o=e.useContext(O),b=e.useRef(null),I=ue(),c=e.useMemo(()=>({placement:"right-start",interactions:{click:!0,hover:!0,listNavigation:{nested:r.length>0,openOnArrowKeyDown:!0}}}),[r.length]),h={onClick:()=>{d||f==null||f(C)}},k=o==null?void 0:o.focusableElements.findIndex(z=>z===b.current),P=e.createElement(m,{as:"button",type:"button",className:D("iui-button-base",R),actionable:!0,size:n,active:i,disabled:d,ref:A(b,N),role:M,tabIndex:i?0:-1,"aria-selected":i,"aria-haspopup":r.length>0?"true":void 0,"aria-controls":r.length>0?I:void 0,"aria-disabled":d,...(o==null?void 0:o.popoverGetItemProps)!=null?o.popoverGetItemProps({focusableItemIndex:k,userProps:h}):h,...w},s&&e.createElement(m.Icon,{as:"span","aria-hidden":!0},s),e.createElement(m.Content,null,e.createElement("div",null,x),g&&e.createElement(m.Description,null,g)),!v&&r.length>0&&e.createElement(m.Icon,{as:"span","aria-hidden":!0},e.createElement(de,null)),v&&e.createElement(m.Icon,{as:"span","aria-hidden":!0},v));return e.createElement(e.Fragment,null,r.length>0&&!d?e.createElement(me,{id:I,trigger:P,popoverProps:c},r):P)});export{ve as M,me as a};
