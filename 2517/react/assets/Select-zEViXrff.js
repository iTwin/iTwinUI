import{p as re,r as e,g as K,V as se,c as k,O as D,m as W,l as ie,n as ue,y as oe,e as H,B as M,F as ce,N as me,Q as de}from"./index-BMJCQ3hz.js";import{M as fe}from"./MenuItem-pVKMkDp7.js";import{T as ve}from"./Tag-DeCQSYP2.js";import{I as Ee}from"./Icon-C0LQdniH.js";import{L as be}from"./List-rtqmS4pQ.js";import{S as ge}from"./SvgCheckmark-B2wuCJcT.js";import{S as he}from"./SvgCaretDownSmall-BWY-WFDg.js";const P=re.div("iui-input-with-icon"),Se=({text:t,...n})=>{let[l,r]=e.useState(t);return e.useEffect(()=>{var u;r(t);let s=(u=K())==null?void 0:u.setTimeout(()=>r(""),5e3);return()=>{var E;return void((E=K())==null?void 0:E.clearTimeout(s))}},[t]),e.createElement(se,{as:"div","aria-live":"polite","aria-atomic":"true",...n},l)},j=e.forwardRef((t,n)=>{let{className:l,label:r,...s}=t;return e.createElement(ve,{className:k("iui-select-tag",l),labelProps:{className:"iui-select-tag-label"},removeButtonProps:{className:"iui-select-tag-button","aria-label":`Deselect ${r}`},ref:n,...s},r)}),Ce=e.forwardRef((t,n)=>{let{tags:l,className:r,...s}=t,u=e.useMemo(()=>e.Children.toArray(l),[l]);return e.createElement(D,{itemsCount:u.length,className:k("iui-select-tag-container",r),ref:n,...s},e.createElement(ye,{...t,tags:u}))});let ye=t=>{let{tags:n}=t,{visibleCount:l}=D.useContext();return e.createElement(e.Fragment,null,l<n.length?n.slice(0,l-1):n,e.createElement(D.OverflowNode,null,e.createElement(j,{label:`+${n.length-l+1} item(s)`})))};const Be=e.forwardRef((t,n)=>{let{native:l,...r}=t,s=l?Ne:xe;return e.createElement(s,{...r,ref:n})});let Ne=e.forwardRef((t,n)=>{let{triggerProps:l,options:r,disabled:s,placeholder:u,defaultValue:E=u!==void 0?"":void 0,value:v,onChange:h,size:N,status:p,styleType:m,required:b,...d}=t;return e.createElement(P,{...d,ref:n},e.createElement(Q,{as:"select",size:N,status:p,styleType:m,disabled:s,defaultValue:v===void 0?E:void 0,value:v===null?"":v,required:b,...l,onKeyDown:W(l==null?void 0:l.onKeyDown,o=>{var F,I;o.key==="Enter"&&((I=(F=o.currentTarget).showPicker)==null||I.call(F))}),onChange:W(l==null?void 0:l.onChange,o=>{h==null||h(o.currentTarget.value,o)})},m!=="borderless"&&u!==void 0?e.createElement("option",{value:"",disabled:!0},u):null,r.map(o=>e.createElement("option",{key:o.value,...o},o.label))),e.createElement(U,{disabled:s}))}),xe=e.forwardRef((t,n)=>{let l=ie(),{options:r,value:s,onChange:u,placeholder:E,disabled:v=!1,size:h,itemRenderer:N,selectedItemRenderer:p,menuClassName:m,menuStyle:b,multiple:d=!1,triggerProps:o,status:F,popoverProps:{portal:I=!0,...f}={},styleType:G,...J}=t,[B,$]=e.useState(!1),[X,Y]=e.useState(""),[Z,q]=e.useState(),i=s!==void 0?s:Z,S=ue(u),L=e.useRef(null),_=e.useCallback(()=>{var a;v||($(!0),(a=f==null?void 0:f.onVisibleChange)==null||a.call(f,!0))},[v,f]),O=e.useCallback(()=>{var a,c;$(!1),(a=L.current)==null||a.focus({preventScroll:!0}),(c=f==null?void 0:f.onVisibleChange)==null||c.call(f,!1)},[f]),z=e.useCallback((a,{isSelected:c=!1}={})=>{var y,R;if(pe(S.current,d)?(q(a.value),(y=S.current)==null||y.call(S,a.value),O()):(q(g=>c?g==null?void 0:g.filter(T=>a.value!==T):[...g??[],a.value]),(R=S.current)==null||R.call(S,a.value,c?"removed":"added")),V(i,d)){let g=i||[],T=c?g.filter(x=>a.value!==x):[...g,a.value];Y(r.filter(x=>T.includes(x.value)).map(x=>x.label).filter(Boolean).join(", "))}},[O,d,S,r,i]),ee=e.useMemo(()=>r.map((a,c)=>{let y=V(i,d)?(i==null?void 0:i.includes(a.value))??!1:i===a.value,R=N?N(a,{close:()=>$(!1),isSelected:y}):e.createElement(fe,null,a.label),{label:g,icon:T,startIcon:x,...le}=a,ne=x??T;return e.cloneElement(R,{key:`${g}-${c}`,isSelected:y,startIcon:ne,endIcon:y?e.createElement(ge,{"aria-hidden":!0}):null,onClick:()=>{a.disabled||z(a,{isSelected:y})},ref:A=>{y&&!d&&(A==null||A.scrollIntoView({block:"nearest"}))},role:"option",...le,...R.props})}),[z,N,d,r,i]),C=e.useMemo(()=>{if(i!=null)return V(i,d)?r.filter(a=>i.some(c=>c===a.value)):r.find(a=>a.value===i)},[d,r,i]),te=e.useMemo(()=>{let a=0;return Array.isArray(i)&&i.length>0?a=r.findIndex(c=>c.value===i[0]):i&&(a=r.findIndex(c=>c.value===i)),a>=0?a:0},[r,i]),ae=e.useCallback(a=>e.createElement(j,{key:a.label,label:a.label,onRemove:()=>{var c;z(a,{isSelected:!0}),(c=L.current)==null||c.focus()}}),[z]),w=oe({visible:B,matchWidth:!0,closeOnOutsideClick:!0,middleware:{size:{maxHeight:"var(--iui-menu-max-height)"}},...f,onVisibleChange:a=>a?_():O()});return e.createElement(e.Fragment,null,e.createElement(P,{...J,ref:H(w.refs.setPositionReference,n)},e.createElement(Q,{...w.getReferenceProps(),tabIndex:0,role:"combobox",size:h,status:F,"aria-disabled":v?"true":void 0,"data-iui-disabled":v?"true":void 0,"aria-autocomplete":"none","aria-expanded":B,"aria-haspopup":"listbox","aria-controls":`${l}-menu`,styleType:G,...o,ref:H(L,o==null?void 0:o.ref,w.refs.setReference),className:k({"iui-placeholder":(!C||C.length===0)&&!!E},o==null?void 0:o.className),"data-iui-multi":d},(!C||C.length===0)&&e.createElement(M,{as:"span",className:"iui-content"},E),V(C,d)?e.createElement(Se,{text:X}):e.createElement(we,{selectedItem:C,selectedItemRenderer:p})),e.createElement(U,{disabled:v,isOpen:B}),V(C,d)?e.createElement(ke,{selectedItems:C,selectedItemsRenderer:p,tagRenderer:ae,size:h==="small"?"small":void 0}):null),w.open&&e.createElement(ce,{portal:I},e.createElement(Re,{defaultFocusedIndex:te,className:m,id:`${l}-menu`,key:`${l}-menu`,...w.getFloatingProps({style:b,onKeyDown:({key:a})=>{a==="Tab"&&O()}}),ref:w.refs.setFloating},ee)))}),V=(t,n)=>n,pe=(t,n)=>!n,Q=e.forwardRef((t,n)=>{let{size:l,status:r,styleType:s="default",...u}=t;return e.createElement(M,{"data-iui-size":l,"data-iui-status":r,"data-iui-variant":s!=="default"?s:void 0,...u,ref:n,className:k("iui-select-button","iui-field",t.className)})}),U=e.forwardRef((t,n)=>{let{disabled:l,isOpen:r,...s}=t;return e.createElement(Ee,{"aria-hidden":!0,...s,ref:n,className:k("iui-end-icon",{"iui-disabled":l,"iui-open":r},t.className)},e.createElement(he,null))}),we=({selectedItem:t,selectedItemRenderer:n})=>{let l=(t==null?void 0:t.startIcon)??(t==null?void 0:t.icon);return e.createElement(e.Fragment,null,t&&n&&n(t),t&&!n&&e.createElement(e.Fragment,null,l&&e.createElement(M,{as:"span",className:"iui-icon","aria-hidden":!0},l),e.createElement(M,{as:"span",className:"iui-content"},t.label)))},ke=({selectedItems:t,selectedItemsRenderer:n,tagRenderer:l,size:r})=>{let s=e.useMemo(()=>t?t.map(u=>l(u)):[],[t,l]);return e.createElement(e.Fragment,null,t&&e.createElement(M,{as:"span",className:"iui-content"},n?n(t):e.createElement(Ce,{tags:s,"data-iui-size":r})))},Re=e.forwardRef((t,n)=>{let{defaultFocusedIndex:l=0,autoFocus:r=!0,children:s,className:u,...E}=t,[v,h]=e.useState(l),N=e.useCallback(m=>{queueMicrotask(()=>{let b=m==null?void 0:m.querySelector('[tabindex="0"]');b==null||b.focus()})},[]),p=e.useMemo(()=>e.Children.map(s,(m,b)=>e.isValidElement(m)?e.createElement(me,{key:b,render:m,ref:m.props.ref||m.ref}):m),[s]);return e.createElement(de,{render:e.createElement(be,{as:"div",className:k("iui-menu",u)}),orientation:"vertical",role:"listbox",activeIndex:v,onNavigate:h,ref:H(n,r?N:void 0),...E},p)});export{Se as A,P as I,Be as S,Ce as a,j as b};
