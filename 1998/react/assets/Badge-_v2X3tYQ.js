import{r as o,B as g,c as l}from"./index-CpsCEBgu.js";import{i as f,S as m}from"./colors-DN-6A0ES.js";const B=t=>t?f(t)?m[t]:t:"",p=t=>t&&["positive","negative","warning","informational"].includes(t)?t:void 0,x=o.forwardRef((t,s)=>{const{backgroundColor:e,style:r,className:i,children:u,...c}=t,a=e==="primary"?"informational":e,n=p(a),d=a&&!n?{"--iui-badge-background-color":B(a),...r}:{...r};return o.createElement(g,{as:"span",className:l("iui-badge",i),style:d,"data-iui-status":n,ref:s,...c},u)});export{x as B};
