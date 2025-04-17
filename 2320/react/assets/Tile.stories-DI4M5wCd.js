import{r as t,o as B,B as T,c as f,u as y,p,I as L,S as Y,j as e}from"./index-eRKR2_i9.js";import{S as Z}from"./Folder-CGz49nMc.js";import{S as ee}from"./Star-0irPJQh6.js";import{D as ie}from"./DropdownMenu-DW8feAhc.js";import{P as te}from"./ProgressRadial-CYS63bnL.js";import{a as ne}from"./LinkAction-DLw8hUK6.js";import{s as le}from"./supports-BbjPs9FA.js";import{S as ae}from"./SvgCheckmark-CmLjVUwT.js";import{B as k}from"./Badge-Dt0asdFp.js";import{M as o}from"./MenuItem-CzbLWaei.js";import{T as C}from"./TagContainer-DEeGdGmm.js";import{T as j}from"./Tag-CyoW8mgM.js";import{B as I}from"./Button-R3u_XTwo.js";import{A as re}from"./Avatar-B9u7AdUr.js";import{g as se}from"./colors-ymlpSE_k.js";import"./focusable-BGV6RSQB.js";import"./ListItem-CmyNi33N.js";const ce=n=>t.createElement(B,n,t.createElement("path",{d:"m4 8a2 2 0 1 1 -2-2 2 2 0 0 1 2 2zm4-2a2 2 0 1 0 2 2 2 2 0 0 0 -2-2zm6 0a2 2 0 1 0 2 2 2 2 0 0 0 -2-2z"})),oe=n=>t.createElement(B,n,t.createElement("path",{d:"M8 5a1 1 0 0 1-1-1V1a1 1 0 0 1 2 0v3a1 1 0 0 1-1 1zM4.535 7a.997.997 0 0 1-.499-.134l-2.598-1.5a1 1 0 1 1 1-1.732l2.598 1.5A1 1 0 0 1 4.536 7zM1.94 12.5a1 1 0 0 1-.501-1.866l2.598-1.5a1 1 0 1 1 1 1.732l-2.598 1.5a.997.997 0 0 1-.499.134zM8 16a1 1 0 0 1-1-1v-3a1 1 0 0 1 2 0v3a1 1 0 0 1-1 1zm6.061-3.5a.995.995 0 0 1-.499-.134l-2.598-1.5a1 1 0 1 1 1-1.732l2.598 1.5a1 1 0 0 1-.5 1.866zM11.465 7a1 1 0 0 1-.501-1.866l2.598-1.5a1 1 0 1 1 1 1.732l-2.598 1.5a.995.995 0 0 1-.5.134z"}));let M=t.createContext(void 0),z=t.forwardRef((n,r)=>{let{className:a,status:l,variant:s,isNew:c,isSelected:m,isLoading:u,isDisabled:h,...x}=n,[d,b]=t.useState(!1),g=d;return t.createElement(M.Provider,{value:{status:l,variant:s,isNew:c,isSelected:m,isLoading:u,isActionable:g,isDisabled:h,setActionable:b}},t.createElement(T,{className:f("iui-tile",{"iui-folder":s==="folder","iui-new":c,"iui-selected":m,"iui-actionable":g,[`iui-${l}`]:!!l,"iui-loading":u},a),"aria-disabled":h,ref:r,...x}))}),D=t.forwardRef((n,r)=>{let{onClick:a,children:l,href:s,...c}=n,{setActionable:m,isDisabled:u}=y(M);return t.useEffect(()=>{le()||m(!0)},[m]),t.createElement(ne,{as:n.href?"a":"button",href:s,onClick:u?void 0:a,"aria-disabled":u,ref:r,...c},l)}),P=p.div("iui-tile-thumbnail"),E=t.forwardRef((n,r)=>{let{className:a,url:l,children:s,...c}=n;return l?t.createElement(T,{className:f("iui-tile-thumbnail-picture",a),style:{backgroundImage:typeof l=="string"?`url(${l})`:void 0},ref:r,...c}):t.createElement(T,{className:f("iui-thumbnail-icon",a),ref:r,...c},s)}),W=p.div("iui-tile-thumbnail-quick-action"),O=p.div("iui-tile-thumbnail-type-indicator"),de=t.forwardRef((n,r)=>{let{className:a,children:l,...s}=n;return t.createElement(L,{className:f("iui-tile-thumbnail-button",a),styleType:"borderless",size:"small",ref:r,...s},l)}),R=p.div("iui-tile-thumbnail-badge-container"),U=t.forwardRef((n,r)=>{let{className:a,children:l,name:s,...c}=n;return t.createElement(T,{className:f("iui-tile-name",a),ref:r,...c},l??s)}),V=t.forwardRef((n,r)=>{let{children:a,className:l,...s}=n,{status:c,isLoading:m,isSelected:u,isNew:h}=y(M),x=!!c&&Y[c],d;return x&&(d=t.createElement(x,{"aria-hidden":!0})),m&&(d=t.createElement(te,{size:"x-small","aria-hidden":!0,indeterminate:!0})),u&&(d=t.createElement(ae,{"aria-hidden":!0})),h&&(d=t.createElement(oe,{"aria-hidden":!0})),a||d?t.createElement(T,{className:f("iui-tile-status-icon",l),ref:r,...s},a??d):null}),F=p.span("iui-tile-name-label"),Q=p.div("iui-tile-content"),q=p.div("iui-tile-description"),H=p.div("iui-tile-metadata"),$=t.forwardRef((n,r)=>{let{className:a,children:l=[],buttonProps:s,...c}=n,[m,u]=t.useState(!1);return t.createElement(T,{className:f("iui-tile-more-options",{"iui-visible":m},a),ref:r,...c},t.createElement(ie,{onVisibleChange:u,menuItems:h=>l==null?void 0:l.map(x=>t.cloneElement(x,{onClick:d=>{var b,g;h(),(g=(b=x.props).onClick)==null||g.call(b,d)}}))},t.createElement(L,{styleType:"borderless",size:"small","aria-label":"More options",...s},t.createElement(ce,null))))}),_=p.div("iui-tile-buttons"),me=t.forwardRef((n,r)=>{let{name:a,description:l,status:s,isNew:c,isLoading:m,isSelected:u,thumbnail:h,badge:x,leftIcon:d,rightIcon:b,buttons:g,metadata:w,moreOptions:S,children:G,isActionable:J,isDisabled:A,onClick:K,...X}=n;return t.createElement(z,{ref:r,isNew:c,isSelected:u,isLoading:m,status:s,isDisabled:A,...X},t.createElement(U,null,(s||c||m||u)&&t.createElement(V,null),t.createElement(F,null,J?t.createElement(D,{onClick:A?void 0:K,"aria-disabled":A},a):a)),h&&t.createElement(P,null,typeof h!="string"?t.createElement(E,null,h):t.createElement(E,{url:h}),x&&t.createElement(R,null,x),d&&t.createElement(O,null,d),b&&t.createElement(W,null,b)),t.createElement(Q,null,l&&t.createElement(q,null,l),S&&t.createElement($,null,S),w&&t.createElement(H,null,w),G),g&&t.createElement(_,null,g))});const i=Object.assign(me,{Wrapper:z,ThumbnailArea:P,ThumbnailPicture:E,QuickAction:W,TypeIndicator:O,BadgeContainer:R,IconButton:de,Name:U,NameIcon:V,NameLabel:F,Action:D,ContentArea:Q,Description:q,Metadata:H,MoreOptions:$,Buttons:_}),N=n=>t.createElement("svg",{viewBox:"0 0 16 16",width:"1rem",height:"1rem",fill:"var(--iui-color-icon-muted, currentColor)",...n},t.createElement("path",{d:"M8 1a1.004 1.004 0 01.514.138l5.01 2.981a.951.951 0 01.476.82v6.097a1.004 1.004 0 01-.486.851l-5 2.975a1.023 1.023 0 01-1.028 0l-4.984-2.965a1.032 1.032 0 01-.502-.86V4.963a1.004 1.004 0 01.486-.851l5-2.975A1.004 1.004 0 018 1m0-1a2.006 2.006 0 00-1.025.28l-5 2.974A1.994 1.994 0 001 4.963v6.073a2.025 2.025 0 00.975 1.71l5 2.975a2.023 2.023 0 002.05 0l5-2.974a1.994 1.994 0 00.975-1.71V4.938a1.953 1.953 0 00-.975-1.686l-5-2.974A2.006 2.006 0 008 0zm0 3.25a1.063 1.063 0 11-1.063 1.063A1.063 1.063 0 018 3.25zm3 9.19a.25.25 0 01-.122.214l-2.725 1.623a.25.25 0 01-.255 0L5.123 12.64A.25.25 0 015 12.424v-1.441a.25.25 0 01.378-.215L7 11.667v-3.43l-.878-.56A.25.25 0 016 7.462V6.016a.25.25 0 01.378-.214l2.5 1.383A.25.25 0 019 7.399v4.268l1.622-.899a.25.25 0 01.378.215z"})),ue=n=>t.createElement("svg",{viewBox:"0 0 16 16",width:"1rem",height:"1rem",fill:"var(--iui-color-icon-muted, currentColor)",...n},t.createElement("path",{d:"M10 0a1.539 1.539 0 011.662 1.405q.004.048.005.095a2.182 2.182 0 01-2.167 2 1.575 1.575 0 01-1.667-1.667A2.047 2.047 0 0110 0M6.667 16c-.833 0-1.5-.5-.833-2.833l1-4C7 8.5 7 8.333 6.833 8.333c-.333-.167-1.5.333-2.167.833l-.333-.833c2-1.667 4.333-2.667 5.5-2.667.833 0 1 1 .5 2.667l-1.166 4.334c-.167.833-.167 1 .167 1a3.338 3.338 0 001.833-1l.5.667a9.615 9.615 0 01-5 2.666"})),v=n=>t.createElement("svg",{viewBox:"0 0 16 16",width:"1rem",height:"1rem",fill:"var(--iui-color-icon-muted, currentColor)",...n},t.createElement("path",{d:"M9 0L0 9l7 7 9-9V0zm3.5 5A1.5 1.5 0 1114 3.5 1.5 1.5 0 0112.5 5z"})),Se={title:"Tile"},Be=()=>e.jsxs(i.Wrapper,{children:[e.jsx(i.Name,{name:"Stadium"}),e.jsxs(i.ThumbnailArea,{children:[e.jsx(i.BadgeContainer,{children:e.jsx(k,{backgroundColor:"skyblue",children:"Badge"})}),e.jsx(i.ThumbnailPicture,{url:"https://itwinplatformcdn.azureedge.net/iTwinUI/stadium.png"})]}),e.jsxs(i.ContentArea,{children:[e.jsx(i.Description,{children:"National stadium in Singapore. Features landscape details and a metro station. This is the largest sample iModel."}),e.jsxs(i.MoreOptions,{children:[e.jsx(o,{onClick:()=>console.log("clicked item 1"),children:"Item 1"},1),e.jsx(o,{onClick:()=>console.log("clicked item 2"),children:"Item 2"},2)]}),e.jsxs(i.Metadata,{children:[e.jsx(v,{}),e.jsxs(C,{children:[e.jsx(j,{variant:"basic",children:"tag 1"}),e.jsx(j,{variant:"basic",children:"tag 2"})]})]})]})]}),ye=()=>e.jsxs(i.Wrapper,{isSelected:!0,children:[e.jsxs(i.Name,{children:[e.jsx(i.NameIcon,{}),e.jsx(i.NameLabel,{children:"Stadium"})]}),e.jsxs(i.ThumbnailArea,{children:[e.jsx(i.BadgeContainer,{children:e.jsx(k,{backgroundColor:"skyblue",children:"Badge"})}),e.jsx(i.ThumbnailPicture,{url:"https://itwinplatformcdn.azureedge.net/iTwinUI/stadium.png"}),e.jsx(i.TypeIndicator,{children:e.jsx(i.IconButton,{children:e.jsx(ee,{})})}),e.jsx(i.QuickAction,{children:e.jsx(i.IconButton,{children:e.jsx(ue,{})})})]}),e.jsxs(i.ContentArea,{children:[e.jsx(i.Description,{children:"National stadium in Singapore. Features landscape details and a metro station. This is the largest sample iModel."}),e.jsxs(i.MoreOptions,{children:[e.jsx(o,{onClick:()=>console.log("clicked item 1"),children:"Item 1"},1),e.jsx(o,{onClick:()=>console.log("clicked item 2"),children:"Item 2"},2)]}),e.jsxs(i.Metadata,{children:[e.jsx(v,{}),e.jsxs(C,{children:[e.jsx(j,{variant:"basic",children:"tag 1"}),e.jsx(j,{variant:"basic",children:"tag 2"})]})]})]}),e.jsxs(i.Buttons,{children:[e.jsx(I,{onClick:()=>console.log("clicked left button"),children:"Manage"},1),e.jsx(I,{onClick:()=>console.log("clicked right button"),children:"Projects"},2)]})]}),Le=()=>{const[n,r]=t.useState(!1);return e.jsxs(i.Wrapper,{isSelected:n,children:[e.jsxs(i.Name,{children:[e.jsx(i.NameIcon,{}),e.jsx(i.NameLabel,{children:e.jsx(i.Action,{onClick:()=>r(a=>!a),children:"Stadium"})})]}),e.jsxs(i.ThumbnailArea,{children:[e.jsx(i.ThumbnailPicture,{url:"https://itwinplatformcdn.azureedge.net/iTwinUI/stadium.png"}),e.jsx(i.BadgeContainer,{children:e.jsx(k,{backgroundColor:"skyblue",children:"Badge"})})]}),e.jsxs(i.ContentArea,{children:[e.jsx(i.Description,{children:"If you click on this stadium, it is going to be selected."}),e.jsxs(i.Metadata,{children:[e.jsx(v,{}),e.jsxs(C,{children:[e.jsx(j,{variant:"basic",children:"tag 1"}),e.jsx(j,{variant:"basic",children:"tag 2"})]})]})]})]})},ze=()=>e.jsxs(i.Wrapper,{children:[e.jsxs(i.Name,{children:[e.jsx(i.NameIcon,{}),e.jsx(i.NameLabel,{children:e.jsx(i.Action,{href:"https://inclusive-components.design/cards/",children:"Stadium"})})]}),e.jsxs(i.ThumbnailArea,{children:[e.jsx(i.BadgeContainer,{children:e.jsx(k,{backgroundColor:"skyblue",children:"Badge"})}),e.jsx(i.ThumbnailPicture,{url:"https://itwinplatformcdn.azureedge.net/iTwinUI/stadium.png"})]}),e.jsxs(i.ContentArea,{children:[e.jsx(i.Description,{children:"If you click on this stadium, it is going to open another page."}),e.jsxs(i.Metadata,{children:[e.jsx(v,{}),e.jsxs(C,{children:[e.jsx(j,{variant:"basic",children:"tag 1"}),e.jsx(j,{variant:"basic",children:"tag 2"})]})]})]})]}),De=()=>e.jsxs(i.Wrapper,{children:[e.jsxs(i.Name,{children:[e.jsx(i.NameIcon,{}),e.jsx(i.NameLabel,{children:"Condensed"})]}),e.jsx(i.ThumbnailArea,{children:e.jsx(i.ThumbnailPicture,{children:e.jsx(N,{})})}),e.jsx(i.ContentArea,{children:e.jsxs(i.MoreOptions,{children:[e.jsx(o,{onClick:()=>console.log("clicked item 1"),children:"Item 1"},1),e.jsx(o,{onClick:()=>console.log("clicked item 2"),children:"Item 2"},2)]})})]}),Pe=()=>e.jsxs(i.Wrapper,{children:[e.jsxs(i.Name,{children:[e.jsx(i.NameIcon,{}),e.jsx(i.NameLabel,{children:"Some User"})]}),e.jsxs(i.ThumbnailArea,{children:[e.jsx(i.BadgeContainer,{children:e.jsx(k,{backgroundColor:"skyblue",children:"Badge"})}),e.jsx(i.ThumbnailPicture,{children:e.jsx(re,{size:"x-large",status:"online",abbreviation:"TR",backgroundColor:se("Terry Rivers"),image:e.jsx("img",{src:"https://itwinplatformcdn.azureedge.net/iTwinUI/user-placeholder.png"}),title:"Terry Rivers"})})]}),e.jsxs(i.ContentArea,{children:[e.jsx(i.Description,{children:"User Description"}),e.jsxs(i.MoreOptions,{children:[e.jsx(o,{onClick:()=>console.log("clicked item 1"),children:"Item 1"},1),e.jsx(o,{onClick:()=>console.log("clicked item 2"),children:"Item 2"},2)]})]})]}),We=()=>e.jsxs(i.Wrapper,{variant:"folder",children:[e.jsx(i.ThumbnailArea,{children:e.jsx(i.ThumbnailPicture,{children:e.jsx(Z,{})})}),e.jsxs(i.Name,{children:[e.jsx(i.NameIcon,{}),e.jsx(i.NameLabel,{children:"Folder Name"})]}),e.jsxs(i.ContentArea,{children:[e.jsx(i.Description,{children:"Folder description"}),e.jsxs(i.MoreOptions,{children:[e.jsx(o,{onClick:()=>console.log("clicked item 1"),children:"Item 1"},1),e.jsx(o,{onClick:()=>console.log("clicked item 2"),children:"Item 2"},2)]}),e.jsx(i.Metadata,{children:e.jsx("span",{children:"Folder metadata"})})]})]}),Oe=()=>e.jsxs(i.Wrapper,{status:"positive",children:[e.jsxs(i.Name,{children:[e.jsx(i.NameIcon,{}),e.jsx(i.NameLabel,{children:"Tile Name"})]}),e.jsx(i.ThumbnailArea,{children:e.jsx(i.ThumbnailPicture,{children:e.jsx(N,{})})}),e.jsxs(i.ContentArea,{children:[e.jsx(i.Description,{children:"Description"}),e.jsxs(i.MoreOptions,{children:[e.jsx(o,{onClick:()=>console.log("clicked item 1"),children:"Item 1"},1),e.jsx(o,{onClick:()=>console.log("clicked item 2"),children:"Item 2"},2)]}),e.jsx(i.Metadata,{children:e.jsx("span",{children:"Tile with status"})})]})]}),Re=()=>e.jsxs(i.Wrapper,{isLoading:!0,children:[e.jsxs(i.Name,{children:[e.jsx(i.NameIcon,{}),e.jsx(i.NameLabel,{children:"Tile Name"})]}),e.jsx(i.ThumbnailArea,{children:e.jsx(i.ThumbnailPicture,{children:e.jsx(N,{})})}),e.jsxs(i.ContentArea,{children:[e.jsx(i.Description,{children:"Description"}),e.jsxs(i.MoreOptions,{children:[e.jsx(o,{onClick:()=>console.log("clicked item 1"),children:"Item 1"},1),e.jsx(o,{onClick:()=>console.log("clicked item 2"),children:"Item 2"},2)]}),e.jsx(i.Metadata,{children:e.jsx("span",{children:"Loading tile"})})]})]}),Ue=()=>e.jsxs(i.Wrapper,{isDisabled:!0,children:[e.jsxs(i.Name,{children:[e.jsx(i.NameIcon,{}),e.jsx(i.NameLabel,{children:"Tile Name"})]}),e.jsxs(i.ThumbnailArea,{children:[e.jsx(i.BadgeContainer,{children:e.jsx(k,{backgroundColor:"skyblue",children:"Badge"})}),e.jsx(i.ThumbnailPicture,{children:e.jsx(N,{})})]}),e.jsxs(i.ContentArea,{children:[e.jsx(i.Description,{children:"Description"}),e.jsxs(i.MoreOptions,{children:[e.jsx(o,{onClick:()=>console.log("clicked item 1"),children:"Item 1"},1),e.jsx(o,{onClick:()=>console.log("clicked item 2"),children:"Item 2"},2)]}),e.jsxs(i.Metadata,{children:[e.jsx(v,{}),e.jsxs(C,{children:[e.jsx(j,{variant:"basic",children:"tag 1"}),e.jsx(j,{variant:"basic",children:"tag 2"})]})]})]}),e.jsx(i.Buttons,{children:e.jsx(I,{disabled:!0,children:"Button"})})]});typeof window<"u"&&window.document&&window.document.createElement&&document.documentElement.setAttribute("data-storyloaded","");export{Le as Actionable,ye as AllProps,ze as AnchorLink,Be as Basic,De as Condensed,Ue as Disabled,We as Folder,Re as Loading,Oe as Status,Pe as WithAvatar,Se as default};
