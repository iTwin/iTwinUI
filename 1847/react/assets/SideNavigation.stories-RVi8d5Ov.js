import{r as t,I as H,B as l,c as v,T as C,j as e,R as S}from"./index-7nKTUIFH.js";import{S as T}from"./Placeholder-7mbqDT_L.js";import{S as E}from"./Settings-pXo22lBu.js";import{W as D}from"./WithCSSTransition-3ezKwEmA.js";import{S as O}from"./SvgChevronRight-yTtxq0rE.js";import{B as M}from"./Button-SkKWRAMc.js";import{T as N}from"./Text-dwRXb7IN.js";import{A as _}from"./Anchor-WKNNzcbu.js";const w=t.forwardRef((s,i)=>{const{items:c,secondaryItems:n,expanderPlacement:a="top",className:d,isExpanded:u=!1,onExpanderClick:o,submenu:g,isSubmenuOpen:x=!1,wrapperProps:r,contentProps:h,topProps:f,bottomProps:j,...B}=s,[b,A]=t.useState(u);t.useEffect(()=>{A(u)},[u]);const y=t.createElement(H,{label:"Toggle icon labels","aria-expanded":b,className:"iui-sidenav-button iui-expand",onClick:t.useCallback(()=>{A(m=>!m),o==null||o()},[o])},t.createElement(O,null));return t.createElement(l,{...r,className:v("iui-side-navigation-wrapper",r==null?void 0:r.className),ref:i},t.createElement(l,{as:"div",className:v("iui-side-navigation",{"iui-expanded":b,"iui-collapsed":!b},d),...B},a==="top"&&y,t.createElement(l,{as:"div",...h,className:v("iui-sidenav-content",h==null?void 0:h.className)},t.createElement(l,{as:"div",...f,className:v("iui-top",f==null?void 0:f.className)},c.map((m,I)=>b?m:t.createElement(C,{content:m.props.children,placement:"right",key:I},m))),t.createElement(l,{as:"div",...j,className:v("iui-bottom",j==null?void 0:j.className)},n==null?void 0:n.map((m,I)=>b?m:t.createElement(C,{content:m.props.children,placement:"right",key:I},m)))),a==="bottom"&&y),g&&t.createElement(D,{in:x,dimension:"width",timeout:200,classNames:"iui"},g))}),p=t.forwardRef((s,i)=>{const{className:c,children:n,isActive:a=!1,disabled:d=!1,isSubmenuOpen:u=!1,...o}=s;return t.createElement(M,{className:v("iui-sidenav-button",{"iui-submenu-open":u},c),"data-iui-active":a,size:"large",disabled:d,ref:i,...o},n)}),F=t.forwardRef((s,i)=>{const{children:c,className:n,...a}=s;return t.createElement(l,{className:v("iui-side-navigation-submenu",n),ref:i,...a},t.createElement(l,{className:"iui-side-navigation-submenu-content"},c))}),V=t.forwardRef((s,i)=>{const{children:c,actions:n,className:a,...d}=s;return t.createElement(l,{className:v("iui-side-navigation-submenu-header",a),ref:i,...d},t.createElement(l,{className:"iui-side-navigation-submenu-header-label"},c),n&&t.createElement(l,{className:"iui-side-navigation-submenu-header-actions"},n))}),R=s=>t.createElement("svg",{viewBox:"0 0 16 16",width:"1rem",height:"1rem",fill:"var(--iui-color-icon-muted, currentColor)",...s},t.createElement("path",{d:"M5.472 15.978a.616.616 0 01-.756-.466L1.521 2.845a.66.66 0 01.437-.803.615.615 0 01.755.465l3.194 12.667a.662.662 0 01-.435.804zm7.159-8.09a6.694 6.694 0 01-1.834.183c-.602-.009-1.197-.05-1.8-.057a6.743 6.743 0 00-1.831.184 3.595 3.595 0 00-1.871 1.156l-.592-2.345-.516-2.043c-.175-.699-.365-1.446-.59-2.344a3.6 3.6 0 011.87-1.157 6.645 6.645 0 011.834-.18c.601.006 1.196.047 1.798.053a6.608 6.608 0 001.833-.181A3.606 3.606 0 0012.803 0l.592 2.343c.175.699.34 1.347.516 2.044l.589 2.346a3.616 3.616 0 01-1.87 1.156z",fillRule:"evenodd"})),k=s=>t.createElement("svg",{viewBox:"0 0 16 16",width:"1rem",height:"1rem",fill:"var(--iui-color-icon-muted, currentColor)",...s},t.createElement("path",{d:"M3.07 7h12.19a.7.7 0 01.68 1l-1.66 5a1.53 1.53 0 01-1.35 1H.74a.7.7 0 01-.68-1l1.66-5a1.53 1.53 0 011.35-1z"}),t.createElement("path",{d:"M.77 7.68A2.54 2.54 0 013.07 6H14V5a1 1 0 00-1-1H6V3a1 1 0 00-1-1H1a1 1 0 00-1 1v7z"})),z=s=>t.createElement("svg",{viewBox:"0 0 16 16",width:"1rem",height:"1rem",fill:"var(--iui-color-icon-muted, currentColor)",...s},t.createElement("path",{d:"M2 14.6s0 .4.3.4H7v-4h2v4h4.5c.5 0 .5-.4.5-.4V8.5L8 4 2 8.5zm12-9.3V2h-2v1.8L8 1 0 6.7 1 8l7-5 7 5 1-1.3z"})),U={decorators:[s=>e.jsx("div",{style:{height:"calc(100vh - 24px)"},children:e.jsx(s,{})})],title:"SideNavigation"},X=()=>e.jsx(w,{items:[e.jsx(p,{startIcon:e.jsx(z,{}),children:"Home"},0),e.jsx(p,{startIcon:e.jsx(R,{}),children:"Issues"},1),e.jsx(p,{startIcon:e.jsx(k,{}),disabled:!0,children:"Documents"},2)],secondaryItems:[e.jsx(p,{startIcon:e.jsx(E,{}),children:"Settings"},3)]}),Y=()=>{const[s,i]=S.useState(0),c=[...Array(3).fill(null)].map((n,a)=>e.jsx(p,{startIcon:e.jsx(T,{}),isActive:s===a,onClick:()=>i(a),children:`App ${a}`},a));return e.jsx(w,{items:c,secondaryItems:[e.jsx(p,{startIcon:e.jsx(E,{}),children:"Settings"},3)]})},Z=()=>{var g;const s=[{label:"Home",icon:e.jsx(z,{})},{label:"Issues",icon:e.jsx(R,{})},{label:"Documents",icon:e.jsx(k,{})},{label:"Settings",icon:e.jsx(E,{})}],[i,c]=S.useState(2),[n,a]=S.useState(!0),[d,u]=S.useState(0),o=s.map(({label:x,icon:r},h)=>e.jsx(p,{startIcon:r,isActive:i===h,isSubmenuOpen:x==="Documents"&&n,onClick:()=>{x!=="Documents"?(c(h),u(-1),a(!1)):a(f=>!f)},children:x},h));return e.jsxs("div",{style:{display:"flex",height:"100%"},children:[e.jsx(w,{expanderPlacement:"bottom",items:o.slice(0,3),secondaryItems:[o[3]],isSubmenuOpen:n,submenu:e.jsxs(F,{children:[e.jsx(V,{actions:e.jsx(H,{styleType:"borderless",children:e.jsx(E,{})}),children:e.jsx("span",{children:"Documents"})}),e.jsx(N,{variant:"leading",children:"All documents"}),e.jsx("ul",{children:[...Array(10).fill(null)].map((x,r)=>e.jsx("li",{children:e.jsxs(_,{onClick:()=>{c(2),u(r)},children:["Folder ",r]})},r))})]})}),e.jsxs("div",{style:{background:"var(--iui-color-background-disabled)",padding:16,flexGrow:1,display:"grid",placeContent:"center",placeItems:"center"},children:[e.jsxs(N,{children:[(g=s[i])==null?void 0:g.label," page"]}),e.jsx(N,{isMuted:!0,children:d>=0&&`Contents of Folder ${d}`})]})]})};typeof window<"u"&&window.document&&window.document.createElement&&document.documentElement.setAttribute("data-storyloaded","");export{Y as ActiveItem,X as Basic,Z as Submenu,U as default};
