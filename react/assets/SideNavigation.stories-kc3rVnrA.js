import{r as t,x as D,I as w,B as c,c as v,L as T,M as k,T as M,j as e,R as j}from"./index-XUT_GY6Q.js";import{S as O}from"./Placeholder-DY-f9XKk.js";import{S}from"./Settings-OQ_HAjcV.js";import{S as F}from"./SvgChevronRight-BvM7J9eV.js";import{B as L}from"./Button-D-GKNtcT.js";import{T as E}from"./Text-CHSLHMAk.js";import{A as V}from"./Anchor-BTrB-bLC.js";import"./ProgressRadial-Cxuog119.js";const A=t.createContext(void 0),I=t.forwardRef((a,i)=>{let{items:l,secondaryItems:n,expanderPlacement:s="top",className:m,isExpanded:p,onExpanderClick:o,submenu:x,isSubmenuOpen:d=!1,wrapperProps:r,contentProps:u,topProps:g,bottomProps:b,...R}=a,[f,N]=D(!1,p),y=t.createElement(w,{label:"Toggle icon labels","aria-expanded":f,className:"iui-sidenav-button iui-expand",size:"small",onClick:t.useCallback(()=>{N(z=>!z),o==null||o()},[o,N])},t.createElement(F,null));return t.createElement(A.Provider,{value:f},t.createElement(c,{as:"nav",...r,className:v("iui-side-navigation-wrapper",r==null?void 0:r.className),ref:i},t.createElement(T,{delay:k},t.createElement(c,{className:v("iui-side-navigation",{"iui-expanded":f,"iui-collapsed":!f},m),...R},s==="top"&&y,t.createElement(c,{as:"div",...u,className:v("iui-sidenav-content",u==null?void 0:u.className)},t.createElement(c,{as:"div",...g,className:v("iui-top",g==null?void 0:g.className)},l),t.createElement(c,{as:"div",...b,className:v("iui-bottom",b==null?void 0:b.className)},n)),s==="bottom"&&y)),x&&d?x:null))}),h=t.forwardRef((a,i)=>{let{className:l,children:n,isActive:s=!1,disabled:m=!1,isSubmenuOpen:p=!1,...o}=a,x=t.useContext(A)===!0,d=t.createElement(L,{className:v("iui-sidenav-button",{"iui-submenu-open":p},l),"data-iui-active":s,size:"large",disabled:m,ref:i,...o},n);return x?d:t.createElement(M,{content:n,placement:"right",ariaStrategy:"none"},d)}),_=t.forwardRef((a,i)=>{let{children:l,className:n,...s}=a;return t.createElement(c,{className:v("iui-side-navigation-submenu",n),ref:i,...s},t.createElement(c,{className:"iui-side-navigation-submenu-content"},l))}),G=t.forwardRef((a,i)=>{let{children:l,actions:n,className:s,...m}=a;return t.createElement(c,{className:v("iui-side-navigation-submenu-header",s),ref:i,...m},t.createElement(c,{className:"iui-side-navigation-submenu-header-label"},l),n&&t.createElement(c,{className:"iui-side-navigation-submenu-header-actions"},n))}),C=a=>t.createElement("svg",{viewBox:"0 0 16 16",width:"1rem",height:"1rem",fill:"var(--iui-color-icon-muted, currentColor)",...a},t.createElement("path",{d:"M5.472 15.978a.616.616 0 01-.756-.466L1.521 2.845a.66.66 0 01.437-.803.615.615 0 01.755.465l3.194 12.667a.662.662 0 01-.435.804zm7.159-8.09a6.694 6.694 0 01-1.834.183c-.602-.009-1.197-.05-1.8-.057a6.743 6.743 0 00-1.831.184 3.595 3.595 0 00-1.871 1.156l-.592-2.345-.516-2.043c-.175-.699-.365-1.446-.59-2.344a3.6 3.6 0 011.87-1.157 6.645 6.645 0 011.834-.18c.601.006 1.196.047 1.798.053a6.608 6.608 0 001.833-.181A3.606 3.606 0 0012.803 0l.592 2.343c.175.699.34 1.347.516 2.044l.589 2.346a3.616 3.616 0 01-1.87 1.156z",fillRule:"evenodd"})),B=a=>t.createElement("svg",{viewBox:"0 0 16 16",width:"1rem",height:"1rem",fill:"var(--iui-color-icon-muted, currentColor)",...a},t.createElement("path",{d:"M3.07 7h12.19a.7.7 0 01.68 1l-1.66 5a1.53 1.53 0 01-1.35 1H.74a.7.7 0 01-.68-1l1.66-5a1.53 1.53 0 011.35-1z"}),t.createElement("path",{d:"M.77 7.68A2.54 2.54 0 013.07 6H14V5a1 1 0 00-1-1H6V3a1 1 0 00-1-1H1a1 1 0 00-1 1v7z"})),H=a=>t.createElement("svg",{viewBox:"0 0 16 16",width:"1rem",height:"1rem",fill:"var(--iui-color-icon-muted, currentColor)",...a},t.createElement("path",{d:"M2 14.6s0 .4.3.4H7v-4h2v4h4.5c.5 0 .5-.4.5-.4V8.5L8 4 2 8.5zm12-9.3V2h-2v1.8L8 1 0 6.7 1 8l7-5 7 5 1-1.3z"})),X={decorators:[a=>e.jsx("div",{style:{height:"calc(100vh - 24px)"},children:e.jsx(a,{})})],title:"SideNavigation"},Y=()=>e.jsx(I,{items:[e.jsx(h,{startIcon:e.jsx(H,{}),children:"Home"},0),e.jsx(h,{startIcon:e.jsx(C,{}),children:"Issues"},1),e.jsx(h,{startIcon:e.jsx(B,{}),disabled:!0,children:"Documents"},2)],secondaryItems:[e.jsx(h,{startIcon:e.jsx(S,{}),children:"Settings"},3)]}),Z=()=>{const[a,i]=j.useState(0),l=[...Array(3).fill(null)].map((n,s)=>e.jsx(h,{startIcon:e.jsx(O,{}),isActive:a===s,onClick:()=>i(s),children:`App ${s}`},s));return e.jsx(I,{items:l,secondaryItems:[e.jsx(h,{startIcon:e.jsx(S,{}),children:"Settings"},3)]})},ee=()=>{var x;const a=[{label:"Home",icon:e.jsx(H,{})},{label:"Issues",icon:e.jsx(C,{})},{label:"Documents",icon:e.jsx(B,{})},{label:"Settings",icon:e.jsx(S,{})}],[i,l]=j.useState(2),[n,s]=j.useState(!0),[m,p]=j.useState(0),o=a.map(({label:d,icon:r},u)=>e.jsx(h,{startIcon:r,isActive:i===u,isSubmenuOpen:d==="Documents"&&n,onClick:()=>{d!=="Documents"?(l(u),p(-1),s(!1)):s(g=>!g)},children:d},u));return e.jsxs("div",{style:{display:"flex",height:"100%"},children:[e.jsx(I,{expanderPlacement:"bottom",items:o.slice(0,3),secondaryItems:[o[3]],isSubmenuOpen:n,submenu:e.jsxs(_,{children:[e.jsx(G,{actions:e.jsx(w,{styleType:"borderless","aria-label":"Settings",children:e.jsx(S,{})}),children:e.jsx("span",{children:"Documents"})}),e.jsx(E,{variant:"leading",children:"All documents"}),e.jsx("ul",{children:[...Array(10).fill(null)].map((d,r)=>e.jsx("li",{children:e.jsxs(V,{onClick:()=>{l(2),p(r)},children:["Folder ",r]})},r))})]})}),e.jsxs("div",{style:{background:"var(--iui-color-background-disabled)",padding:16,flexGrow:1,display:"grid",placeContent:"center",placeItems:"center"},children:[e.jsxs(E,{children:[(x=a[i])==null?void 0:x.label," page"]}),e.jsx(E,{isMuted:!0,children:m>=0&&`Contents of Folder ${m}`})]})]})};typeof window<"u"&&window.document&&window.document.createElement&&document.documentElement.setAttribute("data-storyloaded","");export{Z as ActiveItem,Y as Basic,ee as Submenu,X as default};
