import{r as e,B as g,c as y,V as B}from"./index-Dv02dXBh.js";import{S as k,i as p}from"./colors-ymlpSE_k.js";let S=t=>t?p(t)?k[t]:t:"";const x={away:"Away",busy:"Busy",offline:"Offline",online:"Online"},E=e.forwardRef((t,i)=>{let{size:l="small",status:a,abbreviation:s,image:r,backgroundColor:u,title:n,translatedStatusTitles:o,className:d,style:f,...m}=t,c={...x,...o};return e.createElement(g,{as:"span",className:y("iui-avatar",d),"data-iui-size":l!=="medium"?l:void 0,"data-iui-status":a,title:n,style:{backgroundColor:S(u),...f},ref:i,...m},r?null:s==null?void 0:s.substring(0,2),r,a?e.createElement(B,null,c[a]):null)});export{E as A};
