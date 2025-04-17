import{r as t,o as P,B as n,c as j,I as w,h as B,e as H,j as e}from"./index-XUT_GY6Q.js";import{S as C}from"./Network-DRVkemUL.js";import{S as U}from"./Notification-B6vaWwjz.js";import{D as f,M as x}from"./MenuItem-CIC1E0UF.js";import{A as I}from"./Avatar-BLqO1F9g.js";import{S as L}from"./SvgChevronRight-BvM7J9eV.js";import{S as R}from"./SvgCaretUpSmall-uWeO-lt8.js";import{S as A}from"./SvgCaretDownSmall-DFxyO1Ix.js";import{M as F}from"./MenuExtraContent-Lk1zQTfy.js";import{T as z}from"./Text-CHSLHMAk.js";import{S as D}from"./Select-Dq9LC7TV.js";import{M as O}from"./MenuDivider-C37aP6Hz.js";import{I as W}from"./Input-wWYMBibM.js";import{g as E}from"./colors-ymlpSE_k.js";import"./focusable--6qKiAi8.js";import"./ListItem-CsSWydpM.js";import"./LinkAction-DfK2EEEJ.js";import"./Tag-DRyxjaSc.js";import"./Icon-D5kTlebG.js";import"./List-BdAhYRi3.js";import"./SvgCheckmark-BeHhKOvt.js";const J=r=>t.createElement(P,r,t.createElement("path",{d:"m8 4a2 2 0 1 1 2-2 2 2 0 0 1 -2 2zm2 4a2 2 0 1 0 -2 2 2 2 0 0 0 2-2zm0 6a2 2 0 1 0 -2 2 2 2 0 0 0 2-2z"}));let Y={moreOptions:"More options"};const M=t.forwardRef((r,a)=>{let{appLogo:s,breadcrumbs:i,isSlim:o=!1,actions:c,menuItems:l,translatedStrings:m,className:u,children:h,...b}=r,g={...Y,...m};return t.createElement(n,{as:"header",className:j("iui-page-header",u),"data-iui-size":o?"slim":void 0,ref:a,...b},t.createElement(n,{className:"iui-page-header-left"},s,i&&t.createElement(n,{className:"iui-page-header-divider"}),i),h&&t.createElement(n,{className:"iui-page-header-center"},h),t.createElement(n,{className:"iui-page-header-right"},c,l&&t.createElement(f,{menuItems:l},t.createElement(w,{styleType:"borderless","aria-label":g.moreOptions},t.createElement(J,{"aria-hidden":!0})))))}),k=t.forwardRef((r,a)=>{let{className:s,items:i,...o}=r;return t.createElement(n,{as:"nav","aria-label":"breadcrumbs",className:j("iui-breadcrumbs","iui-header-breadcrumbs",s),ref:a,...o},t.createElement(n,{as:"ol",className:j("iui-breadcrumbs-list","iui-header-breadcrumbs-list")},i.reduce((c,l,m)=>[...c,l,m!==i.length-1&&t.createElement(n,{as:"li",className:"iui-breadcrumbs-separator",key:m},t.createElement(L,{key:`chevron${m}`,"aria-hidden":!0,className:"iui-chevron"}))],[])))}),T=t.forwardRef((r,a)=>{let{className:s,children:i,startIcon:o,endIcon:c,styleType:l,size:m,...u}=r;return t.createElement(B,{className:j("iui-header-breadcrumb-button",s),ref:a,...u},o,i,c)}),$=t.forwardRef((r,a)=>{let{menuItems:s,className:i,menuPlacement:o="bottom-end",children:c,disabled:l,...m}=r,[u,h]=t.useState(!1),[b,g]=t.useState(0),N=t.useRef(null);return t.useEffect(()=>{N.current&&g(N.current.offsetWidth)},[c]),t.createElement(n,{className:j("iui-header-breadcrumb-button-wrapper",i),ref:N},t.createElement(T,{ref:a,disabled:l,...m},c),t.createElement(f,{placement:o,menuItems:s,style:{minInlineSize:b},onVisibleChange:V=>h(V)},t.createElement(B,{"aria-label":"More",className:"iui-header-breadcrumb-button iui-header-breadcrumb-button-split",disabled:l},u?t.createElement(R,{className:"iui-header-breadcrumb-button-dropdown-icon","aria-hidden":!0}):t.createElement(A,{className:"iui-header-breadcrumb-button-dropdown-icon","aria-hidden":!0}))))}),_=t.forwardRef((r,a)=>{let{menuItems:s,children:i,...o}=r,[c,l]=t.useState(!1),[m,u]=t.useState(0),h=t.useRef(null),b=H(a,h);return t.useEffect(()=>{h.current&&u(h.current.offsetWidth)},[i]),t.createElement(f,{menuItems:s,style:{minInlineSize:m},onVisibleChange:g=>l(g)},t.createElement(T,{ref:b,"aria-label":"Dropdown",endIcon:c?t.createElement(R,{className:"iui-header-breadcrumb-button-dropdown-icon","aria-hidden":!0}):t.createElement(A,{className:"iui-header-breadcrumb-button-dropdown-icon","aria-hidden":!0}),...o},i))}),d=t.forwardRef((r,a)=>{let{name:s,description:i,htmlName:o,isActive:c=!1,startIcon:l,menuItems:m,disabled:u,...h}=r,b={startIcon:l?t.createElement(n,{as:"span",className:"iui-header-breadcrumb-button-icon","aria-hidden":!0},l):null,children:t.createElement(n,{as:"span",className:"iui-header-breadcrumb-button-text"},t.createElement(n,{as:"span",className:"iui-header-breadcrumb-button-text-label"},s),i&&t.createElement(n,{as:"span",className:"iui-header-breadcrumb-button-text-sublabel"},i)),ref:a,disabled:u,name:o,...!!m&&{menuItems:m},...h},g=r.menuItems&&r.onClick?t.createElement($,b):r.menuItems?t.createElement(_,b):t.createElement(T,b);return t.createElement(n,{as:"li",className:"iui-header-breadcrumb-item","aria-current":c?"location":void 0,"aria-disabled":u?"true":void 0},g)}),S=t.forwardRef((r,a)=>{let{className:s,children:i,logo:o,onClick:c,as:l=c?"button":"div",...m}=r;return t.createElement(n,{className:j("iui-header-brand",s),as:l,type:l==="button"?"button":void 0,onClick:c,ref:a,...m},o?t.createElement(n,{as:"span",className:"iui-header-brand-icon","aria-hidden":!0},o):null,i&&t.createElement(n,{as:"span",className:"iui-header-brand-label"},i))}),q=r=>t.createElement("svg",{viewBox:"0 0 16 16",width:"1rem",height:"1rem",fill:"var(--iui-color-icon-muted, currentColor)",...r},t.createElement("path",{d:"M10.015 6.346a2.52 2.52 0 01-.93 1.79 1.991 1.991 0 00-.79 1.5h-1.11a2.921 2.921 0 011.12-2.29c.787-.677.621-1.96-.38-1.96-.633.022-.74.696-.74 1.28h-1.2a2.868 2.868 0 01.68-2.09 2.041 2.041 0 013.35 1.77zm-1.52 4.805a.745.745 0 11-.745-.745.745.745 0 01.745.745zM8 1.501A6.499 6.499 0 111.501 8 6.506 6.506 0 018 1.501m0-1.5A7.999 7.999 0 1015.999 8 7.999 7.999 0 008 .001z"})),G=r=>t.createElement("svg",{viewBox:"0 0 16 16",width:"1rem",height:"1rem",fill:"var(--iui-color-icon-muted, currentColor)",...r},t.createElement("path",{d:"M14.025 3.253l-5-2.974a2.023 2.023 0 00-2.05 0l-5 2.974A1.994 1.994 0 001 4.963v6.073a2.025 2.025 0 00.975 1.71l5 2.975a2.023 2.023 0 002.05 0l5-2.974a1.994 1.994 0 00.975-1.71V4.938a1.953 1.953 0 00-.975-1.686zM8 3.25a1.063 1.063 0 11-1.063 1.063A1.063 1.063 0 018 3.25zm3 9.19a.25.25 0 01-.122.214l-2.725 1.623a.25.25 0 01-.255 0L5.123 12.64A.25.25 0 015 12.424v-1.441a.25.25 0 01.378-.215L7 11.667v-3.43l-.878-.56A.25.25 0 016 7.462V6.016a.25.25 0 01.378-.214l2.5 1.383A.25.25 0 019 7.399v4.268l1.622-.899a.25.25 0 01.378.215z"})),y=r=>t.createElement("svg",{viewBox:"0 0 16 16",width:"1rem",height:"1rem",fill:"var(--iui-color-icon-muted, currentColor)",...r},t.createElement("path",{d:"M10.5 0a3.905 3.905 0 00-1.466 3.051c0 .097.007.192.014.287L6.8 5.586a4.806 4.806 0 00-4.773 1.601l2.942 2.941L0 15.097V16h.903l4.969-4.969 2.94 2.941A4.806 4.806 0 0010.415 9.2l2.248-2.248c.095.007.19.014.287.014A3.905 3.905 0 0016 5.501z"})),je={title:"Header"},v=(r,a)=>s=>{console.log(`Menu '${r}', ${s} clicked!`),a()},p=r=>a=>[e.jsxs(x,{value:"Item #1",onClick:v(r,a),children:[r," item #1"]},1),e.jsxs(x,{value:"Item #2",onClick:v(r,a),children:[r," item #2"]},2),e.jsxs(x,{value:"Item #3",onClick:v(r,a),children:[r," item #3"]},3)],xe=()=>{const[r,a]=t.useState("User"),s=i=>[e.jsx(F,{children:e.jsxs(e.Fragment,{children:[e.jsx(z,{variant:"leading",children:"Terry Rivers"}),e.jsx(z,{isMuted:!0,style:{marginBottom:8},children:"terry.rivers@email.com"}),e.jsx(D,{options:[{value:"User",label:"User"},{value:"Moderator",label:"Moderator"},{value:"Administrator",label:"Administrator"}],value:r,onChange:o=>a(o)})]})},0),e.jsx(O,{},1),e.jsx(x,{value:"View profile",onClick:v("Avatar",i),children:"View profile"},2),e.jsx(x,{value:"Sign out",onClick:v("Avatar",i),children:"Sign out"},3)];return e.jsx(M,{appLogo:e.jsx(S,{logo:e.jsx("svg",{viewBox:"0 0 16 16",xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true",children:e.jsx("path",{d:"m12.6 13.4c-1.2-1.5-2.1-3.1-2.4-5.5-2.7 3.9-4.6 4.2-5.7 2.4l-1.2 5.7h-2.2l3.5-14.1 1.8-.4c-.1.5-1.4 6.2.6 7 2 .7 4.6-8.5 4.6-8.5l2.2.4c-1.6 3.7-1.6 7.6 1.1 10.9l-2.3 2.1"})}),onClick:()=>console.log("Clicked on the title"),children:"Microstation"}),breadcrumbs:e.jsx(k,{items:[e.jsx(d,{onClick:()=>console.log("Clicked on the Project"),menuItems:p("Project"),name:"Project A (Super Size Edition)",description:"YJC-2249",startIcon:e.jsx(C,{}),disabled:!0},"project"),e.jsx(d,{onClick:()=>console.log("Clicked on the iModel"),menuItems:p("iModel"),name:"iModel B",startIcon:e.jsx("img",{src:"https://itwinplatformcdn.azureedge.net/iTwinUI/stadium.png",style:{objectFit:"cover"}}),isActive:!0},"iModel"),e.jsx(d,{name:"Version C",onClick:()=>console.log("Clicked on the Version"),startIcon:e.jsx(y,{})},"version")]}),actions:[e.jsx(w,{onClick:()=>console.log("Clicked on the notification bell"),styleType:"borderless","aria-label":"Notifications",children:e.jsx(U,{})},"notif"),e.jsx(f,{menuItems:p("Help"),children:e.jsx(w,{styleType:"borderless","aria-label":"Help",children:e.jsx(q,{})})},"help"),e.jsx(f,{menuItems:s,children:e.jsx(w,{styleType:"borderless","aria-label":"User",children:e.jsx(I,{size:"medium",abbreviation:"TR",backgroundColor:E("Terry Rivers"),image:e.jsx("img",{src:"https://itwinplatformcdn.azureedge.net/iTwinUI/user-placeholder.png"}),title:"Terry Rivers"})})},"avatar")],menuItems:p("More")})},ve=()=>e.jsx(M,{appLogo:e.jsx(S,{logo:e.jsx("svg",{viewBox:"0 0 16 16",xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true",children:e.jsx("path",{d:"m12.6 13.4c-1.2-1.5-2.1-3.1-2.4-5.5-2.7 3.9-4.6 4.2-5.7 2.4l-1.2 5.7h-2.2l3.5-14.1 1.8-.4c-.1.5-1.4 6.2.6 7 2 .7 4.6-8.5 4.6-8.5l2.2.4c-1.6 3.7-1.6 7.6 1.1 10.9l-2.3 2.1"})})}),breadcrumbs:e.jsx(k,{items:[e.jsx(d,{name:"Project A (Super Size Edition)",description:"YJC-2249",startIcon:e.jsx(C,{}),onClick:()=>console.log("Clicked on the Project"),menuItems:p("Project")},"project"),e.jsx(d,{name:"iModel B",startIcon:e.jsx("img",{src:"https://itwinplatformcdn.azureedge.net/iTwinUI/stadium.png",style:{objectFit:"cover"}}),onClick:()=>console.log("Clicked on the iModel")},"iModel"),e.jsx(d,{name:"Version C",menuItems:p("Version"),startIcon:e.jsx(y,{}),isActive:!0},"version")]}),actions:[e.jsx(I,{size:"medium",abbreviation:"TR",backgroundColor:E("Terry Rivers"),title:"Terry Rivers"},"avatar")]}),fe=()=>e.jsx(M,{isSlim:!0,appLogo:e.jsx(S,{logo:e.jsx("svg",{viewBox:"0 0 16 16",xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true",children:e.jsx("path",{d:"m12.6 13.4c-1.2-1.5-2.1-3.1-2.4-5.5-2.7 3.9-4.6 4.2-5.7 2.4l-1.2 5.7h-2.2l3.5-14.1 1.8-.4c-.1.5-1.4 6.2.6 7 2 .7 4.6-8.5 4.6-8.5l2.2.4c-1.6 3.7-1.6 7.6 1.1 10.9l-2.3 2.1"})})}),breadcrumbs:e.jsx(k,{items:[e.jsx(d,{name:"Project A (Super Size Edition)",description:"YJC-2249",startIcon:e.jsx(C,{}),onClick:()=>console.log("Clicked on the Project"),menuItems:p("Project")},"project"),e.jsx(d,{name:"iModel B",startIcon:e.jsx("img",{src:"https://itwinplatformcdn.azureedge.net/iTwinUI/stadium.png",style:{objectFit:"cover"}}),onClick:()=>console.log("Clicked on the iModel")},"iModel"),e.jsx(d,{name:"Version C",menuItems:p("Version"),startIcon:e.jsx(y,{}),isActive:!0},"version")]}),actions:[e.jsx(I,{size:"medium",abbreviation:"TR",backgroundColor:E("Terry Rivers"),title:"Terry Rivers"},"avatar")]}),we=()=>{const r=e.jsxs(e.Fragment,{children:[e.jsxs("style",{children:[".center-input { border-radius: 22px; width: 20vw; transition: all 0.2s ease }",".iui-slim .iui-center { align-items: unset }",".iui-slim .center-input { min-height: unset }","@media (max-width: 768px) { .center-input { display: none; } }"]}),e.jsx(W,{className:"center-input",placeholder:"Search within Model B..."})]});return e.jsx(M,{appLogo:e.jsx(S,{logo:e.jsx(G,{})}),breadcrumbs:e.jsx(k,{items:[e.jsx(d,{name:"Project A",description:"YJC-2249",startIcon:e.jsx(C,{}),onClick:()=>console.log("Clicked on the Project"),menuItems:p("Project")},"project"),e.jsx(d,{name:"iModel B",startIcon:e.jsx("img",{src:"https://itwinplatformcdn.azureedge.net/iTwinUI/stadium.png",style:{objectFit:"cover"}}),onClick:()=>console.log("Clicked on the iModel")},"iModel"),e.jsx(d,{name:"Version C",onClick:()=>console.log("Clicked on the Version"),startIcon:e.jsx(y,{}),isActive:!0},"version")]}),actions:[e.jsx(I,{size:"medium",abbreviation:"TR",backgroundColor:E("Terry Rivers"),title:"Terry Rivers"},"avatar")],menuItems:p("More"),children:r})};typeof window<"u"&&window.document&&window.document.createElement&&document.documentElement.setAttribute("data-storyloaded","");export{ve as Basic,we as CenterContent,xe as Full,fe as Slim,je as default};
