import{p as ae,r as e,i as W,V as te,B as m,c as w,d as ne,e as F,n as le,o as se,P as re}from"./index-7nKTUIFH.js";import{M as ie,a as ce}from"./MenuItem-k9f_sWLM.js";import{I as ue}from"./Icon-EokrK5CX.js";import{u as oe}from"./Popover-WYBrke_R.js";import{S as me}from"./SvgCheckmark-xISOU5fX.js";import{S as fe}from"./SvgCaretDownSmall-IqMVNLO6.js";const L=ae.div("iui-input-with-icon");L.displayName="InputWithIcon";const de=({text:t=""})=>{const[l,n]=e.useState(t);return e.useEffect(()=>{var c;n(t);const s=(c=W())==null?void 0:c.setTimeout(()=>n(""),5e3);return()=>{var S;return void((S=W())==null?void 0:S.clearTimeout(s))}},[t]),e.createElement(te,{as:"div","aria-live":"polite","aria-atomic":"true"},l)},z=e.forwardRef((t,l)=>{const{className:n,label:s,...c}=t;return e.createElement(m,{as:"span",className:w("iui-select-tag",n),ref:l,...c},e.createElement(m,{as:"span",className:"iui-select-tag-label"},s))}),be=e.forwardRef((t,l)=>{const{tags:n,className:s,...c}=t,[S,f]=ne(n),d=F(l,S);return e.createElement(m,{className:w("iui-select-tag-container",s),ref:d,...c},e.createElement(e.Fragment,null,f<n.length?n.slice(0,f-1):n,f<n.length&&e.createElement(z,{label:`+${n.length-f+1} item(s)`})))}),k=(t,l)=>l,Ee=(t,l)=>!l,ke=e.forwardRef((t,l)=>{const n=le(),{options:s,value:c,onChange:S,placeholder:f,disabled:d=!1,size:A,itemRenderer:y,selectedItemRenderer:O,menuClassName:D,menuStyle:H,multiple:u=!1,triggerProps:b,status:j,popoverProps:r,...K}=t,[x,M]=e.useState(!1),[U,q]=e.useState(""),[G,T]=e.useState(),i=c!==void 0?c:G,o=se(S),I=e.useRef(null),J=e.useCallback(()=>{var a;d||(M(!0),(a=r==null?void 0:r.onVisibleChange)==null||a.call(r,!0))},[d,r]),R=e.useCallback(()=>{var a,N;M(!1),(a=I.current)==null||a.focus({preventScroll:!0}),(N=r==null?void 0:r.onVisibleChange)==null||N.call(r,!1)},[r]),Q=e.useMemo(()=>s.map((a,N)=>{const g=k(i,u)?(i==null?void 0:i.includes(a.value))??!1:i===a.value,$=y?y(a,{close:()=>M(!1),isSelected:g}):e.createElement(ie,null,a.label),{label:Y,icon:Z,startIcon:_,...P}=a,ee=_??Z;return e.cloneElement($,{key:`${Y}-${N}`,isSelected:g,startIcon:ee,endIcon:g?e.createElement(me,{"aria-hidden":!0}):null,onClick:()=>{var p,B;if(!a.disabled&&(Ee(o.current,u)?(T(a.value),(p=o.current)==null||p.call(o,a.value),R()):(T(h=>g?h==null?void 0:h.filter(V=>a.value!==V):[...h??[],a.value]),(B=o.current)==null||B.call(o,a.value,g?"removed":"added")),k(i,u))){const h=i||[],V=g?h.filter(C=>a.value!==C):[...h,a.value];q(s.filter(C=>V.includes(C.value)).map(C=>C.label).filter(Boolean).join(", "))}},ref:p=>{g&&!u&&(p==null||p.scrollIntoView({block:"nearest"}))},role:"option",...P,...$.props})}),[R,y,u,o,s,i]),E=e.useMemo(()=>{if(i!=null)return k(i,u)?s.filter(a=>i.some(N=>N===a.value)):s.find(a=>a.value===i)},[u,s,i]),X=e.useCallback(a=>e.createElement(z,{key:a.label,label:a.label}),[]),v=oe({visible:x,matchWidth:!0,closeOnOutsideClick:!0,...r,onVisibleChange:a=>a?J():R()});return e.createElement(e.Fragment,null,e.createElement(L,{...K,ref:F(v.refs.setPositionReference,l)},e.createElement(m,{...v.getReferenceProps(),tabIndex:0,role:"combobox","data-iui-size":A,"data-iui-status":j,"aria-disabled":d,"aria-autocomplete":"none","aria-expanded":x,"aria-haspopup":"listbox","aria-controls":`${n}-menu`,...b,ref:F(I,b==null?void 0:b.ref,v.refs.setReference),className:w("iui-select-button",{"iui-placeholder":(!E||E.length===0)&&!!f,"iui-disabled":d},b==null?void 0:b.className)},(!E||E.length===0)&&e.createElement(m,{as:"span",className:"iui-content"},f),k(E,u)?e.createElement(he,{selectedItems:E,selectedItemsRenderer:O,tagRenderer:X}):e.createElement(ge,{selectedItem:E,selectedItemRenderer:O})),e.createElement(ue,{as:"span","aria-hidden":!0,className:w("iui-end-icon",{"iui-disabled":d,"iui-open":x})},e.createElement(fe,null)),u?e.createElement(de,{text:U}):null),v.open&&e.createElement(re,null,e.createElement(ce,{role:"listbox",className:D,id:`${n}-menu`,key:`${n}-menu`,...v.getFloatingProps({style:H,onKeyDown:({key:a})=>{a==="Tab"&&R()}}),ref:v.refs.setFloating},Q)))}),ge=({selectedItem:t,selectedItemRenderer:l})=>{const n=(t==null?void 0:t.startIcon)??(t==null?void 0:t.icon);return e.createElement(e.Fragment,null,t&&l&&l(t),t&&!l&&e.createElement(e.Fragment,null,n&&e.createElement(m,{as:"span",className:"iui-icon","aria-hidden":!0},n),e.createElement(m,{as:"span",className:"iui-content"},t.label)))},he=({selectedItems:t,selectedItemsRenderer:l,tagRenderer:n})=>{const s=e.useMemo(()=>t?t.map(c=>n(c)):[],[t,n]);return e.createElement(e.Fragment,null,t&&l&&l(t),t&&!l&&e.createElement(m,{as:"span",className:"iui-content"},e.createElement(be,{tags:s})))};export{de as A,L as I,ke as S,be as a,z as b};
