import{j as t,R as o}from"./index-C80khy3i.js";import{S as u}from"./SmileyHappy-DcEejgRD.js";import{S as d}from"./SmileySad-B2mUZtIM.js";import{S as s}from"./Slider-BjeG_5Fc.js";import{T as p}from"./Text-C_5tf6b-.js";import"./useEventListener-Dcei_oDJ.js";const w={title:"Slider",decorators:[(e,n)=>t.jsx("div",{style:{...n.globalState.story.includes("vertical")?{height:"calc(100vh - 24px)",width:"fit-content",display:"grid"}:{}},children:t.jsx(e,{})})]},f=()=>t.jsx(s,{values:[50]}),C=()=>t.jsx(s,{values:[20,80],min:0,max:100}),S=()=>t.jsx(s,{thumbProps:e=>{const n=["building-south","building-north","building-west","building-east"];return{style:{backgroundColor:e%2==0?"blue":"red"},id:`${n[e]}`}},values:[20,40,60,80],trackDisplayMode:"even-segments",thumbMode:"allow-crossing"}),D=()=>t.jsx(s,{thumbProps:()=>({style:{display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"#999",width:"36px",height:"26px",borderRadius:"4px",transform:"translateX(-19.2px)"},children:t.jsx("span",{style:{pointerEvents:"none",marginBottom:"4px"},children:"|||"})}),values:[50],minLabel:t.jsx(d,{}),maxLabel:t.jsx(u,{}),trackContainerProps:{style:{margin:"0 8px"}}}),T=()=>t.jsx(s,{min:0,max:60,values:[30],disabled:!0}),k=()=>t.jsx(s,{min:0,max:60,values:[20],tickLabels:["0","20","40","60"],tooltipProps:(e,n)=>({placement:"right",content:`$${n}.00`})}),x=()=>{const e=o.useMemo(()=>new Intl.DateTimeFormat("default",{month:"short",day:"2-digit",timeZone:"UTC"}),[]),[n,r]=o.useState(new Date(Date.UTC(2019,0,1))),[l,m]=o.useState([0]),a=o.useCallback(i=>{m([...i]);const c=new Date(Date.UTC(2019,0,i[0]));r(c)},[]);return t.jsxs(t.Fragment,{children:[t.jsx(s,{min:1,max:365,values:l,tooltipProps:()=>({visible:!1}),minLabel:"Date",maxLabel:"",orientation:"horizontal",onUpdate:a,onChange:a,tickProps:{className:"some-tick"}}),t.jsx(p,{as:"p",style:{textAlign:"center"},children:e.format(n)})]})};x.decorators=[e=>t.jsx("div",{style:{width:"50%"},children:t.jsx(e,{})})];const P=()=>t.jsx(s,{min:0,max:50,step:2.5,values:[25]}),L=()=>t.jsx(s,{values:[50],orientation:"vertical"});typeof window<"u"&&window.document&&window.document.createElement&&document.documentElement.setAttribute("data-storyloaded","");export{f as Basic,x as CustomTickNoTooltip,k as CustomTooltip,P as DecimalIncrement,T as Disabled,S as MultiThumbsAllowCrossing,C as Range,L as Vertical,D as WithCustomThumb,w as default};
