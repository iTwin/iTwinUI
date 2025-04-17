import{r as e,o as te,t as ne,v as oe,w as le,x as W,y as ae,z as re,A as se,e as q,C as ie,m as L,D as ue,E as ce,F as de,B as me,c as J,G as fe,H as pe,J as ve,l as ge}from"./index-XUT_GY6Q.js";import{u as be}from"./focusable--6qKiAi8.js";import{L as P}from"./ListItem-CsSWydpM.js";const Ce=s=>e.createElement(te,s,e.createElement("path",{d:"M6.003 4.807v6.4a.28.28 0 0 0 .443.24L9.9 8.27a.34.34 0 0 0 0-.48L6.446 4.566a.269.269 0 0 0-.443.24z"})),U=e.forwardRef((s,b)=>{let{className:f,trigger:x,positionReference:d,portal:p,popoverProps:I,children:v,...C}=s,M=e.useContext(B),E=p??M,t=ne(),i=oe(),o=le(),{interactions:m,visible:u,onVisibleChange:F,...a}=I??{},{listNavigation:r,hover:h,...V}=m??{},[w,g]=W(!1,u,F),[y,O]=e.useState(!1),[S,H]=e.useState(null),{focusableElementsRef:k,focusableElements:D}=be(S,{filter:n=>n.filter(l=>!(n!=null&&n.some(N=>N.contains(l.parentElement))))}),[R,T]=e.useState(null),c=ae({nodeId:i,visible:w,onVisibleChange:n=>n?g(!0):$(),interactions:{hover:t==null?h:{enabled:!!h&&!y,...h},...V},...a,middleware:{size:{maxHeight:"var(--iui-menu-max-height)"},...a.middleware}}),{getReferenceProps:Y,getFloatingProps:Z,getItemProps:z}=re([se(c.context,{activeIndex:R,focusItemOnHover:!1,listRef:k,onNavigate:T,...r})]);e.useEffect(()=>{d!==void 0&&c.refs.setPositionReference(d)},[c.refs,d]);let _=q(H,b,c.refs.setFloating),G=e.useRef(null),$=e.useCallback(()=>{var n;g(!1),o==null&&((n=G.current)==null||n.focus({preventScroll:!0}))},[o,g]);ie(e.useCallback(()=>{let n=l=>{(o===l.parentId&&i!==l.nodeId||o===l.nodeId)&&(g(!1),O(!1))};return t==null||t.events.on("onNodeFocused",n),()=>{t==null||t.events.off("onNodeFocused",n)}},[i,o,t==null?void 0:t.events,g]),()=>{},()=>{});let A=e.useCallback(({focusableItemIndex:n,userProps:l})=>z({...l,tabIndex:R!=null&&R>=0&&n!=null&&n>=0&&R===n?0:-1,onFocus:L(l==null?void 0:l.onFocus,()=>{queueMicrotask(()=>{O(!0)}),t==null||t.events.emit("onNodeFocused",{nodeId:i,parentId:o})}),onMouseEnter:L(l==null?void 0:l.onMouseEnter,N=>{n!=null&&n>=0&&T(n),N.target===N.currentTarget&&N.currentTarget.focus({focusVisible:!1})})}),[R,z,i,o,t==null?void 0:t.events]),ee=ue(x,n=>Y(c.getReferenceProps({...n.props,"aria-expanded":c.open,ref:ce(G,c.refs.setReference)}))),K=c.open&&e.createElement(de,{portal:E},e.createElement(me,{as:"div",className:J("iui-menu",f),ref:_,...Z(c.getFloatingProps({role:"menu",...C}))},v));return e.createElement(e.Fragment,null,e.createElement(j.Provider,{value:e.useMemo(()=>({popoverGetItemProps:A,focusableElements:D}),[D,A])},e.createElement(B.Provider,{value:E},e.createElement(fe.Provider,{value:c.open},ee),t!=null?e.createElement(pe,{id:i},K):K)))}),j=e.createContext(void 0),B=e.createContext(void 0),xe=e.forwardRef((s,b)=>e.createElement(ve,null,e.createElement(Ee,{ref:b,...s})));let Ee=e.forwardRef((s,b)=>{let{menuItems:f,children:x,role:d="menu",visible:p,placement:I="bottom-start",matchWidth:v=!1,onVisibleChange:C,portal:M=!0,middleware:E,closeOnItemClick:t=!1,...i}=s,[o,m]=W(!1,p,C),u=e.useCallback(()=>{m(!1)},[m]),F=e.useMemo(()=>typeof f=="function"?f(u):f,[u,f]),a=e.useMemo(()=>({close:u}),[u]);return e.createElement(X.Provider,{value:t},e.createElement(Q.Provider,{value:a},e.createElement(U,{trigger:x,onKeyDown:L(s.onKeyDown,r=>{r.defaultPrevented||r.key==="Tab"&&m(!1)}),role:d,ref:b,portal:M,popoverProps:e.useMemo(()=>({placement:I,matchWidth:v,visible:o,onVisibleChange:m,middleware:E}),[v,E,I,m,o]),...i},F)))});const Q=e.createContext(void 0),X=e.createContext(void 0),Me=e.forwardRef((s,b)=>{let{className:f,children:x,isSelected:d,disabled:p,value:I,onClick:v,sublabel:C,size:M=C?"large":"default",icon:E,startIcon:t=E,badge:i,endIcon:o=i,role:m="menuitem",subMenuItems:u=[],...F}=s,a=e.useMemo(()=>u.length>0,[u.length]),r=e.useContext(j),h=e.useContext(Q),V=e.useContext(X)&&!a,w=e.useRef(null),g=ge(),y=e.useMemo(()=>({placement:"right-start",interactions:{click:!0,hover:!0,listNavigation:{nested:a,openOnArrowKeyDown:!0}}}),[a]),S={onClick:()=>{p||(V&&(h==null||h.close()),v==null||v(I))}},H=r==null?void 0:r.focusableElements.findIndex(D=>D===w.current),k=e.createElement(P,{as:"button",type:"button",className:J("iui-button-base",f),actionable:!0,size:M,active:d,disabled:p,ref:q(w,b),role:m,tabIndex:d?0:-1,"aria-selected":d,"aria-haspopup":a?"true":void 0,"aria-controls":a?g:void 0,"aria-disabled":p,...(r==null?void 0:r.popoverGetItemProps)!=null?r.popoverGetItemProps({focusableItemIndex:H,userProps:S}):S,...F},t&&e.createElement(P.Icon,{as:"span","aria-hidden":!0},t),e.createElement(P.Content,null,e.createElement("div",null,x),C&&e.createElement(P.Description,null,C)),!o&&a&&e.createElement(P.Icon,{as:"span","aria-hidden":!0},e.createElement(Ce,null)),o&&e.createElement(P.Icon,{as:"span","aria-hidden":!0},o));return e.createElement(e.Fragment,null,a&&!p?e.createElement(U,{id:g,trigger:k,popoverProps:y},u):k)});export{xe as D,Me as M,U as a};
