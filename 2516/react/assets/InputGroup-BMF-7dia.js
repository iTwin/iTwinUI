import{r as a,c as m,B as b}from"./index-BAgVnTda.js";import{I as E,S as y}from"./InputGrid-BZXEQUh-.js";import{L as v}from"./Label-jHNg-nA9.js";const B=a.forwardRef((i,e)=>{let{className:s,children:t,disabled:o=!1,displayStyle:r="default",label:n,status:u,required:p=!1,labelProps:c,innerProps:l,message:d,svgIcon:f,messageProps:g,...I}=i;return a.createElement(E,{ref:e,as:"div",labelPlacement:r,className:m("iui-input-group-wrapper",s),"data-iui-status":u,...I},n&&a.createElement(v,{as:"label",required:p,disabled:o,...c},n),a.createElement(b,{as:"div",...l,className:m("iui-input-group",l==null?void 0:l.className)},t),a.createElement(x,{message:d,status:u,svgIcon:f,displayStyle:r,messageProps:g}))});let x=i=>{let{message:e,status:s,svgIcon:t,displayStyle:o,messageProps:r}=i;return e&&typeof e!="string"?e:e||s||t?a.createElement(y,{iconProps:{"aria-hidden":!0},startIcon:t,status:s,...r},o!=="inline"&&e):null};export{B as I};
