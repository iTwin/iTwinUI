import{R as u,j as e}from"./index-7nKTUIFH.js";import{S as i}from"./Calendar-fFOqjfob.js";import{I as n}from"./InputWithDecorations-FiIW3gBK.js";import{P as c}from"./Popover-WYBrke_R.js";import{T as a}from"./TimePicker-7a1y1I-7.js";import"./InputFlexContainer-dOco2Abc.js";const g={title:"TimePicker"},S=()=>{const[r,o]=u.useState(new Date(2021,4,11,14,55,22)),s=t=>{o(t),console.log(`New Time value: ${t}`)};return e.jsx(e.Fragment,{children:e.jsxs(n,{style:{width:150},id:"time-input",children:[e.jsx(n.Input,{value:r.toLocaleTimeString("en-US",{timeStyle:"short"}),readOnly:!0}),e.jsx(c,{applyBackground:!0,placement:"bottom-end",content:e.jsx(a,{date:r,onChange:s,setFocusHour:!0,use12Hours:!1}),children:e.jsx(n.Button,{children:e.jsx(i,{})})})]})})},w=()=>{const[r,o]=u.useState(new Date(2021,4,11,14,55,22)),s=t=>{o(t),console.log(`New Time value: ${t}`)};return e.jsx(e.Fragment,{children:e.jsxs(n,{style:{width:200},id:"time-input",children:[e.jsx(n.Input,{value:r.toLocaleTimeString("en-US",{timeStyle:"short"}),readOnly:!0}),e.jsx(c,{applyBackground:!0,placement:"bottom-end",content:e.jsx(a,{date:r,onChange:s,setFocusHour:!0,use12Hours:!1,hourRenderer:t=>t.getHours()===1?`${t.getHours()} hr`:`${t.getHours()} hrs`,minuteRenderer:t=>t.getMinutes()===1?`${t.getMinutes()} min`:`${t.getMinutes()} mins`,meridiemRenderer:t=>t==="AM"?"Before":"After"}),children:e.jsx(n.Button,{children:e.jsx(i,{})})})]})})},y=()=>{const[r,o]=u.useState(new Date(2021,4,11,14,55,30)),s=m=>{o(m),console.log(`New Time value: ${m}`)},t="short";return e.jsx(e.Fragment,{children:e.jsxs(n,{style:{width:150},id:"time-input",children:[e.jsx(n.Input,{value:r.toLocaleTimeString("en-US",{timeStyle:t}),readOnly:!0}),e.jsx(c,{applyBackground:!0,placement:"bottom-end",content:e.jsx(a,{date:r,onChange:s,setFocusHour:!0,useCombinedRenderer:!0,precision:"minutes",hourStep:1,minuteStep:1,secondStep:15,use12Hours:!0}),children:e.jsx(n.Button,{children:e.jsx(i,{})})})]})})};typeof window<"u"&&window.document&&window.document.createElement&&document.documentElement.setAttribute("data-storyloaded","");export{S as Basic,y as Combined,w as CustomRenderers,g as default};
