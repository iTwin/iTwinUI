import{r as e,u as c,B as u}from"./index-D7_B9YkS.js";import{I as p,a as I,b}from"./InputFlexContainer-D-ftJ0qP.js";let d=e.createContext(void 0),x=e.forwardRef((n,o)=>{let{children:a,size:t,isDisabled:i,...r}=n;return e.createElement(d.Provider,{value:{size:t,isDisabled:i}},e.createElement(I,{isDisabled:i,size:t,ref:o,...r},a))}),D=e.forwardRef((n,o)=>{let{id:a,size:t,disabled:i,...r}=n,{size:s,isDisabled:l}=c(d);return e.createElement(u,{as:"input",ref:o,"data-iui-size":t??s,disabled:i??l,id:a,...r})}),f=e.forwardRef((n,o)=>{let{children:a,size:t,disabled:i,...r}=n,{size:s,isDisabled:l}=c(d);return e.createElement(b,{ref:o,size:t??s,disabled:i??l,...r},a)}),m=p;const C=Object.assign(x,{Input:D,Button:f,Icon:m});export{C as I};
