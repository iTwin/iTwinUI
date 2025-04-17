import{r as o,d as T,B as x,c as I,p as E,I as P,a as V,R as u,j as e}from"./index-CuyZiCR-.js";import{S as k}from"./Edit-CAWiUnsU.js";import{B as y}from"./Button-rllnJcuq.js";import{T as D}from"./Table-wbrquJjX.js";import{T as f}from"./Text-BoNmDqCf.js";import{L as c}from"./Label-CFM9C736.js";import{I as p}from"./Input-CvmHKG8T.js";import{T as A}from"./Textarea-BUT8pR8N.js";import"./ProgressRadial-CWDrPmbc.js";import"./SvgChevronRight-DKarsEy0.js";import"./Checkbox-DgTiQryp.js";import"./useIntersection-lCgDkXfq.js";import"./WithCSSTransition-Bd2M43mq.js";import"./useVirtualScroll-DKyWuTXe.js";const w=o.forwardRef((t,a)=>{let{className:s,isOpen:n=!1,orientation:i="vertical",resizable:l=!0,children:j,...g}=t,[b,d]=o.useState({width:void 0,height:void 0}),r=o.useRef(null),m=T(a,r),O=h=>{r.current&&(h.button!=null&&h.button!==0||(h.preventDefault(),h.stopPropagation(),r.current.ownerDocument.addEventListener("pointermove",N),r.current.ownerDocument.addEventListener("pointerup",()=>{var v;return(v=r.current)==null?void 0:v.ownerDocument.removeEventListener("pointermove",N)},{once:!0})))},N=o.useCallback(h=>{if(h.preventDefault(),!r.current)return;let{right:v,bottom:F}=r.current.getBoundingClientRect();d(i==="vertical"?{width:v-h.clientX,height:void 0}:{height:F-h.clientY,width:void 0})},[i]);return o.createElement(x,{className:I("iui-information-panel",{"iui-right":i==="vertical","iui-bottom":i==="horizontal","iui-visible":n},s),ref:m,...g,style:{width:i==="vertical"?b.width:void 0,height:i==="horizontal"?b.height:void 0,...t.style}},l&&o.createElement(x,{className:"iui-resizer",onPointerDown:O},o.createElement(x,{className:"iui-resizer-bar"})),j)}),q=E.div("iui-information-panel-wrapper"),C=o.forwardRef((t,a)=>{let{children:s,onClose:n,actions:i,className:l,...j}=t;return o.createElement(x,{className:I("iui-information-header",l),ref:a,...j},o.createElement(x,{as:"span",className:"iui-information-header-label"},s),o.createElement(x,{className:"iui-information-header-actions"},i,n&&o.createElement(P,{styleType:"borderless",onClick:n,"aria-label":"Close"},o.createElement(V,{"aria-hidden":!0}))))}),R=E.div("iui-information-body"),z=o.forwardRef((t,a)=>{let{className:s,displayStyle:n="default",children:i,...l}=t;return o.createElement(x,{className:I("iui-information-body-content",{"iui-inline":n==="inline"},s),ref:a,...l},i)}),ie={title:"InformationPanel"},S=()=>{const[t,a]=u.useState(),s=u.useMemo(()=>[{id:"name",Header:"Name",accessor:"name"},{Header:"Details",Cell:({row:{index:i}})=>e.jsx(y,{onClick:()=>a(i),children:"Details"})}],[]),n=u.useMemo(()=>[...Array(10).fill(null)].map((i,l)=>({name:`Row${l}`})),[]);return e.jsxs(q,{children:[e.jsx(D,{columns:s,data:n,emptyTableContent:"No data."}),e.jsxs(w,{isOpen:t!=null&&t!==-1,children:[e.jsx(C,{onClose:()=>{a(-1),console.log("Panel closed")},children:e.jsxs(f,{variant:"subheading",children:["Row ",t??0]})}),e.jsx(R,{children:e.jsxs(z,{displayStyle:"inline",children:[e.jsx(c,{htmlFor:"name-input",children:"File name"}),e.jsx(p,{size:"small",id:"name-input",defaultValue:`Row ${t??0}`,readOnly:!0}),e.jsx(c,{htmlFor:"author-input",children:"Author"}),e.jsx(p,{size:"small",id:"author-input",defaultValue:"DJ Terry",readOnly:!0}),e.jsx(c,{htmlFor:"year-input",children:"Year"}),e.jsx(p,{size:"small",id:"year-input",defaultValue:"2021",readOnly:!0}),e.jsx(c,{htmlFor:"path-input",children:"Path"}),e.jsx(p,{size:"small",id:"path-input",defaultValue:"/Shared/Music/",readOnly:!0})]})})]})]})};S.decorators=[t=>e.jsxs(e.Fragment,{children:[e.jsx(f,{isMuted:!0,style:{marginBottom:11},children:e.jsx("em",{children:"Click on Details to open InformationalPanel"})}),e.jsx(t,{})]})];const B=()=>{const[t,a]=u.useState(),s=u.useMemo(()=>[{id:"name",Header:"Name",accessor:"name"},{Header:"Details",Cell:({row:{index:i}})=>e.jsx(y,{onClick:()=>a(i),children:"Details"})}],[]),n=u.useMemo(()=>[...Array(10).fill(null)].map((i,l)=>({name:`Row${l}`})),[]);return e.jsxs(q,{children:[e.jsx(D,{columns:s,data:n,emptyTableContent:"No data."}),e.jsxs(w,{orientation:"horizontal",isOpen:t!=null&&t!==-1,children:[e.jsx(C,{onClose:()=>{a(-1),console.log("Panel closed")},children:e.jsxs(f,{variant:"subheading",children:["Row ",t??0]})}),e.jsx(R,{children:e.jsxs(z,{displayStyle:"inline",children:[e.jsx(c,{htmlFor:"name-input",children:"File name"}),e.jsx(p,{size:"small",id:"name-input",defaultValue:`Row ${t??0}`,readOnly:!0}),e.jsx(c,{htmlFor:"author-input",children:"Author"}),e.jsx(p,{size:"small",id:"author-input",defaultValue:"DJ Terry",readOnly:!0}),e.jsx(c,{htmlFor:"year-input",children:"Year"}),e.jsx(p,{size:"small",id:"year-input",defaultValue:"2021",readOnly:!0}),e.jsx(c,{htmlFor:"path-input",children:"Path"}),e.jsx(p,{size:"small",id:"path-input",defaultValue:"/Shared/Music/",readOnly:!0})]})})]})]})};B.decorators=[...S.decorators];const M=()=>{var g,b;const[t,a]=u.useState(),[s,n]=u.useState(!1),i=u.useMemo(()=>[{id:"name",Header:"Name",accessor:"name"},{Header:"Details",Cell:({row:d})=>e.jsx(y,{onClick:()=>a(d.index),children:"Details"})}],[]),[l,j]=u.useState(()=>[...Array(10).fill(null)].map((d,r)=>({name:`Row${r}`,info:`Row${r} description: Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus veniam dicta error doloremque libero sit est. Voluptatum nam modi, ex illum veritatis nobis omnis porro quod harum optio minus magnam tenetur quia dolor quis natus, eius, suscipit hic? Nobis deleniti obcaecati, sequi mollitia vero magnam error quidem, voluptatem asperiores repudiandae, molestias sit et voluptatibus magni. Sequi delectus, sunt eaque corrupti architecto modi suscipit? Quos in itaque dolore voluptas saepe natus repellat ad qui dolores. Incidunt temporibus ut, unde maxime nam explicabo saepe aspernatur molestiae iste libero neque, alias corporis laboriosam fugiat ad. Dicta neque quos fuga odit quae sequi dolore!`})));return e.jsxs(q,{children:[e.jsx(D,{columns:i,data:l,emptyTableContent:"No data."}),e.jsxs(w,{isOpen:t!=null,children:[e.jsx(C,{onClose:()=>{a(void 0),n(!1),console.log("Panel closed")},actions:e.jsx(P,{styleType:"borderless",isActive:s,onClick:()=>n(d=>!d),children:e.jsx(k,{})}),children:e.jsx(f,{variant:"subheading",children:"Row details"})}),e.jsx(R,{children:t!=null&&e.jsxs(z,{children:[e.jsx(c,{htmlFor:"name-input",children:"Name"}),e.jsx(p,{id:"name-input",defaultValue:(g=l[t])==null?void 0:g.name,disabled:!s,onChange:({target:{value:d}})=>{j(r=>{const m=[...r];return m[t]={...m[t],name:d},m})}}),e.jsx(c,{htmlFor:"description-input",children:"Description"}),e.jsx(A,{id:"description-input",defaultValue:(b=l[t])==null?void 0:b.info,disabled:!s,onChange:({target:{value:d}})=>{j(r=>{const m=[...r];return m[t]={...m[t],info:d},m})},rows:15})]})})]})]})};M.decorators=[...S.decorators];const H=()=>{const[t,a]=u.useState(!1);return e.jsxs(q,{style:{height:"80vh",width:"90%"},children:[e.jsx("div",{style:{backgroundColor:"var(--iui-color-background-disabled)",padding:16,height:"100%",boxSizing:"border-box"},children:e.jsx(y,{onClick:()=>a(n=>!n),children:"Toggle"})}),e.jsxs(w,{style:{width:"40%",maxWidth:"70%"},isOpen:t,orientation:"vertical",children:[e.jsx(C,{onClose:()=>{a(!1),console.log("Panel closed")},children:e.jsx(f,{variant:"subheading",children:"Details"})}),e.jsx(R,{children:e.jsx(f,{children:"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus veniam dicta error doloremque libero sit est. Voluptatum nam modi, ex illum veritatis nobis omnis porro quod harum optio minus magnam tenetur quia dolor quis natus, eius, suscipit hic? Nobis deleniti obcaecati, sequi mollitia vero magnam error quidem, voluptatem asperiores repudiandae, molestias sit et voluptatibus magni. Sequi delectus, sunt eaque corrupti architecto modi suscipit? Quos in itaque dolore voluptas saepe natus repellat ad qui dolores. Incidunt temporibus ut, unde maxime nam explicabo saepe aspernatur molestiae iste libero neque, alias corporis laboriosam fugiat ad. Dicta neque quos fuga odit quae sequi dolore!"})})]})]})};H.decorators=[t=>e.jsxs(e.Fragment,{children:[e.jsx(f,{isMuted:!0,style:{marginBottom:11},children:e.jsx("em",{children:"Notice that the panel has an initial width of 40% and can only be resized upto 70% of the container width."})}),e.jsx(t,{})]})];typeof window<"u"&&window.document&&window.document.createElement&&document.documentElement.setAttribute("data-storyloaded","");export{S as Basic,M as CustomActions,H as CustomWidth,B as Horizontal,ie as default};
