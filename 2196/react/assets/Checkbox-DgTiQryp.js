import{r as e,d as y,B as r,c as t}from"./index-CuyZiCR-.js";import{P as R}from"./ProgressRadial-CWDrPmbc.js";const v=e.forwardRef((m,u)=>{let{className:p,disabled:i=!1,indeterminate:c=!1,label:l,status:n,variant:d="default",isLoading:s=!1,wrapperProps:b={},labelProps:f={},style:x,...h}=m,a=e.useRef(null),k=y(a,u);e.useEffect(()=>{a.current&&(a.current.indeterminate=c,a.current.checked=!c&&a.current.checked)});let o=e.createElement(e.Fragment,null,e.createElement(r,{as:"input",className:t("iui-checkbox",{"iui-checkbox-visibility":d==="eyeball","iui-loading":s},p),style:x,disabled:i||s,type:"checkbox",ref:k,...h}),s&&e.createElement(R,{size:"x-small",indeterminate:!0})),{className:E,...N}=b,{className:g,...P}=f;return l?e.createElement(r,{as:"label",className:t("iui-checkbox-wrapper",{"iui-disabled":i,[`iui-${n}`]:!!n,"iui-loading":s},E),...N},o,l&&e.createElement(r,{as:"span",className:t("iui-checkbox-label",g),...P},l)):o});export{v as C};
