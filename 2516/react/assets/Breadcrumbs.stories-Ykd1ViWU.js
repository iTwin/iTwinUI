import{r as n,B as u,c as f,O as x,j as t,I as g}from"./index-BAgVnTda.js";import{S as C}from"./ChevronRightDouble-E9q10hDy.js";import{S as E}from"./Folder-CqPTE9Kf.js";import{S as I}from"./More-DOPxLhSi.js";import{B as j}from"./Button-v7nEu5l9.js";import{A as k}from"./Anchor-BfW_WZJA.js";import{S as y}from"./SvgChevronRight-D7BkVDBT.js";import{D as B,M as v}from"./MenuItem-DOh8G226.js";import{D as R}from"./DropdownButton-DzjFYjHJ.js";import{I as S}from"./Input-CK9ITZWj.js";import{T as p}from"./Text-CqWhmKgX.js";import"./ProgressRadial-ZHbnH1bE.js";import"./focusable-BeF9GqU2.js";import"./ListItem-BqgD2pwJ.js";import"./LinkAction-CzZsc9sI.js";import"./SvgCaretUpSmall-BlkGkd44.js";import"./SvgCaretDownSmall-CYz8vMwi.js";let A=n.forwardRef((r,s)=>{let{children:e,currentIndex:d=n.Children.count(e)-1,separator:o,overflowButton:a,className:i,...m}=r,c=n.useMemo(()=>n.Children.toArray(e),[e]);return n.createElement(u,{as:"nav",className:f("iui-breadcrumbs",i),ref:s,"aria-label":"Breadcrumb",...m},n.createElement(x,{as:"ol",itemsCount:c.length,className:"iui-breadcrumbs-list"},n.createElement(M,{currentIndex:d,overflowButton:a,separator:o},c)))}),M=r=>{let{children:s,currentIndex:e,overflowButton:d,separator:o}=r,{visibleCount:a}=x.useContext();return n.createElement(n.Fragment,null,a>1&&n.createElement(n.Fragment,null,n.createElement(b,{item:s[0],isActive:e===0}),n.createElement(h,{separator:o})),s.length-a>0&&n.createElement(n.Fragment,null,n.createElement(u,{as:"li",className:"iui-breadcrumbs-item"},d?d(a):n.createElement(u,{as:"span",className:"iui-breadcrumbs-content"},"…")),n.createElement(h,{separator:o})),s.slice(a>1?s.length-a+1:s.length-1).map((i,m)=>{let c=a>1?1+(s.length-a)+m:s.length-1;return n.createElement(n.Fragment,{key:c},n.createElement(b,{item:s[c],isActive:e===c}),c<s.length-1&&n.createElement(h,{separator:o}))}))},b=({item:r,isActive:s})=>{let e=r;return((e==null?void 0:e.type)==="span"||(e==null?void 0:e.type)==="a"||(e==null?void 0:e.type)===j)&&(e=n.createElement(w,e.props)),n.createElement(u,{as:"li",className:"iui-breadcrumbs-item"},e&&n.cloneElement(e,{"aria-current":e.props["aria-current"]??s?"location":void 0}))},h=({separator:r})=>n.createElement(u,{as:"li",className:"iui-breadcrumbs-separator","aria-hidden":!0},r??n.createElement(y,null)),w=n.forwardRef((r,s)=>{let{as:e,...d}=r,o={...d,className:f("iui-breadcrumbs-content",r.className),ref:s};return String(e)==="span"||r.href==null&&r.onClick==null&&e==null?n.createElement(u,{as:"span",...o}):n.createElement(j,{as:e==="a"||e==null&&r.href?k:e,styleType:"borderless",...o})});const l=Object.assign(A,{Item:w}),Y={title:"Breadcrumbs"},Z=()=>t.jsxs(l,{children:[t.jsx(l.Item,{onClick:()=>console.log("Root"),children:"Root"},0),t.jsx(l.Item,{onClick:()=>console.log("Item 1"),children:"Item 1"},1),t.jsx(l.Item,{onClick:()=>console.log("Item 2"),children:"Item 2"},2)]}),ee=()=>t.jsxs(l,{children:[t.jsx(l.Item,{href:"/",children:"iTwinUI"},0),t.jsx(l.Item,{href:"/?path=/docs/core-breadcrumbs",children:"Breadcrumbs"},1),t.jsx(l.Item,{children:"Links"},2)]}),te=()=>t.jsxs(l,{separator:t.jsx(C,{}),children:[t.jsx(l.Item,{onClick:()=>console.log("Root"),children:"Root"},0),t.jsx(l.Item,{onClick:()=>console.log("Item 1"),children:"Item 1"},1),t.jsx(l.Item,{onClick:()=>console.log("Item 2"),children:"Item 2"},2)]}),N=()=>{const r=Array(10).fill(null).map((s,e)=>t.jsxs(l.Item,{onClick:()=>console.log(`Clicked on breadcrumb ${e+1}`),children:["Item ",e]},e));return t.jsx(l,{children:r})};N.decorators=[r=>t.jsxs(t.Fragment,{children:[t.jsx(p,{variant:"small",as:"small",isMuted:!0,children:"Resize the container to see overflow behavior."}),t.jsx("div",{style:{width:"min(30rem, 100%)",border:"1px solid lightpink",padding:8,resize:"inline",overflow:"hidden"},children:t.jsx(r,{})})]})];const F=()=>{const r=Array(10).fill(null).map((s,e)=>t.jsxs(l.Item,{onClick:()=>console.log(`Clicked on breadcrumb ${e+1}`),children:["Item ",e]},e));return t.jsx(l,{overflowButton:s=>{const e=s>1?r.length-s:r.length-2;return t.jsx(g,{"aria-label":`Item ${e}`,onClick:()=>{console.log(`Visit breadcrumb ${e}`)},styleType:"borderless",label:`Item ${e}`,labelProps:{placement:"bottom"},children:t.jsx(I,{})})},children:r})};F.decorators=[r=>t.jsxs(t.Fragment,{children:[t.jsx(p,{variant:"small",as:"small",isMuted:!0,children:"Resize the container to see overflow behavior."}),t.jsx("div",{style:{width:"min(30rem, 100%)",border:"1px solid lightpink",padding:8,resize:"inline",overflow:"hidden"},children:t.jsx(r,{})})]})];const $=()=>{const r=Array(10).fill(null).map((s,e)=>t.jsxs(l.Item,{onClick:()=>console.log(`Clicked on breadcrumb ${e+1}`),children:["Item ",e]},e));return t.jsx(l,{overflowButton:s=>t.jsx(B,{menuItems:e=>Array(r.length-s).fill(null).map((d,o)=>{const a=s>1?o+1:o,i=()=>{console.log(`Visit breadcrumb ${a}`),e()};return t.jsxs(v,{onClick:i,children:["Item ",a]},a)}),children:t.jsx(g,{"aria-label":"Dropdown with more breadcrumbs",onClick:()=>console.log("Clicked on overflow icon"),styleType:"borderless",children:t.jsx(I,{})})}),children:r})};$.decorators=[r=>t.jsxs(t.Fragment,{children:[t.jsx(p,{variant:"small",as:"small",isMuted:!0,children:"Resize the container to see overflow behavior."}),t.jsx("div",{style:{width:"min(30rem, 100%)",border:"1px solid lightpink",padding:8,resize:"inline",overflow:"hidden"},children:t.jsx(r,{})})]})];const re=()=>{const r=n.useMemo(()=>["Root","Level 1","Level 2","Level 3","Level 4"],[]),[s,e]=n.useState(r.length-1),[d,o]=n.useState(!1),a=n.useMemo(()=>r.slice(0,s+1).map((i,m)=>t.jsx(l.Item,{onClick:()=>{s!==m?e(m):o(!0)},children:i},`Breadcrumb${m}`)),[r,s]);return t.jsxs("div",{style:{display:"inline-flex",width:450},children:[t.jsx(R,{startIcon:t.jsx(E,{"aria-hidden":!0}),styleType:"borderless",menuItems:i=>r.map((m,c)=>t.jsx(v,{onClick:()=>{e(c),o(!1),i()},children:m},`Item${c}`))}),d?t.jsx(S,{defaultValue:r.slice(0,s+1).join("/"),onChange:({target:{value:i}})=>{const m=i.substring(i.lastIndexOf("/",i.length-2)+1);e(r.findIndex(c=>m.includes(c)))},onKeyDown:({key:i})=>i==="Enter"&&o(!1),onBlur:()=>o(!1)}):t.jsx(l,{children:a})]})};typeof window<"u"&&window.document&&window.document.createElement&&document.documentElement.setAttribute("data-storyloaded","");export{Z as Basic,F as CustomOverflowBackButton,$ as CustomOverflowDropdown,te as CustomSeparator,re as FolderNavigation,ee as Links,N as Overflow,Y as default};
