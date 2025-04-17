import{r as a,e as z,B as s,c as r,j as e}from"./index-ZG0WEztO.js";import{S as w}from"./Network-PPkYRWeR.js";import{I as B}from"./InputGroup-YuAE4A3D.js";import"./InputGrid-1eBnfVtX.js";import"./Label-Ujp5PjyR.js";import"./Input-C4ZY370R.js";import"./Textarea-C_PLzkPE.js";import"./Icon-DV5R0AaH.js";import"./InputWithDecorations-do49W6T_.js";import"./InputFlexContainer-qmQnyVK6.js";import"./MenuExtraContent-BnPKt_VQ.js";import"./Select-DCa1Gi9p.js";import"./MenuItem-DhJ5kKg-.js";import"./focusable-LKR0keZU.js";import"./ListItem-BLzvGVtw.js";import"./LinkAction-OFQabEZH.js";import"./Tag-CVm0s8dz.js";import"./List-DSv-quYc.js";import"./SvgCheckmark-Dpifww3M.js";import"./SvgCaretDownSmall-Bvz9hCsM.js";import"./Text-D4N5jGTA.js";import"./useContainerWidth-DluX9qla.js";import"./useVirtualScroll-C709BmsB.js";const i=a.forwardRef((l,u)=>{let{icon:o,label:n,description:t,className:v,wrapperProps:d,iconProps:m,labelProps:c,subLabelProps:p,style:h,...f}=l,j=a.useRef(null),b=z(j,u);return a.createElement(s,{as:"label","data-iui-disabled":l.disabled?"true":void 0,...d,className:r("iui-radio-tile",d==null?void 0:d.className)},a.createElement(s,{as:"input",ref:b,className:r("iui-radio-tile-input",v),style:h,type:"radio",...f}),o&&a.createElement(s,{as:"span","aria-hidden":!0,...m,className:r("iui-radio-tile-icon",m==null?void 0:m.className)},o),n&&a.createElement(s,{as:"div",...c,className:r("iui-radio-tile-label",c==null?void 0:c.className)},n),t&&a.createElement(s,{as:"div",...p,className:r("iui-radio-tile-sublabel",p==null?void 0:p.className)},t))}),x=a.forwardRef((l,u)=>{let{children:o,label:n,tileContainerProps:t,...v}=l;return a.createElement(B,{label:n,ref:u,...v},a.createElement(s,{as:"div",...t,className:r("iui-radio-tile-container",t==null?void 0:t.className)},o))}),g=l=>a.createElement("svg",{viewBox:"0 0 16 16",width:"1rem",height:"1rem",fill:"var(--iui-color-icon-muted, currentColor)",...l},a.createElement("path",{d:"M0 2.042l6-.824V7H.001M6 8v5.782L.001 12.95V8zm1-6.899L15 0v7H7m8 1v7l-8-1.111V8z"})),Q={title:"RadioTileGroup"},U=()=>e.jsxs(x,{label:"Choose type",children:[e.jsx(i,{label:"Web",description:"Dimensions in px",icon:e.jsx(w,{}),defaultChecked:!0,name:"OS",value:"Web"}),e.jsx(i,{label:"iOS",description:"Dimensions in pt",icon:e.jsx("svg",{"aria-hidden":"true",viewBox:"0 0 16 16",children:e.jsx("path",{d:"m14.38732 12.46864a8.67507 8.67507 0 0 1 -.85133 1.54667 7.83909 7.83909 0 0 1 -1.096 1.33933 2.11842 2.11842 0 0 1 -1.40933.62733 3.50824 3.50824 0 0 1 -1.30133-.314 3.7014 3.7014 0 0 0 -1.40133-.31333 3.82728 3.82728 0 0 0 -1.44066.31333 3.84425 3.84425 0 0 1 -1.24467.33067 1.98968 1.98968 0 0 1 -1.44066-.644 8.203 8.203 0 0 1 -1.14667-1.38664 9.61729 9.61729 0 0 1 -1.21266-2.43466 8.99338 8.99338 0 0 1 -.50933-2.90134 5.34287 5.34287 0 0 1 .68865-2.772 4.05969 4.05969 0 0 1 1.44134-1.474 3.84792 3.84792 0 0 1 1.94933-.556 4.55944 4.55944 0 0 1 1.50733.35466 4.79788 4.79788 0 0 0 1.196.35534 7.06478 7.06478 0 0 0 1.326-.41866 4.34039 4.34039 0 0 1 1.802-.32334 3.8146 3.8146 0 0 1 2.99733 1.59533 3.37671 3.37671 0 0 0 -1.768 3.062 3.3911 3.3911 0 0 0 1.09733 2.54467 3.59839 3.59839 0 0 0 1.096.72733q-.132.386-.27933.74133zm-3.05466-12.14864a3.43565 3.43565 0 0 1 -.86533 2.23866 2.93869 2.93869 0 0 1 -2.45 1.22267 2.58687 2.58687 0 0 1 -.018-.30334 3.63848 3.63848 0 0 1 2.03667-3.11132 3.30968 3.30968 0 0 1 1.28-.36667 2.86658 2.86658 0 0 1 .01667.32z"})}),name:"OS",value:"iOS"}),e.jsx(i,{label:"Android",description:"Dimensions in dp/sp",icon:e.jsx("svg",{"aria-hidden":"true",viewBox:"0 0 16 16",children:e.jsx("path",{d:"m3.28467 6.184v4.122a.97577.97577 0 1 1 -1.95134 0v-4.122a.97576.97576 0 1 1 1.95134 0zm2.58133-4.71533-.688-1.25934a.14184.14184 0 0 1 .054-.19133.13814.13814 0 0 1 .18867.05467l.696 1.27333a4.63366 4.63366 0 0 1 3.76666 0l.696-1.27333a.1368.1368 0 0 1 .18867-.05467.14184.14184 0 0 1 .054.19133l-.688 1.25934a4.03915 4.03915 0 0 1 2.218 3.546h-8.704a4.03915 4.03915 0 0 1 2.218-3.546zm3.77933 1.56266a.36337.36337 0 1 0 .36334-.36866.36621.36621 0 0 0 -.36334.36866zm-4.01733 0a.36337.36337 0 1 0 .36333-.36866.3662.3662 0 0 0 -.36333.36866zm8.06267 2.16334a.98351.98351 0 0 0 -.97534.98933v4.122a.97577.97577 0 1 0 1.95134 0v-4.122a.98365.98365 0 0 0 -.976-.98933zm-10.04267.16933v6.39733a1.05948 1.05948 0 0 0 1.052 1.06667h.69867v2.18267a.97543.97543 0 1 0 1.95066 0v-2.18267h1.30134v2.18267a.97543.97543 0 1 0 1.95066 0v-2.18267h.69867a1.05948 1.05948 0 0 0 1.052-1.06667v-6.39733z"})}),name:"OS",value:"Android"}),e.jsx(i,{label:"Windows",description:"Windows phone is no longer supported",icon:e.jsx(g,{}),disabled:!0,name:"OS",value:"Windows"})]}),X=()=>e.jsxs(x,{label:"Map indicator type",children:[e.jsx(i,{label:"Google Maps",icon:e.jsxs("svg",{"aria-hidden":"true",viewBox:"0 0 24 24",children:[e.jsx("path",{d:"m12 0a7.98189 7.98189 0 0 0 -6.9688 11.906c.1079.192.221.381.3438.563l6.625 11.531 6.625-11.531c.102-.151.19-.311.281-.469l.063-.094a7.98217 7.98217 0 0 0 -6.969-11.906zm0 4a4 4 0 1 1 -4 4 4.00011 4.00011 0 0 1 4-4z",fill:"#e74c3c"}),e.jsx("path",{d:"m12 3a5 5 0 1 0 5 5 5 5 0 0 0 -5-5zm0 2a3 3 0 1 1 -3 3 2.99988 2.99988 0 0 1 3-3z",fill:"#c0392b"})]}),name:"map",value:"Google Maps"}),e.jsx(i,{label:"Bentley Blue",icon:e.jsxs("svg",{"aria-hidden":"true",viewBox:"0 0 24 24",children:[e.jsx("path",{d:"m12 0a8.12188 8.12188 0 0 0 -8.18182 7.95c0 1.8 1.235 4.65 3.55066 8.85 1.698 3 4.6311 7.2 4.6311 7.2s2.93308-4.35 4.63122-7.35c2.31571-4.2 3.55066-7.05 3.55066-8.85a8.09618 8.09618 0 0 0 -8.18188-7.8z",fill:"#fff"}),e.jsx("path",{d:"m12 1.10962a7.05246 7.05246 0 0 0 -7.0722 6.84038c0 1.88313 1.8238 5.43244 3.41275 8.31426 1.06435 1.88039 2.649 4.27827 3.64493 5.75084.99723-1.518 2.60183-4.00688 3.68-5.91171 1.58292-2.87099 3.40672-6.42031 3.40672-8.30339a6.98162 6.98162 0 0 0 -7.0722-6.69038zm.002 9.79947a3.27273 3.27273 0 1 1 3.27272-3.27273 3.27268 3.27268 0 0 1 -3.27272 3.27273z",fill:"#6ab9ec"})]}),name:"map",value:"Bentley Blue",defaultChecked:!0}),e.jsx(i,{label:"Bentley Green",icon:e.jsxs("svg",{"aria-hidden":"true",viewBox:"0 0 24 24",children:[e.jsx("path",{d:"m12 0a8.12188 8.12188 0 0 0 -8.18182 7.95c0 1.8 1.235 4.65 3.55066 8.85 1.698 3 4.6311 7.2 4.6311 7.2s2.93308-4.35 4.63122-7.35c2.31571-4.2 3.55066-7.05 3.55066-8.85a8.09618 8.09618 0 0 0 -8.18188-7.8z",fill:"#fff"}),e.jsx("path",{d:"m12 1.10962a7.05246 7.05246 0 0 0 -7.0722 6.84038c0 1.88313 1.8238 5.43244 3.41275 8.31426 1.06435 1.88039 2.649 4.27827 3.64493 5.75084.99723-1.518 2.60183-4.00688 3.68-5.91171 1.58292-2.87099 3.40672-6.42031 3.40672-8.30339a6.98162 6.98162 0 0 0 -7.0722-6.69038zm.002 9.79947a3.27273 3.27273 0 1 1 3.27272-3.27273 3.27268 3.27268 0 0 1 -3.27272 3.27273z",fill:"#b1c854"})]}),name:"map",value:"Bentley Green"}),e.jsx(i,{label:"Bentley Purple",icon:e.jsxs("svg",{"aria-hidden":"true",viewBox:"0 0 24 24",children:[e.jsx("path",{d:"m12 0a8.12188 8.12188 0 0 0 -8.18182 7.95c0 1.8 1.235 4.65 3.55066 8.85 1.698 3 4.6311 7.2 4.6311 7.2s2.93308-4.35 4.63122-7.35c2.31571-4.2 3.55066-7.05 3.55066-8.85a8.09618 8.09618 0 0 0 -8.18188-7.8z",fill:"#fff"}),e.jsx("path",{d:"m12 1.10962a7.05246 7.05246 0 0 0 -7.0722 6.84038c0 1.88313 1.8238 5.43244 3.41275 8.31426 1.06435 1.88039 2.649 4.27827 3.64493 5.75084.99723-1.518 2.60183-4.00688 3.68-5.91171 1.58292-2.87099 3.40672-6.42031 3.40672-8.30339a6.98162 6.98162 0 0 0 -7.0722-6.69038zm.002 9.79947a3.27273 3.27273 0 1 1 3.27272-3.27273 3.27268 3.27268 0 0 1 -3.27272 3.27273z",fill:"#A3779F"})]}),disabled:!0,name:"map",value:"Bentley Purple"})]});typeof window<"u"&&window.document&&window.document.createElement&&document.documentElement.setAttribute("data-storyloaded","");export{X as Colored,U as Monochrome,Q as default};
