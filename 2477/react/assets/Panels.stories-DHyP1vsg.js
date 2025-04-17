import{r as n,C as N,u as C,l as Q,D as O,d as F,B as _,c as L,n as q,f as G,U,e as V,I as J,m as z,j as e}from"./index-Dv02dXBh.js";import{F as y}from"./Flex-CNLml7wC.js";import{T as H}from"./Text-Ht54HDPg.js";import{S as K}from"./SvgChevronLeft-CrxB2ZGm.js";import{S as x}from"./Surface-DsucuQ69.js";import{L as B}from"./List-BcTxUE04.js";import{L as g}from"./ListItem-B6oay6aA.js";import{D as X}from"./Divider-C3Wv3YLf.js";import{T as Y}from"./ToggleSwitch-CHJbYAz5.js";import{B as D}from"./Button-DkyuLGRp.js";import"./supports-4c0KzbBK.js";import"./LinkAction-C8gJHQ0I.js";import"./SvgCheckmark-Cqf02Ack.js";import"./ProgressRadial-B8eKdFwa.js";class W{}const Z=()=>n.useMemo(()=>new W,[]),ee=(s,i)=>{let t=n.useCallback(()=>s instanceof W?(Object.assign(s,i),()=>{for(let d in i)delete s[d]}):()=>{},[s,i]);return N(t,()=>s,()=>s)},te=()=>()=>{},$=n.createContext(void 0),ne=s=>{let{children:i,instance:t}=s,d=a.useInstance(),f=t||d,{activePanelId:r,changeActivePanel:c,triggers:l,setShouldFocus:m}=C(A),h=n.useCallback(async()=>{if(r==null)return;let u=l[r];u.triggerId!=null&&(m({fromPanelId:r,toPanelId:u.panelId,direction:"backward"}),c(u.panelId))},[r,c,m,l]);return ee(f,n.useMemo(()=>({goBack:h}),[h])),n.createElement($.Provider,{value:{instance:f}},i)},re=n.forwardRef((s,i)=>{let{children:t,className:d,onActiveIdChange:f,instance:r,...c}=s,l=q(f),m=n.useRef(null),[h,u]=n.useState(void 0),[P,j]=n.useState({}),I=n.useRef(new Set),[S,E]=n.useState(void 0),p=G("(prefers-reduced-motion: no-preference)"),k=n.useCallback(b=>{var w,o,v;!I.current.has(b)||b===h||(U.flushSync(()=>u(b)),(w=l.current)==null||w.call(l,b),(v=(o=m.current)==null?void 0:o.getRootNode().getElementById(b))==null||v.scrollIntoView({block:"nearest",inline:"center",behavior:p?"smooth":"instant"}))},[h,p,l]);return n.createElement(A.Provider,{value:n.useMemo(()=>({activePanelId:h,setActivePanelId:u,changeActivePanel:k,triggers:P,setTriggers:j,shouldFocus:S,setShouldFocus:E,panels:I}),[h,k,u,j,S,P])},n.createElement(ne,{instance:r},n.createElement(_,{ref:V(m,i),...c,className:L("iui-panel-wrapper",d)},t)))}),A=n.createContext(void 0);let se=n.forwardRef((s,i)=>{let{id:t,children:d,className:f,...r}=s,{activePanelId:c,triggers:l,panels:m,setActivePanelId:h}=C(A),u=n.useMemo(()=>l[t],[t,l]),P=ce(c)||c,j=[c,P].includes(t),I=c===t&&c!==P,S=P===t&&c!==t;return F(()=>{c==null&&m.current.size===0&&h(t);let p=m.current;return p.has(t)||p.add(t),()=>{p.delete(t)}},[c,t,m,h]),n.createElement(T.Provider,{value:n.useMemo(()=>({id:t,associatedTrigger:u}),[u,t])},j&&n.createElement(_,{ref:i,id:t,className:L("iui-panel",f),"aria-labelledby":`${t}-header-title`,role:"group",inert:S?"true":void 0,"data-iui-transitioning":I?"true":void 0,...r},d))}),T=n.createContext(void 0),ae=s=>{let{children:i,for:t}=s,{changeActivePanel:d,triggers:f,setTriggers:r,activePanelId:c,shouldFocus:l,setShouldFocus:m,panels:h}=C(A),{id:u}=C(T),P=Q(),j=i.props.id||P,I=n.useCallback(()=>{c!=null&&(m({fromPanelId:c,toPanelId:t,direction:"forward"}),d==null||d(t))},[c,d,t,m]),S=n.useCallback(p=>{(l==null?void 0:l.direction)==="backward"&&(l==null?void 0:l.toPanelId)===u&&(l==null?void 0:l.fromPanelId)===t&&(p==null||p.focus({preventScroll:!0}),m(void 0))},[t,u,m,l]),E=te();return n.useEffect(()=>{h.current.has(t)},[t,E,h,f]),n.useEffect(()=>{r(p=>{let k=p[t];return k==null||u!==k.panelId||j!==k.triggerId?{...p,[t]:{panelId:u,triggerId:j}}:p})},[t,u,r,j]),O(i,p=>({...p.props,id:j,ref:S,onClick:z(p.props.onClick,I),"aria-expanded":c===t,"aria-controls":t}))},ie=n.forwardRef((s,i)=>{let{titleProps:t,children:d,...f}=s,{shouldFocus:r,setShouldFocus:c}=C(A),{id:l,associatedTrigger:m}=C(T),h=n.useCallback(u=>{(r==null?void 0:r.direction)==="forward"&&r.toPanelId===l&&(u==null||u.focus({preventScroll:!0}),c(void 0))},[l,c,r==null?void 0:r.direction,r==null?void 0:r.toPanelId]);return n.createElement(y,{ref:i,...f},m&&n.createElement(le,null),n.createElement(H,{id:`${l}-header-title`,as:"h2",tabIndex:-1,ref:h,...t},d))}),le=n.forwardRef((s,i)=>{let{children:t,onClick:d,...f}=s,{instance:r}=C($);return n.createElement(J,{ref:i,"aria-label":"Previous panel",styleType:"borderless",size:"small","data-iui-shift":"left",...f,onClick:z(n.useCallback(()=>r==null?void 0:r.goBack(),[r]),d)},t||n.createElement(K,null))});const a={Wrapper:re,Panel:se,Trigger:ae,Header:ie,useInstance:Z};function ce(s,{delay:i}={delay:500}){let[t,d]=n.useState(void 0),f=n.useRef(void 0);return n.useEffect(()=>(i===0?d(s):f.current=setTimeout(()=>d(s),i),()=>{clearTimeout(f.current)}),[s,i]),t}const Se={component:a,title:"Panels"},ke=()=>{const s="root",i="more-info";return e.jsxs(a.Wrapper,{as:x,style:{inlineSize:"min(300px, 30vw)",blockSize:"min(500px, 50vh)"},children:[e.jsxs(a.Panel,{id:s,children:[e.jsx(x.Header,{as:a.Header,children:"Root"}),e.jsx(x.Body,{as:B,children:e.jsx(g,{children:e.jsx(a.Trigger,{for:i,children:e.jsx(g.Action,{children:"More details"})})})})]}),e.jsxs(a.Panel,{id:i,children:[e.jsx(x.Header,{as:a.Header,children:"More details"}),e.jsx(x.Body,{isPadded:!0,children:e.jsx(H,{children:"Content"})})]})]})},be=()=>{const s="root",i=Array.from(Array(20).keys()).map(t=>({id:`panel-${t}`,label:`Panel ${t}`}));return e.jsxs(a.Wrapper,{as:x,style:{inlineSize:"min(300px, 30vw)",blockSize:"min(500px, 50vh)"},children:[e.jsxs(a.Panel,{id:s,as:y,flexDirection:"column",alignItems:"stretch",gap:"0",children:[e.jsx(x.Header,{as:a.Header,children:"Root"}),e.jsx(x.Body,{as:B,children:i.map(t=>e.jsx(g,{children:e.jsx(g.Content,{children:e.jsx(a.Trigger,{for:`${t.id}`,children:e.jsx(g.Action,{children:t.label})})})},t.id))})]}),i.map(t=>e.jsxs(a.Panel,{as:y,id:t.id,flexDirection:"column",alignItems:"stretch",children:[e.jsx(x.Header,{as:a.Header,children:t.label}),e.jsxs(x.Body,{as:y,flexDirection:"column",children:[e.jsx(H,{children:`Content for ${t.id}`}),e.jsx(y.Spacer,{}),e.jsx(X,{}),e.jsx(H,{children:`Footer for ${t.id}`})]})]},t.id))]})},Ce=()=>{const s=n.useId(),i=n.useId(),t=n.useId(),d=n.useId(),[f,r]=n.useState(!1),[c,l]=n.useState("240p"),[m,h]=n.useState("1.0x"),[u,P]=n.useState([]),j=a.useInstance(),I=n.useCallback(({content:o,state:v,setState:R})=>{const M=v===o;return e.jsxs(g,{active:M,"aria-selected":M,onClick:()=>{j.goBack()},children:[e.jsx(g.Action,{onClick:()=>R(o),children:o}),e.jsx(g.Icon,{})]})},[j]),S=n.useCallback(({content:o})=>e.jsx(I,{content:o,state:c,setState:l}),[I,c]),E=n.useCallback(({content:o})=>e.jsx(I,{content:o,state:m,setState:h}),[I,m]),p=n.useCallback(({content:o})=>e.jsx(I,{content:o,state:u.includes(o)?o:"",setState:()=>{P(v=>v.includes(o)?v.filter(R=>R!==o):[...v,o])}}),[I,u]),k=n.useMemo(()=>["240p","360p","480p","720p","1080p"],[]),b=n.useMemo(()=>Array.from({length:21},(o,v)=>(v*.1).toFixed(1)+"x"),[]),w=n.useId();return e.jsx(e.Fragment,{children:e.jsxs(a.Wrapper,{instance:j,as:x,style:{inlineSize:"min(200px, 30vw)",blockSize:"min(250px, 50vh)"},children:[e.jsx(a.Panel,{id:s,children:e.jsxs(B,{children:[e.jsxs(g,{children:[e.jsx(g.Content,{as:"label",htmlFor:w,children:"Repeat"}),e.jsx(Y,{id:w,onChange:o=>r(o.target.checked),checked:f})]}),e.jsx(g,{children:e.jsx(a.Trigger,{for:i,children:e.jsx(g.Action,{children:"Quality"})})}),e.jsx(g,{children:e.jsx(a.Trigger,{for:t,children:e.jsx(g.Action,{children:"Speed"})})}),e.jsx(g,{children:e.jsx(a.Trigger,{for:d,children:e.jsx(g.Action,{children:"Accessibility"})})})]})}),e.jsxs(a.Panel,{id:i,as:y,flexDirection:"column",alignItems:"stretch",gap:"0",children:[e.jsx(x.Header,{as:a.Header,children:"Quality"}),e.jsx(x.Body,{as:B,children:k.map(o=>e.jsx(S,{content:o},o))})]}),e.jsxs(a.Panel,{id:t,as:y,flexDirection:"column",alignItems:"stretch",gap:"0",children:[e.jsx(x.Header,{as:a.Header,children:"Speed"}),e.jsx(x.Body,{as:B,children:b.map(o=>e.jsx(E,{content:o},o))})]}),e.jsxs(a.Panel,{id:d,as:y,flexDirection:"column",alignItems:"stretch",gap:"0",children:[e.jsx(x.Header,{as:a.Header,children:"Accessibility"}),e.jsxs(x.Body,{as:B,children:[e.jsx(p,{content:"High contrast"}),e.jsx(p,{content:"Large text"}),e.jsx(p,{content:"Screen reader"})]})]})]})})},Ee=()=>{const s=a.useInstance(),r=["root","panel-1","panel-1-1","panel-1-1-1"];return e.jsxs(y,{flexDirection:"column",alignItems:"flex-start",children:[e.jsx(D,{id:"instance-go-back",onClick:()=>s.goBack(),children:"Go Back"}),e.jsx(a.Wrapper,{instance:s,as:x,style:{width:"min(300px, 30vw)",height:"min(500px, 50vh)"},children:r.map((c,l)=>e.jsxs(a.Panel,{id:c,children:[e.jsx(x.Header,{as:a.Header,children:c}),e.jsx(x.Body,{isPadded:!0,children:e.jsx(a.Trigger,{for:r[l+1],children:e.jsxs(D,{children:["Go to ",r[l+1]??"panel that doesn't exist"]})})})]},c))})]})};typeof window<"u"&&window.document&&window.document.createElement&&document.documentElement.setAttribute("data-storyloaded","");export{ke as Basic,Ce as MultiLevelList,be as MultiPanelInformationPanel,Ee as NestedPanels,Se as default};
