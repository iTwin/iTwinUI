import{r as l,j as e,R as d}from"./index-ZG0WEztO.js";import{S as r}from"./Placeholder-BEv5IjaU.js";import{S as c,a as x,b as m}from"./StatusWarning-DVozUn_-.js";import{I as t}from"./Icon-DV5R0AaH.js";import{F as j}from"./Flex-gMAyvApf.js";import{S as u}from"./Slider-CbmaMmCH.js";import"./useEventListener-CWiQcQZ1.js";const h=s=>l.createElement("svg",{viewBox:"0 0 16 16",width:"1rem",height:"1rem",fill:"var(--iui-color-icon-muted, currentColor)",...s},l.createElement("path",{d:"M8 0a8 8 0 108 8 8 8 0 00-8-8zm1.2 3.2a.923.923 0 01.997.843l.003.057a1.31 1.31 0 01-1.3 1.2.945.945 0 01-1-1 1.228 1.228 0 011.3-1.1zm-2 9.6c-.5 0-.9-.3-.5-1.7l.6-2.4c.1-.4.1-.5 0-.5-.2-.1-.9.2-1.3.5l-.2-.5a6.497 6.497 0 013.3-1.6c.5 0 .6.6.3 1.6l-.7 2.6c-.1.5-.1.6.1.6a2.003 2.003 0 001.1-.6l.3.4a5.769 5.769 0 01-3 1.6z"})),I={title:"Icon"},A=()=>e.jsx(t,{children:e.jsx(r,{})}),F=()=>e.jsx(j,{style:{border:"1px solid red",width:"fit-content"},children:e.jsx(t,{padded:!0,children:e.jsx(r,{})})}),n=()=>e.jsxs(e.Fragment,{children:[e.jsx(t,{fill:"informational",children:e.jsx(h,{})}),e.jsx(t,{fill:"negative",children:e.jsx(c,{})}),e.jsx(t,{fill:"positive",children:e.jsx(x,{})}),e.jsx(t,{fill:"warning",children:e.jsx(m,{})})]});n.decorators=[s=>e.jsx("div",{style:{display:"flex",gap:4},children:e.jsx(s,{})})];const p=()=>e.jsxs(e.Fragment,{children:[e.jsx(t,{size:"small",children:e.jsx(r,{})}),e.jsx(t,{size:"medium",children:e.jsx(r,{})}),e.jsx(t,{size:"large",children:e.jsx(r,{})})]});p.decorators=n.decorators;const f=()=>e.jsx(t,{size:"auto",children:e.jsx(r,{})});f.decorators=[s=>e.jsx(g,{children:e.jsx(s,{})})];const g=({children:s})=>{const[i,a]=d.useState(()=>.875);return e.jsxs("div",{style:{display:"flex",gap:16,alignItems:"start"},children:[e.jsxs("p",{style:{width:"min(400px, 90%)",fontSize:`${i}rem`,lineHeight:1.3},children:[e.jsx("span",{style:{marginRight:4,verticalAlign:"middle"},children:s}),"This icon will scale with text. Try adjusting the slider."]}),e.jsx(u,{orientation:"vertical",values:[i],onUpdate:([o])=>a(o),min:.5,max:2.5,step:.05,minLabel:"",maxLabel:"",tooltipProps:()=>({visible:!1}),style:{height:"min(150px, 90vh)"},thumbProps:()=>({"aria-label":"Adjust font size"})})]})};typeof window<"u"&&window.document&&window.document.createElement&&document.documentElement.setAttribute("data-storyloaded","");export{f as Autoscale,A as Default,F as Padded,p as Sizes,n as Statuses,I as default};
