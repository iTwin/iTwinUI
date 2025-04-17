import{r as s,j as e,b as n,I as i}from"./index-XUT_GY6Q.js";import{S as a}from"./Add-BnLlkXyp.js";import{S as m}from"./Edit-C_9YIqVs.js";import{S as h}from"./More-d_zEag60.js";import{S as c}from"./Placeholder-DY-f9XKk.js";import{D as u,M as x}from"./MenuItem-CIC1E0UF.js";import{I as b}from"./Input-wWYMBibM.js";import{B as C}from"./Button-D-GKNtcT.js";import{T as j}from"./Text-CHSLHMAk.js";import"./focusable--6qKiAi8.js";import"./ListItem-CsSWydpM.js";import"./LinkAction-DfK2EEEJ.js";import"./ProgressRadial-Cxuog119.js";const I=o=>s.createElement("svg",{viewBox:"0 0 16 16",width:"1rem",height:"1rem",fill:"var(--iui-color-icon-muted, currentColor)",...o},s.createElement("path",{d:"M14 1v1H2V1h3l1-1h4l1 1zM3 3h10v12a1 1 0 01-1 1H4a1 1 0 01-1-1zm6 11h1V5H9zm-3 0h1V5H6z"})),p=o=>s.createElement("svg",{viewBox:"0 0 16 16",width:"1rem",height:"1rem",fill:"var(--iui-color-icon-muted, currentColor)",...o},s.createElement("path",{d:"M16 14c0-5.2-4.2-9.3-9-9.4V2L0 7.3l7 5.3V10c4.3 0 6.7 1.8 9 4"})),G={title:"ButtonGroup"},H=()=>e.jsxs(n,{role:"toolbar",children:[e.jsx(i,{label:"Add",onClick:()=>console.log("Clicked add!"),children:e.jsx(a,{})}),e.jsx(i,{label:"Edit",onClick:()=>console.log("Clicked edit!"),isActive:!0,children:e.jsx(m,{})}),e.jsx(i,{disabled:!0,label:"Delete",onClick:()=>console.log("Clicked delete!"),children:e.jsx(I,{})}),e.jsx(i,{label:"Undo",onClick:()=>console.log("Clicked undo!"),children:e.jsx(p,{})})]}),g=()=>{const o=Array.from({length:10},(r,t)=>e.jsx(i,{label:`Item #${t}`,children:e.jsx(c,{})},t));return e.jsx(n,{orientation:"horizontal",overflowButton:r=>e.jsx(u,{menuItems:t=>Array(o.length-r).fill(null).map((v,d)=>{const l=r+d;return e.jsxs(x,{onClick:t,startIcon:e.jsx(c,{}),children:["Item #",l]},l)}),children:e.jsx(i,{label:"More",children:e.jsx(h,{})})}),children:o})};g.decorators=[o=>e.jsxs(e.Fragment,{children:[e.jsx(j,{variant:"small",as:"small",isMuted:!0,children:"Resize the container to see overflow behavior."}),e.jsx("div",{style:{width:"min(30rem, 100%)",border:"1px solid hotpink",padding:8,overflow:"hidden",resize:"inline"},children:e.jsx(o,{})})]})];const N=()=>e.jsxs(n,{children:[e.jsx(b,{defaultValue:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2V4YW1wbGUuYXV0aDAuY29tLyIsImF1ZCI6Imh0dHBzOi8vYXBpLmV4YW1wbGUuY29tL2NhbGFuZGFyL3YxLyIsInN1YiI6InVzcl8xMjMiLCJpYXQiOjE0NTg3ODU3OTYsImV4cCI6MTQ1ODg3MjE5Nn0.CA7eaHjIHz5NxeIJoFK9krqaeZrPLwmMmgI_XiQiIkQ",readOnly:!0,style:{minWidth:"30ch"}}),e.jsx(C,{styleType:"high-visibility",onClick:async()=>{await navigator.clipboard.writeText("Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2V4YW1wbGUuYXV0aDAuY29tLyIsImF1ZCI6Imh0dHBzOi8vYXBpLmV4YW1wbGUuY29tL2NhbGFuZGFyL3YxLyIsInN1YiI6InVzcl8xMjMiLCJpYXQiOjE0NTg3ODU3OTYsImV4cCI6MTQ1ODg3MjE5Nn0.CA7eaHjIHz5NxeIJoFK9krqaeZrPLwmMmgI_XiQiIkQ"),console.log("Copied bearer token to clipboard")},children:"Copy"})]}),D=()=>e.jsxs(n,{orientation:"vertical",children:[e.jsx(i,{label:"Add",onClick:()=>console.log("Clicked add!"),children:e.jsx(a,{})}),e.jsx(i,{label:"Edit",onClick:()=>console.log("Clicked edit!"),isActive:!0,children:e.jsx(m,{})}),e.jsx(i,{disabled:!0,label:"Delete",onClick:()=>console.log("Clicked delete!"),children:e.jsx(I,{})}),e.jsx(i,{label:"Undo",onClick:()=>console.log("Clicked undo!"),children:e.jsx(p,{})})]}),k=()=>{const o=Array.from({length:10},(r,t)=>e.jsx(i,{label:`Item #${t}`,children:e.jsx(c,{})},t));return e.jsx(n,{orientation:"vertical",style:{blockSize:"100%"},overflowButton:r=>e.jsx(u,{menuItems:t=>Array(o.length-r).fill(null).map((v,d)=>{const l=r+d;return e.jsxs(x,{onClick:t,startIcon:e.jsx(c,{}),children:["Item #",l]},l)}),children:e.jsx(i,{label:"More",children:e.jsx(h,{})})}),children:o})};k.decorators=[o=>e.jsxs(e.Fragment,{children:[e.jsx(j,{variant:"small",as:"small",isMuted:!0,children:"Resize the container to see overflow behavior."}),e.jsx("div",{style:{blockSize:"min(20rem, 100vh)",inlineSize:"min(20rem, 100vw)",border:"1px solid hotpink",padding:8,resize:"block",overflow:"hidden"},children:e.jsx(o,{})})]})];typeof window<"u"&&window.document&&window.document.createElement&&document.documentElement.setAttribute("data-storyloaded","");export{N as InputButtonCombo,g as Overflow,D as Vertical,k as VerticalOverflow,H as WithIcons,G as default};
