import{r as e,o as H,l as L,c as x,u,B as O,e as B,m as I,a as T}from"./index-CEn5yfVA.js";import{I as A,b as G,a as J}from"./InputFlexContainer-BCvnOwyd.js";const m=t=>e.createElement(H,t,e.createElement("path",{d:"m11 9.7c.7-1 1.1-2.2 1.1-3.5.1-3.5-2.7-6.2-6-6.2-3.4 0-6.1 2.7-6.1 6.1s2.7 6.1 6.1 6.1c1.3 0 2.5-.4 3.5-1.1l4.9 4.9 1.4-1.4zm-5 .5c-2.3 0-4.1-1.8-4.1-4.1s1.8-4.1 4.1-4.1 4.1 1.8 4.1 4.1-1.8 4.1-4.1 4.1"}));let i=e.createContext(void 0),K=e.forwardRef((t,n)=>{let{size:a,expandable:l=!1,isDisabled:s=!1,onCollapse:r,onExpand:o,isExpanded:c,children:d,inputProps:w,className:D,...F}=t,N=L(),[P,y]=e.useState(N),h=e.useRef(null),S=e.useRef(null),[M,C]=e.useState(c),b=c??M,q=()=>{C(!1),r==null||r(),queueMicrotask(()=>{var p;return(p=S.current)==null?void 0:p.focus({preventScroll:!0})})},j=()=>{C(!0),o==null||o(),queueMicrotask(()=>{var p;return(p=h.current)==null?void 0:p.focus({preventScroll:!0})})};return e.createElement(i.Provider,{value:{size:a,isDisabled:s,onCollapse:q,onExpand:j,inputRef:h,inputId:P,setInputId:y,openButtonRef:S,isExpanded:b,expandable:l}},e.createElement(A,{ref:n,className:x("iui-searchbox",{"iui-expandable-searchbox":l},D),size:a,isDisabled:s,"data-iui-expanded":b,...F},d??e.createElement(e.Fragment,null,e.createElement(R,null,e.createElement(f,null)),e.createElement(z,null,e.createElement(g,null),e.createElement(v,w),l?e.createElement(k,null):null))))}),R=({children:t})=>{let{isExpanded:n,expandable:a}=u(i);return!a||n?null:e.createElement(e.Fragment,null,t??e.createElement(f,null))},z=({children:t})=>{let{isExpanded:n,expandable:a}=u(i);return a&&!n?null:e.createElement(e.Fragment,null,t)},g=e.forwardRef((t,n)=>{let{className:a,children:l,...s}=t;return e.createElement(G,{"aria-hidden":!0,className:x("iui-search-icon",a),ref:n,...s},l??e.createElement(m,null))}),v=e.forwardRef((t,n)=>{let{className:a,id:l,...s}=t,{inputId:r,setInputId:o,isDisabled:c,inputRef:d}=u(i);return e.useEffect(()=>{l&&l!==r&&o(l)},[l,r,o]),e.createElement(O,{as:"input",id:l??r,ref:B(n,d),role:"searchbox",type:"text",className:x("iui-search-input",a),disabled:c,...s})}),E=e.forwardRef((t,n)=>{let{children:a,...l}=t,{size:s,isDisabled:r}=u(i);return e.createElement(J,{size:s,ref:n,disabled:r,...l},a??e.createElement(m,null))}),k=e.forwardRef((t,n)=>{let{children:a,onClick:l,...s}=t,{onCollapse:r,size:o,isDisabled:c}=u(i);return e.createElement(E,{ref:n,"aria-label":"Close searchbox",size:o,disabled:c,onClick:I(l,r),...s},a??e.createElement(T,null))}),f=e.forwardRef((t,n)=>{let{children:a,onClick:l,...s}=t,{onExpand:r,size:o,isDisabled:c,openButtonRef:d}=u(i);return e.createElement(E,{ref:B(n,d),"aria-label":"Expand searchbox",size:o,disabled:c,onClick:I(l,r),styleType:"default",...s},a??e.createElement(m,null))});const V=Object.assign(K,{Icon:g,Input:v,Button:E,CollapseButton:k,ExpandButton:f,ExpandedState:z,CollapsedState:R});export{V as S};
