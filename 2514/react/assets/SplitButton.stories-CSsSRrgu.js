import{r as t,l as P,I as M,B as D,c as N,m as R,j as o}from"./index-D7_B9YkS.js";import{B as T}from"./Button-JHU_WgTt.js";import{a as H,M as m}from"./MenuItem-k5YSu36n.js";import{S as K}from"./SvgCaretUpSmall-Cb-nWEpD.js";import{S as V}from"./SvgCaretDownSmall-B6QvgQod.js";import"./ProgressRadial-C0GxIYFe.js";import"./focusable--1FmRvbI.js";import"./ListItem-NXzrMjna.js";import"./LinkAction-BmuJxeeH.js";const z=t.forwardRef((e,s)=>{var p;let{onClick:l,menuItems:n,className:b,menuPlacement:I="bottom-end",styleType:c="default",size:d,children:x,wrapperProps:i,menuButtonProps:y,dropdownMenuProps:E,portal:S=!0,...h}=e,{middleware:w,...a}=E||{},[u,r]=t.useState(!1),B=t.useMemo(()=>typeof n=="function"?n(()=>r(!1)):n,[n]),C={visible:u,onVisibleChange:r,placement:I,matchWidth:!0,middleware:w},f=P(),g=t.createElement(M,{styleType:c,size:d,disabled:e.disabled,"aria-labelledby":((p=e.labelProps)==null?void 0:p.id)||f,...y},u?t.createElement(K,null):t.createElement(V,null)),[j,k]=t.useState(null);return t.createElement(D,{as:"div",...i,ref:k,className:N("iui-button-split",{"iui-disabled":e.disabled},i==null?void 0:i.className)},t.createElement(T,{className:b,styleType:c,size:d,onClick:l,ref:s,...h,labelProps:{id:f,...e.labelProps}},x),t.createElement(H,{popoverProps:C,trigger:g,portal:S,positionReference:j,...a,onKeyDown:R(a==null?void 0:a.onKeyDown,({key:v})=>{v==="Tab"&&r(!1)})},B))}),L={title:"SplitButton",decorators:[e=>o.jsx("div",{style:{minHeight:150},children:o.jsx(e,{})})]},O=()=>{const e=(l,n)=>()=>{console.log(`Item #${l} clicked!`),n()},s=l=>[o.jsx(m,{onClick:e(1,l),children:"Item #1"},1),o.jsx(m,{onClick:e(2,l),children:"Item #2"},2),o.jsx(m,{onClick:e(3,l),children:"Item #3"},3)];return o.jsx(z,{onClick:()=>console.log("Primary button clicked!"),menuItems:s,styleType:"default",children:"Default"})};typeof window<"u"&&window.document&&window.document.createElement&&document.documentElement.setAttribute("data-storyloaded","");export{O as Basic,L as default};
