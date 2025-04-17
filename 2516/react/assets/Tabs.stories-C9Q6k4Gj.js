import{r,p as J,x as $,u as R,B as N,c as w,d as M,n as Q,m as V,e as O,h as X,a1 as ee,l as ae,j as e}from"./index-BAgVnTda.js";import{S as x}from"./Star-D57Jfrcu.js";import{I as te}from"./Icon-Cxpr9ChA.js";import{u as re}from"./useContainerWidth-CGkej2Hf.js";import{B as m}from"./Button-v7nEu5l9.js";import"./ProgressRadial-ZHbnH1bE.js";let W=r.forwardRef((t,s)=>{let{children:i,orientation:n="horizontal",type:c="default",focusActivationMode:o="auto",color:l="blue",defaultValue:f,value:b,onValueChange:j,...v}=t,[y,C]=$(f,b,j),[T,E]=r.useState({}),[h,g]=r.useState(!1),I=ae();return r.createElement(ne,{...v,orientation:n,style:{...T,...t==null?void 0:t.style},ref:s},r.createElement(k.Provider,{value:{orientation:n,type:c,activeValue:y,setActiveValue:C,setStripeProperties:E,idPrefix:I,focusActivationMode:o,hasSublabel:h,setHasSublabel:g,color:l}},i))}),ne=r.forwardRef((t,s)=>{let{orientation:i="horizontal",...n}=t;return r.createElement(N,{...n,className:w("iui-tabs-wrapper",`iui-${i}`,t.className),ref:s})}),D=r.forwardRef((t,s)=>{let{className:i,children:n,...c}=t,{type:o,hasSublabel:l,color:f,orientation:b}=R(k),j=ee(),v=r.useRef(null),[y,C]=re(o!=="default"),T=O(s,v,y,oe());return r.createElement(ie,{className:w({"iui-animated":o!=="default"&&j},i),"data-iui-orientation":b,role:"tablist",ref:T,...c,type:o,color:f,size:l?"large":void 0,orientation:b},r.createElement(Z.Provider,{value:{tabsWidth:C,tablistRef:v}},n))}),ie=r.forwardRef((t,s)=>{let{type:i="default",color:n,size:c,orientation:o="horizontal",...l}=t;return r.createElement(N,{...l,className:w("iui-tabs",`iui-${i}`,{"iui-green":n==="green","iui-large":c==="large"},t.className),"data-iui-orientation":o,ref:s})}),B=r.forwardRef((t,s)=>{let{children:i,value:n,label:c,...o}=t,{orientation:l,activeValue:f,setActiveValue:b,type:j,setStripeProperties:v,idPrefix:y,focusActivationMode:C}=R(k),{tabsWidth:T,tablistRef:E}=R(Z),h=r.useRef(void 0),g=f===n,I=Q(g);M(()=>{var u,d,p;I.current&&((p=(u=h.current)==null?void 0:u.parentElement)==null||p.scrollTo({[l==="horizontal"?"left":"top"]:((d=h.current)==null?void 0:d[l==="horizontal"?"offsetLeft":"offsetTop"])-4,behavior:"instant"}))},[I,l]),M(()=>{j!=="default"&&g&&(()=>{var P,z,G;let d=(P=h.current)==null?void 0:P.getBoundingClientRect(),p=(z=E.current)==null?void 0:z.getBoundingClientRect(),A=((d==null?void 0:d.x)??0)+(((G=E.current)==null?void 0:G.scrollLeft)??0),S=d!=null&&p!=null?{horizontal:A-p.x,vertical:d.y-p.y}:{horizontal:0,vertical:0};v({"--iui-tabs-stripe-size":l==="horizontal"?`${d==null?void 0:d.width}px`:`${d==null?void 0:d.height}px`,"--iui-tabs-stripe-position":l==="horizontal"?`${S.horizontal}px`:`${S.vertical}px`})})()},[j,l,g,T,v,E,n]);let _=u=>{var S,P,z;if(u.altKey)return;let d=Array.from(((S=u.currentTarget.parentElement)==null?void 0:S.children)??[]),p=((P=h.current)==null?void 0:P.nextElementSibling)??d.at(0),A=((z=h.current)==null?void 0:z.previousElementSibling)??d.at(-1);switch(u.key){case"ArrowDown":l==="vertical"&&(p==null||p.focus(),u.preventDefault());break;case"ArrowRight":l==="horizontal"&&(p==null||p.focus(),u.preventDefault());break;case"ArrowUp":l==="vertical"&&(A==null||A.focus(),u.preventDefault());break;case"ArrowLeft":l==="horizontal"&&(A==null||A.focus(),u.preventDefault());break}},q=r.useCallback(u=>{f===void 0&&u!=null&&u.matches(":first-of-type")&&b(n)},[f,b,n]);return r.createElement(se,{as:X,role:"tab",tabIndex:g?0:-1,"aria-selected":g,"aria-controls":`${y}-panel-${n.replaceAll(" ","-")}`,ref:O(h,s,q),...o,id:`${y}-tab-${n.replaceAll(" ","-")}`,onClick:V(t.onClick,()=>b(n)),onKeyDown:V(t.onKeyDown,_),onFocus:V(t.onFocus,()=>{var u;(u=h.current)==null||u.scrollIntoView({block:"nearest",inline:"nearest"}),C==="auto"&&!t.disabled&&b(n)})},c?r.createElement(a.TabLabel,null,c):i)}),se=r.forwardRef((t,s)=>r.createElement(N,{as:"button",...t,className:w("iui-tab",t.className),ref:s})),H=r.forwardRef((t,s)=>r.createElement(te,{...t,className:w("iui-tab-icon",t==null?void 0:t.className),ref:s})),F=J.span("iui-tab-label"),K=r.forwardRef((t,s)=>{let{className:i,children:n,...c}=t,{hasSublabel:o,setHasSublabel:l}=R(k);return M(()=>{o||l(!0)},[o,l]),r.createElement(N,{as:"span",className:w("iui-tab-description",i),ref:s,...c},n)}),U=r.forwardRef((t,s)=>{let{wrapperProps:i,className:n,children:c,...o}=t;return r.createElement(N,{...i,className:w("iui-tabs-actions-wrapper",i==null?void 0:i.className)},r.createElement(N,{className:w("iui-tabs-actions",n),ref:s,...o},c))}),Y=r.forwardRef((t,s)=>{let{value:i,className:n,children:c,...o}=t,{activeValue:l,idPrefix:f}=R(k);return r.createElement(N,{className:w("iui-tabs-content",n),"aria-labelledby":`${f}-tab-${i.replaceAll(" ","-")}`,role:"tabpanel",hidden:l!==i?!0:void 0,ref:s,...o,id:`${f}-panel-${i.replaceAll(" ","-")}`},c)}),le=r.forwardRef((t,s)=>{let i;t.type!=="pill"&&t.actions&&(i=t.actions,t={...t},delete t.actions);let{labels:n,onTabSelected:c,focusActivationMode:o,color:l,activeIndex:f,tabsClassName:b,contentClassName:j,wrapperClassName:v,children:y,...C}=t,[T,E]=$(0,f,c);return r.createElement(W,{className:v,focusActivationMode:o,color:l,value:`${T}`,onValueChange:h=>E(Number(h)),...C},r.createElement(D,{className:b,ref:s},n.map((h,g)=>{let I=`${g}`;return r.isValidElement(h)?r.cloneElement(h,{value:I}):r.createElement(L,{key:g,value:I,label:h})})),i&&r.createElement(U,null,i),y&&r.createElement(Y,{value:`${T}`,className:j},y))}),L=r.forwardRef((t,s)=>{let{label:i,sublabel:n,startIcon:c,children:o,value:l,...f}=t;return r.createElement(r.Fragment,null,r.createElement(B,{...f,value:l,ref:s},c&&r.createElement(H,null,c),r.createElement(F,null,i),n&&r.createElement(K,null,n),o))});const a=Object.assign(le,{Wrapper:W,TabList:D,Tab:B,TabIcon:H,TabLabel:F,TabDescription:K,Actions:U,Panel:Y});let k=r.createContext(void 0),Z=r.createContext(void 0),oe=()=>r.useCallback(t=>{t&&t.scrollHeight>t.clientHeight&&(t.style.scrollbarGutter="stable",CSS.supports("scrollbar-gutter: stable")||(t.style.overflowY="scroll"))},[]);const me={title:"Tabs"},be=()=>e.jsxs(a.Wrapper,{children:[e.jsxs(a.TabList,{children:[e.jsx(a.Tab,{label:"Apple",value:"apple"}),e.jsx(a.Tab,{label:"Orange",value:"orange"}),e.jsx(a.Tab,{label:"Grape",value:"grape"})]}),e.jsxs(a.Actions,{children:[e.jsx(m,{size:"small",children:"Small size button"},"Small"),e.jsx(m,{children:"Normal size button"},"Normal")]}),e.jsx(a.Panel,{value:"apple",children:"An apple is a round, edible fruit produced by an apple tree (Malus domestica). Apple trees are cultivated worldwide and are the most widely grown species in the genus Malus. The tree originated in Central Asia, where its wild ancestor, Malus sieversii, is still found. Apples have been grown for thousands of years in Asia and Europe and were introduced to North America by European colonists. Apples have religious and mythological significance in many cultures, including Norse, Greek, and European Christian tradition."}),e.jsx(a.Panel,{value:"orange",children:"An orange is a fruit of various citrus species in the family Rutaceae (see list of plants known as orange); it primarily refers to Citrus x sinensis, which is also called sweet orange, to distinguish it from the related Citrus x aurantium, referred to as bitter orange. The sweet orange reproduces asexually (apomixis through nucellar embryony); varieties of the sweet orange arise through mutations."}),e.jsx(a.Panel,{value:"grape",children:"A grape is a fruit, botanically a berry, of the deciduous woody vines of the flowering plant genus Vitis. Grapes are a non-climacteric type of fruit, generally occurring in clusters. The cultivation of grapes began perhaps 8,000 years ago, and the fruit has been used as human food over history. Eaten fresh or in dried form (as raisins, currants and sultanas), grapes also hold cultural significance in many parts of the world, particularly for their role in winemaking. Other grape-derived products include various types of jam, juice, vinegar and oil."})]}),ge=()=>e.jsxs(a.Wrapper,{type:"borderless",children:[e.jsxs(a.TabList,{children:[e.jsx(a.Tab,{value:"pear",label:"Pear"}),e.jsx(a.Tab,{value:"cherry",label:"Cherry"}),e.jsx(a.Tab,{value:"peach",label:"Peach"})]}),e.jsxs(a.Actions,{children:[e.jsx(m,{size:"small",children:"Small size button"},"Small"),e.jsx(m,{children:"Normal size button"},"Normal")]}),e.jsx(a.Panel,{value:"pear",children:"Pears are fruits produced and consumed around the world, growing on a tree and harvested in late summer into mid-autumn. The pear tree and shrub are a species of genus Pyrus, in the family Rosaceae, bearing the pomaceous fruit of the same name. Several species of pears are valued for their edible fruit and juices, while others are cultivated as trees."}),e.jsx(a.Panel,{value:"cherry",children:`A cherry is the fruit of many plants of the genus Prunus, and is a
        fleshy drupe (stone fruit). Commercial cherries are obtained from
        cultivars of several species, such as the sweet Prunus avium and the
        sour Prunus cerasus. The name "cherry" also refers to the cherry tree
        and its wood, and is sometimes applied to almonds and visually similar
        flowering trees in the genus Prunus, as in "ornamental cherry" or
        "cherry blossom". Wild cherry may refer to any of the cherry species
        growing outside cultivation, although Prunus avium is often referred to
        specifically by the name "wild cherry" in the British Isles.`}),e.jsx(a.Panel,{value:"peach",children:"The peach (Prunus persica) is a deciduous tree first domesticated and cultivated in Zhejiang province of Eastern China. It bears edible juicy fruits with various characteristics, most called peaches and others (the glossy-skinned, non-fuzzy varieties), nectarines."})]}),ve=()=>e.jsxs(a.Wrapper,{type:"pill",children:[e.jsxs(a.TabList,{children:[e.jsx(a.Tab,{value:"apple",children:e.jsx(a.TabIcon,{children:e.jsx(x,{})})}),e.jsx(a.Tab,{value:"orange",children:e.jsx(a.TabIcon,{children:e.jsx(x,{})})}),e.jsx(a.Tab,{value:"grape",children:e.jsx(a.TabIcon,{children:e.jsx(x,{})})})]}),e.jsx(a.Panel,{value:"apple",children:"An apple is a round, edible fruit produced by an apple tree (Malus domestica). Apple trees are cultivated worldwide and are the most widely grown species in the genus Malus. The tree originated in Central Asia, where its wild ancestor, Malus sieversii, is still found. Apples have been grown for thousands of years in Asia and Europe and were introduced to North America by European colonists. Apples have religious and mythological significance in many cultures, including Norse, Greek, and European Christian tradition."}),e.jsx(a.Panel,{value:"orange",children:"An orange is a fruit of various citrus species in the family Rutaceae (see list of plants known as orange); it primarily refers to Citrus x sinensis, which is also called sweet orange, to distinguish it from the related Citrus x aurantium, referred to as bitter orange. The sweet orange reproduces asexually (apomixis through nucellar embryony); varieties of the sweet orange arise through mutations."}),e.jsx(a.Panel,{value:"grape",children:"A grape is a fruit, botanically a berry, of the deciduous woody vines of the flowering plant genus Vitis. Grapes are a non-climacteric type of fruit, generally occurring in clusters. The cultivation of grapes began perhaps 8,000 years ago, and the fruit has been used as human food over history. Eaten fresh or in dried form (as raisins, currants and sultanas), grapes also hold cultural significance in many parts of the world, particularly for their role in winemaking. Other grape-derived products include various types of jam, juice, vinegar and oil."})]}),ye=()=>e.jsxs(a.Wrapper,{type:"borderless",children:[e.jsxs(a.TabList,{children:[e.jsxs(a.Tab,{value:"apple",children:[e.jsx(a.TabIcon,{children:e.jsx(x,{})}),e.jsx(a.TabLabel,{children:"Apple"}),e.jsx(a.TabDescription,{children:"Red fruit"})]}),e.jsxs(a.Tab,{value:"orange",children:[e.jsx(a.TabIcon,{children:e.jsx(x,{})}),e.jsx(a.TabLabel,{children:"Orange"}),e.jsx(a.TabDescription,{children:"Orange fruit"})]}),e.jsxs(a.Tab,{value:"grape",disabled:!0,children:[e.jsx(a.TabIcon,{children:e.jsx(x,{})}),e.jsx(a.TabLabel,{children:"Grape"}),e.jsx(a.TabDescription,{children:"Green fruit"})]})]}),e.jsxs(a.Actions,{children:[e.jsx(m,{size:"small",children:"Small size button"},"Small"),e.jsx(m,{children:"Normal size button"},"Normal")]}),e.jsx(a.Panel,{value:"apple",children:"An apple is a round, edible fruit produced by an apple tree (Malus domestica). Apple trees are cultivated worldwide and are the most widely grown species in the genus Malus. The tree originated in Central Asia, where its wild ancestor, Malus sieversii, is still found. Apples have been grown for thousands of years in Asia and Europe and were introduced to North America by European colonists. Apples have religious and mythological significance in many cultures, including Norse, Greek, and European Christian tradition."}),e.jsx(a.Panel,{value:"orange",children:"An orange is a fruit of various citrus species in the family Rutaceae (see list of plants known as orange); it primarily refers to Citrus x sinensis, which is also called sweet orange, to distinguish it from the related Citrus x aurantium, referred to as bitter orange. The sweet orange reproduces asexually (apomixis through nucellar embryony); varieties of the sweet orange arise through mutations."}),e.jsx(a.Panel,{value:"grape",children:"A grape is a fruit, botanically a berry, of the deciduous woody vines of the flowering plant genus Vitis. Grapes are a non-climacteric type of fruit, generally occurring in clusters. The cultivation of grapes began perhaps 8,000 years ago, and the fruit has been used as human food over history. Eaten fresh or in dried form (as raisins, currants and sultanas), grapes also hold cultural significance in many parts of the world, particularly for their role in winemaking. Other grape-derived products include various types of jam, juice, vinegar and oil."})]}),xe=()=>{const[t,s]=r.useState("Item 11"),i=[{name:"Item 1",content:"Tab Content One",disabled:!1},{name:"Item 2",content:"Tab Content Two",disabled:!1},{name:"Item 3",content:"Tab Content Three",disabled:!1},{name:"Item 4",content:"Tab Content Four",disabled:!1},{name:"Item 5",content:"Tab Content Five",disabled:!1},{name:"Item 6",content:"Tab Content Six",disabled:!0},{name:"Item 7",content:"Tab Content Seven",disabled:!1},{name:"Item 8",content:"Tab Content Eight",disabled:!1},{name:"Item 9",content:"Tab Content Nine",disabled:!0},{name:"Item 10",content:"Tab Content Ten",disabled:!1},{name:"Item 11",content:"Tab Content Eleven",disabled:!1},{name:"Item 12",content:"Tab Content Twelve",disabled:!1},{name:"Very long item number thirteen",content:"Tab Content Thirteen",disabled:!1}];return e.jsx("div",{style:{width:"60%",maxWidth:800,minWidth:250,border:"1px solid lightpink",padding:8},children:e.jsxs(a.Wrapper,{value:t,onValueChange:s,children:[e.jsx(a.TabList,{children:i==null?void 0:i.map(n=>e.jsx(a.Tab,{value:n.name,disabled:n.disabled,label:n.name},n.name))}),e.jsx(a.Actions,{children:e.jsx(m,{children:"Button"},"button")}),i.map(n=>e.jsx(a.Panel,{value:n.name,children:n.content},n.name))]})})},we=()=>{const[t,s]=r.useState("Item 11"),i=[{name:"Item 1",content:"Tab Content One",disabled:!1},{name:"Item 2",content:"Tab Content Two",disabled:!1},{name:"Item 3",content:"Tab Content Three",disabled:!1},{name:"Item 4",content:"Tab Content Four",disabled:!1},{name:"Item 5",content:"Tab Content Five",disabled:!1},{name:"Item 6",content:"Tab Content Six",disabled:!0},{name:"Item 7",content:"Tab Content Seven",disabled:!1},{name:"Item 8",content:"Tab Content Eight",disabled:!1},{name:"Item 9",content:"Tab Content Nine",disabled:!0},{name:"Item 10",content:"Tab Content Ten",disabled:!1},{name:"Item 11",content:"Tab Content Eleven",disabled:!1},{name:"Item 12",content:"Tab Content Twelve",disabled:!1},{name:"Very long item number thirteen",content:"Tab Content Thirteen",disabled:!1}];return e.jsx("div",{style:{height:"50vh",maxHeight:400,minHeight:100,border:"1px solid lightpink",padding:8},children:e.jsxs(a.Wrapper,{orientation:"vertical",value:t,onValueChange:s,children:[e.jsx(a.TabList,{children:i==null?void 0:i.map(n=>e.jsx(a.Tab,{value:n.name,disabled:n.disabled,label:n.name},n.name))}),e.jsx(a.Actions,{children:e.jsx(m,{children:"Button"},"button")}),i.map(n=>e.jsx(a.Panel,{value:n.name,children:n.content},n.name))]})})},je=()=>e.jsxs(a.Wrapper,{orientation:"vertical",type:"borderless",children:[e.jsxs(a.TabList,{children:[e.jsxs(a.Tab,{value:"apple",children:[e.jsx(a.TabIcon,{children:e.jsx(x,{})}),e.jsx(a.TabLabel,{children:"Apple"}),e.jsx(a.TabDescription,{children:"Red fruit"})]}),e.jsxs(a.Tab,{value:"orange",children:[e.jsx(a.TabIcon,{children:e.jsx(x,{})}),e.jsx(a.TabLabel,{children:"Orange"}),e.jsx(a.TabDescription,{children:"Orange fruit"})]}),e.jsxs(a.Tab,{value:"grape",children:[e.jsx(a.TabIcon,{children:e.jsx(x,{})}),e.jsx(a.TabLabel,{children:"Grape"}),e.jsx(a.TabDescription,{children:"Green fruit"})]})]}),e.jsxs(a.Actions,{children:[e.jsx(m,{size:"small",children:"Small size button"},"Small"),e.jsx(m,{children:"Normal size button"},"Normal")]}),e.jsx(a.Panel,{value:"apple",children:"An apple is a round, edible fruit produced by an apple tree (Malus domestica). Apple trees are cultivated worldwide and are the most widely grown species in the genus Malus. The tree originated in Central Asia, where its wild ancestor, Malus sieversii, is still found. Apples have been grown for thousands of years in Asia and Europe and were introduced to North America by European colonists. Apples have religious and mythological significance in many cultures, including Norse, Greek, and European Christian tradition."}),e.jsx(a.Panel,{value:"orange",children:"An orange is a fruit of various citrus species in the family Rutaceae (see list of plants known as orange); it primarily refers to Citrus x sinensis, which is also called sweet orange, to distinguish it from the related Citrus x aurantium, referred to as bitter orange. The sweet orange reproduces asexually (apomixis through nucellar embryony); varieties of the sweet orange arise through mutations."}),e.jsx(a.Panel,{value:"grape",children:"A grape is a fruit, botanically a berry, of the deciduous woody vines of the flowering plant genus Vitis. Grapes are a non-climacteric type of fruit, generally occurring in clusters. The cultivation of grapes began perhaps 8,000 years ago, and the fruit has been used as human food over history. Eaten fresh or in dried form (as raisins, currants and sultanas), grapes also hold cultural significance in many parts of the world, particularly for their role in winemaking. Other grape-derived products include various types of jam, juice, vinegar and oil."})]}),Te=()=>{const[t,s]=r.useState(0),i=()=>{switch(t){case 0:return`An apple is a round, edible fruit produced by an apple tree (Malus
          domestica). Apple trees are cultivated worldwide and are the most widely
          grown species in the genus Malus. The tree originated in Central Asia,
          where its wild ancestor, Malus sieversii, is still found. Apples have
          been grown for thousands of years in Asia and Europe and were introduced
          to North America by European colonists. Apples have religious and
          mythological significance in many cultures, including Norse, Greek, and
          European Christian tradition.`;case 1:return`An orange is a fruit of various citrus species in the family Rutaceae
        (see list of plants known as orange); it primarily refers to Citrus x
        sinensis, which is also called sweet orange, to distinguish it from the
        related Citrus x aurantium, referred to as bitter orange. The sweet
        orange reproduces asexually (apomixis through nucellar embryony);
        varieties of the sweet orange arise through mutations.`;default:return`A grape is a fruit, botanically a berry, of the deciduous woody vines of
        the flowering plant genus Vitis. Grapes are a non-climacteric type of
        fruit, generally occurring in clusters. The cultivation of grapes began
        perhaps 8,000 years ago, and the fruit has been used as human food over
        history. Eaten fresh or in dried form (as raisins, currants and
        sultanas), grapes also hold cultural significance in many parts of the
        world, particularly for their role in winemaking. Other grape-derived
        products include various types of jam, juice, vinegar and oil.`}};return e.jsx(a,{labels:[e.jsx(L,{label:"Apple"},1),e.jsx(L,{label:"Orange"},2),e.jsx(L,{label:"Grape"},3)],activeIndex:t,onTabSelected:s,actions:[e.jsx(m,{size:"small",children:"Small size button"},"Small"),e.jsx(m,{children:"Normal size button"},"Normal")],children:i()})};typeof window<"u"&&window.document&&window.document.createElement&&document.documentElement.setAttribute("data-storyloaded","");export{ge as BorderlessTabs,be as DefaultTabs,xe as HorizontalOverflow,Te as LegacyTabs,ve as PillTabs,ye as SublabelsAndIcons,je as Vertical,we as VerticalOverflow,me as default};
