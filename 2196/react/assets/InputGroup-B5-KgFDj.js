import{r as s,c as m,B as b}from"./index-CuyZiCR-.js";import{I as y,S as E}from"./InputGrid-BKNwrhSD.js";import{L as v}from"./Label-CFM9C736.js";const B=s.forwardRef((i,e)=>{let{className:a,children:t,disabled:o=!1,displayStyle:r="default",label:u,status:n,required:p=!1,labelProps:c,innerProps:l,message:d,svgIcon:g,messageProps:f,...I}=i;return s.createElement(y,{ref:e,as:"div",labelPlacement:r,className:m("iui-input-group-wrapper",a),"data-iui-status":n,...I},u&&s.createElement(v,{as:"label",required:p,disabled:o,...c},u),s.createElement(b,{as:"div",...l,className:m("iui-input-group",l==null?void 0:l.className)},t),s.createElement(P,{message:d,status:n,svgIcon:g,displayStyle:r,messageProps:f}))});let P=i=>{let{message:e,status:a,svgIcon:t,displayStyle:o,messageProps:r}=i;return e&&typeof e!="string"?e:e||a||t?s.createElement(E,{iconProps:{"aria-hidden":!0},startIcon:t,status:a,...r},o!=="inline"&&e):null};export{B as I};
