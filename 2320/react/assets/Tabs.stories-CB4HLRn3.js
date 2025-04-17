import{r,t as $,l as J,B as I,c as C,u as z,a3 as Q,e as O,n as X,d as M,h as ee,m as V,p as ae,j as e}from"./index-eRKR2_i9.js";import{S as T}from"./Star-0irPJQh6.js";import{I as te}from"./Icon-C51axaHB.js";import{u as re}from"./useContainerWidth--sx-1RqV.js";import{B as b}from"./Button-R3u_XTwo.js";import"./ProgressRadial-CYS63bnL.js";let D=r.forwardRef((t,s)=>{let{className:n,children:i,orientation:l="horizontal",type:c="default",focusActivationMode:h="auto",color:o="blue",defaultValue:g,value:m,onValueChange:j,...x}=t,[A,E]=$(g,m,j),[N,v]=r.useState({}),[p,y]=r.useState(!1),R=J();return r.createElement(I,{className:C("iui-tabs-wrapper",`iui-${l}`,n),...x,style:{...N,...t==null?void 0:t.style},ref:s},r.createElement(k.Provider,{value:{orientation:l,type:c,activeValue:A,setActiveValue:E,setStripeProperties:v,idPrefix:R,focusActivationMode:h,hasSublabel:p,setHasSublabel:y,color:o}},i))}),W=r.forwardRef((t,s)=>{let{className:n,children:i,...l}=t,{type:c,hasSublabel:h,color:o}=z(k),g=Q(),m=r.useRef(null),[j,x]=re(c!=="default"),A=O(s,m,j,ie());return r.createElement(I,{className:C("iui-tabs",`iui-${c}`,{"iui-green":o==="green","iui-animated":c!=="default"&&g,"iui-not-animated":c!=="default"&&!g,"iui-large":h},n),role:"tablist",ref:A,...l},r.createElement(Z.Provider,{value:{tabsWidth:x,tablistRef:m}},i))}),B=r.forwardRef((t,s)=>{let{className:n,children:i,value:l,label:c,...h}=t,{orientation:o,activeValue:g,setActiveValue:m,type:j,setStripeProperties:x,idPrefix:A,focusActivationMode:E}=z(k),{tabsWidth:N,tablistRef:v}=z(Z),p=r.useRef(),y=g===l,R=X(y);M(()=>{var u,d,f;R.current&&((f=(u=p.current)==null?void 0:u.parentElement)==null||f.scrollTo({[o==="horizontal"?"left":"top"]:((d=p.current)==null?void 0:d[o==="horizontal"?"offsetLeft":"offsetTop"])-4,behavior:"instant"}))},[R,o]),M(()=>{j!=="default"&&y&&(()=>{var S,P;let d=(S=p.current)==null?void 0:S.getBoundingClientRect(),f=(P=v.current)==null?void 0:P.getBoundingClientRect(),w=d!=null&&f!=null?{horizontal:d.x-f.x,vertical:d.y-f.y}:{horizontal:0,vertical:0};x({"--iui-tabs-stripe-size":o==="horizontal"?`${d==null?void 0:d.width}px`:`${d==null?void 0:d.height}px`,"--iui-tabs-stripe-position":o==="horizontal"?`${w.horizontal}px`:`${w.vertical}px`})})()},[j,o,y,N,x,v]);let _=u=>{var S,P,G;if(u.altKey)return;let d=Array.from(((S=u.currentTarget.parentElement)==null?void 0:S.children)??[]),f=((P=p.current)==null?void 0:P.nextElementSibling)??d.at(0),w=((G=p.current)==null?void 0:G.previousElementSibling)??d.at(-1);switch(u.key){case"ArrowDown":o==="vertical"&&(f==null||f.focus(),u.preventDefault());break;case"ArrowRight":o==="horizontal"&&(f==null||f.focus(),u.preventDefault());break;case"ArrowUp":o==="vertical"&&(w==null||w.focus(),u.preventDefault());break;case"ArrowLeft":o==="horizontal"&&(w==null||w.focus(),u.preventDefault());break}},q=r.useCallback(u=>{g===void 0&&u!=null&&u.matches(":first-of-type")&&m(l)},[g,m,l]);return r.createElement(ee,{className:C("iui-tab",n),role:"tab",tabIndex:y?0:-1,"aria-selected":y,"aria-controls":`${A}-panel-${l.replaceAll(" ","-")}`,ref:O(p,s,q),...h,id:`${A}-tab-${l.replaceAll(" ","-")}`,onClick:V(t.onClick,()=>m(l)),onKeyDown:V(t.onKeyDown,_),onFocus:V(t.onFocus,()=>{var u;(u=p.current)==null||u.scrollIntoView({block:"nearest",inline:"nearest"}),E==="auto"&&!t.disabled&&m(l)})},c?r.createElement(a.TabLabel,null,c):i)}),H=r.forwardRef((t,s)=>r.createElement(te,{...t,className:C("iui-tab-icon",t==null?void 0:t.className),ref:s})),F=ae.span("iui-tab-label"),K=r.forwardRef((t,s)=>{let{className:n,children:i,...l}=t,{hasSublabel:c,setHasSublabel:h}=z(k);return M(()=>{c||h(!0)},[c,h]),r.createElement(I,{as:"span",className:C("iui-tab-description",n),ref:s,...l},i)}),U=r.forwardRef((t,s)=>{let{wrapperProps:n,className:i,children:l,...c}=t;return r.createElement(I,{...n,className:C("iui-tabs-actions-wrapper",n==null?void 0:n.className)},r.createElement(I,{className:C("iui-tabs-actions",i),ref:s,...c},l))}),Y=r.forwardRef((t,s)=>{let{value:n,className:i,children:l,...c}=t,{activeValue:h,idPrefix:o}=z(k);return r.createElement(I,{className:C("iui-tabs-content",i),"aria-labelledby":`${o}-tab-${n.replaceAll(" ","-")}`,role:"tabpanel",hidden:h!==n||void 0,ref:s,...c,id:`${o}-panel-${n.replaceAll(" ","-")}`},l)}),ne=r.forwardRef((t,s)=>{let n;t.type!=="pill"&&t.actions&&(n=t.actions,t={...t},delete t.actions);let{labels:i,onTabSelected:l,focusActivationMode:c,color:h,activeIndex:o,tabsClassName:g,contentClassName:m,wrapperClassName:j,children:x,...A}=t,[E,N]=$(0,o,l);return r.createElement(D,{className:j,focusActivationMode:c,color:h,value:`${E}`,onValueChange:v=>N(Number(v)),...A},r.createElement(W,{className:g,ref:s},i.map((v,p)=>{let y=`${p}`;return r.isValidElement(v)?r.cloneElement(v,{value:y}):r.createElement(L,{key:p,value:y,label:v})})),n&&r.createElement(U,null,n),x&&r.createElement(Y,{value:`${E}`,className:m},x))}),L=r.forwardRef((t,s)=>{let{label:n,sublabel:i,startIcon:l,children:c,value:h,...o}=t;return r.createElement(r.Fragment,null,r.createElement(B,{...o,value:h,ref:s},l&&r.createElement(H,null,l),r.createElement(F,null,n),i&&r.createElement(K,null,i),c))});const a=Object.assign(ne,{Wrapper:D,TabList:W,Tab:B,TabIcon:H,TabLabel:F,TabDescription:K,Actions:U,Panel:Y});let k=r.createContext(void 0),Z=r.createContext(void 0),ie=()=>r.useCallback(t=>{t&&t.scrollHeight>t.clientHeight&&(t.style.scrollbarGutter="stable",CSS.supports("scrollbar-gutter: stable")||(t.style.overflowY="scroll"))},[]);const he={title:"Tabs"},fe=()=>e.jsxs(a.Wrapper,{children:[e.jsxs(a.TabList,{children:[e.jsx(a.Tab,{label:"Apple",value:"apple"}),e.jsx(a.Tab,{label:"Orange",value:"orange"}),e.jsx(a.Tab,{label:"Grape",value:"grape"})]}),e.jsxs(a.Actions,{children:[e.jsx(b,{size:"small",children:"Small size button"},"Small"),e.jsx(b,{children:"Normal size button"},"Normal")]}),e.jsx(a.Panel,{value:"apple",children:"An apple is a round, edible fruit produced by an apple tree (Malus domestica). Apple trees are cultivated worldwide and are the most widely grown species in the genus Malus. The tree originated in Central Asia, where its wild ancestor, Malus sieversii, is still found. Apples have been grown for thousands of years in Asia and Europe and were introduced to North America by European colonists. Apples have religious and mythological significance in many cultures, including Norse, Greek, and European Christian tradition."}),e.jsx(a.Panel,{value:"orange",children:"An orange is a fruit of various citrus species in the family Rutaceae (see list of plants known as orange); it primarily refers to Citrus x sinensis, which is also called sweet orange, to distinguish it from the related Citrus x aurantium, referred to as bitter orange. The sweet orange reproduces asexually (apomixis through nucellar embryony); varieties of the sweet orange arise through mutations."}),e.jsx(a.Panel,{value:"grape",children:"A grape is a fruit, botanically a berry, of the deciduous woody vines of the flowering plant genus Vitis. Grapes are a non-climacteric type of fruit, generally occurring in clusters. The cultivation of grapes began perhaps 8,000 years ago, and the fruit has been used as human food over history. Eaten fresh or in dried form (as raisins, currants and sultanas), grapes also hold cultural significance in many parts of the world, particularly for their role in winemaking. Other grape-derived products include various types of jam, juice, vinegar and oil."})]}),pe=()=>e.jsxs(a.Wrapper,{type:"borderless",children:[e.jsxs(a.TabList,{children:[e.jsx(a.Tab,{value:"pear",label:"Pear"}),e.jsx(a.Tab,{value:"cherry",label:"Cherry"}),e.jsx(a.Tab,{value:"peach",label:"Peach"})]}),e.jsxs(a.Actions,{children:[e.jsx(b,{size:"small",children:"Small size button"},"Small"),e.jsx(b,{children:"Normal size button"},"Normal")]}),e.jsx(a.Panel,{value:"pear",children:"Pears are fruits produced and consumed around the world, growing on a tree and harvested in late summer into mid-autumn. The pear tree and shrub are a species of genus Pyrus, in the family Rosaceae, bearing the pomaceous fruit of the same name. Several species of pears are valued for their edible fruit and juices, while others are cultivated as trees."}),e.jsx(a.Panel,{value:"cherry",children:`A cherry is the fruit of many plants of the genus Prunus, and is a
        fleshy drupe (stone fruit). Commercial cherries are obtained from
        cultivars of several species, such as the sweet Prunus avium and the
        sour Prunus cerasus. The name "cherry" also refers to the cherry tree
        and its wood, and is sometimes applied to almonds and visually similar
        flowering trees in the genus Prunus, as in "ornamental cherry" or
        "cherry blossom". Wild cherry may refer to any of the cherry species
        growing outside cultivation, although Prunus avium is often referred to
        specifically by the name "wild cherry" in the British Isles.`}),e.jsx(a.Panel,{value:"peach",children:"The peach (Prunus persica) is a deciduous tree first domesticated and cultivated in Zhejiang province of Eastern China. It bears edible juicy fruits with various characteristics, most called peaches and others (the glossy-skinned, non-fuzzy varieties), nectarines."})]}),be=()=>e.jsxs(a.Wrapper,{type:"pill",children:[e.jsxs(a.TabList,{children:[e.jsx(a.Tab,{value:"apple",children:e.jsx(a.TabIcon,{children:e.jsx(T,{})})}),e.jsx(a.Tab,{value:"orange",children:e.jsx(a.TabIcon,{children:e.jsx(T,{})})}),e.jsx(a.Tab,{value:"grape",children:e.jsx(a.TabIcon,{children:e.jsx(T,{})})})]}),e.jsx(a.Panel,{value:"apple",children:"An apple is a round, edible fruit produced by an apple tree (Malus domestica). Apple trees are cultivated worldwide and are the most widely grown species in the genus Malus. The tree originated in Central Asia, where its wild ancestor, Malus sieversii, is still found. Apples have been grown for thousands of years in Asia and Europe and were introduced to North America by European colonists. Apples have religious and mythological significance in many cultures, including Norse, Greek, and European Christian tradition."}),e.jsx(a.Panel,{value:"orange",children:"An orange is a fruit of various citrus species in the family Rutaceae (see list of plants known as orange); it primarily refers to Citrus x sinensis, which is also called sweet orange, to distinguish it from the related Citrus x aurantium, referred to as bitter orange. The sweet orange reproduces asexually (apomixis through nucellar embryony); varieties of the sweet orange arise through mutations."}),e.jsx(a.Panel,{value:"grape",children:"A grape is a fruit, botanically a berry, of the deciduous woody vines of the flowering plant genus Vitis. Grapes are a non-climacteric type of fruit, generally occurring in clusters. The cultivation of grapes began perhaps 8,000 years ago, and the fruit has been used as human food over history. Eaten fresh or in dried form (as raisins, currants and sultanas), grapes also hold cultural significance in many parts of the world, particularly for their role in winemaking. Other grape-derived products include various types of jam, juice, vinegar and oil."})]}),me=()=>e.jsxs(a.Wrapper,{type:"borderless",children:[e.jsxs(a.TabList,{children:[e.jsxs(a.Tab,{value:"apple",children:[e.jsx(a.TabIcon,{children:e.jsx(T,{})}),e.jsx(a.TabLabel,{children:"Apple"}),e.jsx(a.TabDescription,{children:"Red fruit"})]}),e.jsxs(a.Tab,{value:"orange",children:[e.jsx(a.TabIcon,{children:e.jsx(T,{})}),e.jsx(a.TabLabel,{children:"Orange"}),e.jsx(a.TabDescription,{children:"Orange fruit"})]}),e.jsxs(a.Tab,{value:"grape",disabled:!0,children:[e.jsx(a.TabIcon,{children:e.jsx(T,{})}),e.jsx(a.TabLabel,{children:"Grape"}),e.jsx(a.TabDescription,{children:"Green fruit"})]})]}),e.jsxs(a.Actions,{children:[e.jsx(b,{size:"small",children:"Small size button"},"Small"),e.jsx(b,{children:"Normal size button"},"Normal")]}),e.jsx(a.Panel,{value:"apple",children:"An apple is a round, edible fruit produced by an apple tree (Malus domestica). Apple trees are cultivated worldwide and are the most widely grown species in the genus Malus. The tree originated in Central Asia, where its wild ancestor, Malus sieversii, is still found. Apples have been grown for thousands of years in Asia and Europe and were introduced to North America by European colonists. Apples have religious and mythological significance in many cultures, including Norse, Greek, and European Christian tradition."}),e.jsx(a.Panel,{value:"orange",children:"An orange is a fruit of various citrus species in the family Rutaceae (see list of plants known as orange); it primarily refers to Citrus x sinensis, which is also called sweet orange, to distinguish it from the related Citrus x aurantium, referred to as bitter orange. The sweet orange reproduces asexually (apomixis through nucellar embryony); varieties of the sweet orange arise through mutations."}),e.jsx(a.Panel,{value:"grape",children:"A grape is a fruit, botanically a berry, of the deciduous woody vines of the flowering plant genus Vitis. Grapes are a non-climacteric type of fruit, generally occurring in clusters. The cultivation of grapes began perhaps 8,000 years ago, and the fruit has been used as human food over history. Eaten fresh or in dried form (as raisins, currants and sultanas), grapes also hold cultural significance in many parts of the world, particularly for their role in winemaking. Other grape-derived products include various types of jam, juice, vinegar and oil."})]}),ge=()=>{const[t,s]=r.useState("Item 11"),n=[{name:"Item 1",content:"Tab Content One",disabled:!1},{name:"Item 2",content:"Tab Content Two",disabled:!1},{name:"Item 3",content:"Tab Content Three",disabled:!1},{name:"Item 4",content:"Tab Content Four",disabled:!1},{name:"Item 5",content:"Tab Content Five",disabled:!1},{name:"Item 6",content:"Tab Content Six",disabled:!0},{name:"Item 7",content:"Tab Content Seven",disabled:!1},{name:"Item 8",content:"Tab Content Eight",disabled:!1},{name:"Item 9",content:"Tab Content Nine",disabled:!0},{name:"Item 10",content:"Tab Content Ten",disabled:!1},{name:"Item 11",content:"Tab Content Eleven",disabled:!1},{name:"Item 12",content:"Tab Content Twelve",disabled:!1},{name:"Very long item number thirteen",content:"Tab Content Thirteen",disabled:!1}];return e.jsx("div",{style:{width:"60%",maxWidth:800,minWidth:250,border:"1px solid lightpink",padding:8},children:e.jsxs(a.Wrapper,{value:t,onValueChange:s,children:[e.jsx(a.TabList,{children:n==null?void 0:n.map(i=>e.jsx(a.Tab,{value:i.name,disabled:i.disabled,label:i.name},i.name))}),e.jsx(a.Actions,{children:e.jsx(b,{children:"Button"},"button")}),n.map(i=>e.jsx(a.Panel,{value:i.name,children:i.content},i.name))]})})},ve=()=>{const[t,s]=r.useState("Item 11"),n=[{name:"Item 1",content:"Tab Content One",disabled:!1},{name:"Item 2",content:"Tab Content Two",disabled:!1},{name:"Item 3",content:"Tab Content Three",disabled:!1},{name:"Item 4",content:"Tab Content Four",disabled:!1},{name:"Item 5",content:"Tab Content Five",disabled:!1},{name:"Item 6",content:"Tab Content Six",disabled:!0},{name:"Item 7",content:"Tab Content Seven",disabled:!1},{name:"Item 8",content:"Tab Content Eight",disabled:!1},{name:"Item 9",content:"Tab Content Nine",disabled:!0},{name:"Item 10",content:"Tab Content Ten",disabled:!1},{name:"Item 11",content:"Tab Content Eleven",disabled:!1},{name:"Item 12",content:"Tab Content Twelve",disabled:!1},{name:"Very long item number thirteen",content:"Tab Content Thirteen",disabled:!1}];return e.jsx("div",{style:{height:"50vh",maxHeight:400,minHeight:100,border:"1px solid lightpink",padding:8},children:e.jsxs(a.Wrapper,{orientation:"vertical",value:t,onValueChange:s,children:[e.jsx(a.TabList,{children:n==null?void 0:n.map(i=>e.jsx(a.Tab,{value:i.name,disabled:i.disabled,label:i.name},i.name))}),e.jsx(a.Actions,{children:e.jsx(b,{children:"Button"},"button")}),n.map(i=>e.jsx(a.Panel,{value:i.name,children:i.content},i.name))]})})},ye=()=>e.jsxs(a.Wrapper,{orientation:"vertical",type:"borderless",children:[e.jsxs(a.TabList,{children:[e.jsxs(a.Tab,{value:"apple",children:[e.jsx(a.TabIcon,{children:e.jsx(T,{})}),e.jsx(a.TabLabel,{children:"Apple"}),e.jsx(a.TabDescription,{children:"Red fruit"})]}),e.jsxs(a.Tab,{value:"orange",children:[e.jsx(a.TabIcon,{children:e.jsx(T,{})}),e.jsx(a.TabLabel,{children:"Orange"}),e.jsx(a.TabDescription,{children:"Orange fruit"})]}),e.jsxs(a.Tab,{value:"grape",children:[e.jsx(a.TabIcon,{children:e.jsx(T,{})}),e.jsx(a.TabLabel,{children:"Grape"}),e.jsx(a.TabDescription,{children:"Green fruit"})]})]}),e.jsxs(a.Actions,{children:[e.jsx(b,{size:"small",children:"Small size button"},"Small"),e.jsx(b,{children:"Normal size button"},"Normal")]}),e.jsx(a.Panel,{value:"apple",children:"An apple is a round, edible fruit produced by an apple tree (Malus domestica). Apple trees are cultivated worldwide and are the most widely grown species in the genus Malus. The tree originated in Central Asia, where its wild ancestor, Malus sieversii, is still found. Apples have been grown for thousands of years in Asia and Europe and were introduced to North America by European colonists. Apples have religious and mythological significance in many cultures, including Norse, Greek, and European Christian tradition."}),e.jsx(a.Panel,{value:"orange",children:"An orange is a fruit of various citrus species in the family Rutaceae (see list of plants known as orange); it primarily refers to Citrus x sinensis, which is also called sweet orange, to distinguish it from the related Citrus x aurantium, referred to as bitter orange. The sweet orange reproduces asexually (apomixis through nucellar embryony); varieties of the sweet orange arise through mutations."}),e.jsx(a.Panel,{value:"grape",children:"A grape is a fruit, botanically a berry, of the deciduous woody vines of the flowering plant genus Vitis. Grapes are a non-climacteric type of fruit, generally occurring in clusters. The cultivation of grapes began perhaps 8,000 years ago, and the fruit has been used as human food over history. Eaten fresh or in dried form (as raisins, currants and sultanas), grapes also hold cultural significance in many parts of the world, particularly for their role in winemaking. Other grape-derived products include various types of jam, juice, vinegar and oil."})]}),xe=()=>{const[t,s]=r.useState(0),n=()=>{switch(t){case 0:return`An apple is a round, edible fruit produced by an apple tree (Malus
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
        products include various types of jam, juice, vinegar and oil.`}};return e.jsx(a,{labels:[e.jsx(L,{label:"Apple"},1),e.jsx(L,{label:"Orange"},2),e.jsx(L,{label:"Grape"},3)],activeIndex:t,onTabSelected:s,actions:[e.jsx(b,{size:"small",children:"Small size button"},"Small"),e.jsx(b,{children:"Normal size button"},"Normal")],children:n()})};typeof window<"u"&&window.document&&window.document.createElement&&document.documentElement.setAttribute("data-storyloaded","");export{pe as BorderlessTabs,fe as DefaultTabs,ge as HorizontalOverflow,xe as LegacyTabs,be as PillTabs,me as SublabelsAndIcons,ye as Vertical,ve as VerticalOverflow,he as default};
