import{k as q,r as n,o as pe,B as D,e as Z,c as k,h as Ce,V as ve,m as X,l as xe,I as _,j as C,P as ee,b as ue}from"./index-XUT_GY6Q.js";import{S as ie}from"./Slider-lR-pmziV.js";import{u as P}from"./useEventListener-cJsCDl_q.js";import{I as O}from"./Input-wWYMBibM.js";import{B as me}from"./Button-D-GKNtcT.js";import"./ProgressRadial-Cxuog119.js";function ce(c,t,a){return t in c?Object.defineProperty(c,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):c[t]=a,c}let R=new Uint8Array(4),Y=new Uint32Array(R.buffer);const Ee=c=>typeof c!="string"&&"r"in c&&"g"in c&&"b"in c,we=c=>typeof c!="string"&&"h"in c&&"s"in c&&"l"in c,Ae=c=>typeof c!="string"&&"h"in c&&"s"in c&&"v"in c;class b{static create(t){return t?Ee(t)?b.fromRGB(t):we(t)?b.fromHSL(t):Ae(t)?b.fromHSV(t):typeof t=="string"?b.fromString(t,b.fromTbgr(0)):b.fromTbgr(0):b.fromTbgr(0)}toTbgr(){return this._tbgr}static fromTbgr(t){return new b(t)}static fromRgbt(t,a,l,e){return this.fromTbgr(this.computeTbgrFromComponents(t,a,l,e))}static computeTbgrFromComponents(t,a,l,e){return R[0]=t,R[1]=a,R[2]=l,R[3]=e||0,Y[0]}static fromString(t,a){let[l,e]=this.computeTbgrFromString(t,a==null?void 0:a.toTbgr());return new b(l,e)}static fromHSL(t){let a=t.a??1;return new b(this.computeTbgrFromHSL(t.h/360,t.s/100,t.l/100,Math.round((1-a)*255)),t.h)}static fromRGB(t){let a=t.a??1;return b.fromRgbt(t.r,t.g,t.b,Math.round((1-a)*255))}static fromHSV(t){let a=t.a??1,l=Math.round((1-a)*255);if(!t.s||t.h===-1){let L=255&Math.floor(255*t.v/100+.5+3e-14);return b.fromRgbt(L,L,L,0)}let e=t.h,s=t.s,i=t.v;e===360&&(e=0),e/=60;let g=Math.floor(e),p=e-g;i/=100,s/=100;let m=255&Math.floor(i*(1-s)*255+.5),h=255&Math.floor(i*(1-s*p)*255+.5),o=255&Math.floor(i*(1-s*(1-p))*255+.5),d=255&Math.floor(255*i+.5),v=0,E=0,w=0;switch(g){case 0:v=d,w=o,E=m;break;case 1:v=h,w=d,E=m;break;case 2:v=m,w=d,E=o;break;case 3:v=m,w=h,E=d;break;case 4:v=o,w=m,E=d;break;case 5:v=d,w=m,E=h;break}return new b(b.computeTbgrFromComponents(v,w,E,l),t.h)}static computeTbgrFromString(t,a){t=t.toLowerCase();let l=/^((?:rgb|hsl)a?)\(([^\)]*)\)/.exec(t);if(l){let e,s=l[1],i=l[2],g=h=>h[h.length-1]==="%",p=h=>{let o=parseFloat(h);return 255*q(g(h)?o/100:o,0,1)},m=h=>{let o=g(h)?parseFloat(h)/100*255:parseInt(h,10);return q(o,0,255)};switch(s){case"rgb":case"rgba":if(e=/^(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(i),e)return[this.computeTbgrFromComponents(m(e[1]),m(e[2]),m(e[3]),typeof e[4]=="string"?255-p(e[4]):0),void 0];break;case"hsl":case"hsla":if(e=/^(\d*\.?\d+)\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(i),e){let h=parseFloat(e[1]),o=parseInt(e[2],10)/100,d=parseInt(e[3],10)/100,v=typeof e[4]=="string"?255-p(e[4]):0;return[this.computeTbgrFromHSL(h/360,o,d,v),h]}break}}else if(l=/^\#([A-Fa-f\d]+)$/.exec(t)){let e=l[1],s=e.length;if(s===3)return[this.computeTbgrFromComponents(parseInt(e.charAt(0)+e.charAt(0),16),parseInt(e.charAt(1)+e.charAt(1),16),parseInt(e.charAt(2)+e.charAt(2),16),0),void 0];if(s===6)return[this.computeTbgrFromComponents(parseInt(e.charAt(0)+e.charAt(1),16),parseInt(e.charAt(2)+e.charAt(3),16),parseInt(e.charAt(4)+e.charAt(5),16),0),void 0];if(s===8)return[this.computeTbgrFromComponents(parseInt(e.charAt(0)+e.charAt(1),16),parseInt(e.charAt(2)+e.charAt(3),16),parseInt(e.charAt(4)+e.charAt(5),16),255-parseInt(e.charAt(6)+e.charAt(7),16)),void 0]}if(a)return[a,void 0];throw new Error("unable to parse string into ColorValue")}static getColors(t){return Y[0]=t,{b:R[2],g:R[1],r:R[0],t:R[3]}}getRgb(t){return Y[0]=this._tbgr,t?(R[0]<<24)+(R[1]<<16)+(R[2]<<8)+(255-R[3]):(R[0]<<16)+(R[1]<<8)+R[2]}getAlpha(){return b.getAlpha(this._tbgr)}static getAlpha(t){return Y[0]=t,255-R[3]}toHexString(t){if(t){let a=this.getRgb(t);return a<0&&(a=4294967295+a+1),`#${`00000000${a.toString(16)}`.slice(-8)}`}return`#${`000000${this.getRgb().toString(16)}`.slice(-6)}`}static computeTbgrFromHSL(t,a,l,e=0){let s=(h,o,d)=>(d<0&&(d+=1),d>1&&(d-=1),d<.16666666666666666?h+(o-h)*6*d:d<.5?o:d<.6666666666666666?h+(o-h)*6*(.6666666666666666-d):h),i=(h,o,d)=>Math.round(255*s(h,o,d));if(t=((h,o)=>(h%o+o)%o)(t,1),a=q(a,0,1),l=q(l,0,1),a===0)return l*=255,this.computeTbgrFromComponents(l,l,l,e);let p=l<=.5?l*(1+a):l+a-l*a,m=2*l-p;return this.computeTbgrFromComponents(i(m,p,t+1/3),i(m,p,t),i(m,p,t-1/3),e)}toHslColor(){return{...b.toHsl(this._tbgr),...this._hue!=null&&{h:this._hue}}}static toHsl(t){let{r:a,g:l,b:e}=b.getColors(t),s=a/255,i=l/255,g=e/255,p=Math.min(s,i,g),m=Math.max(s,i,g),h=m-p,o=0,d=0;o=h===0?0:s===m?(i-g)/h%6:i===m?(g-s)/h+2:(s-i)/h+4,o=Math.round(60*o),o<0&&(o+=360);let v=(m+p)/2;return d=h===0?0:h/(1-Math.abs(2*v-1)),d=Number((100*d).toFixed(1)),v=Number((100*v).toFixed(1)),{h:o,s:d,l:v,a:this.getAlpha(t)/255}}toRgbColor(){let{r:t,g:a,b:l}=b.getColors(this._tbgr);return{r:t,g:a,b:l,a:this.getAlpha()/255}}toHsvColor(){return{...b.toHsv(this._tbgr),...this._hue!=null&&{h:this._hue}}}static toHsv(t){let{r:a,g:l,b:e}=b.getColors(t),s=a/255,i=l/255,g=e/255,p=Math.min(s,i,g),m=Math.max(s,i,g),h=m-p,o=0;o=h===0?0:s===m?(i-g)/h%6:i===m?(g-s)/h+2:(s-i)/h+4,o=Math.round(60*o),o<0&&(o+=360);let d=m,v=m===0?0:h/m;return v=Number((100*v).toFixed(1)),d=Number((100*d).toFixed(1)),{h:o,s:v,v:d,a:this.getAlpha(t)/255}}equals(t){return this._tbgr===t._tbgr}static getFormattedColorNumber(t,a=1){return a===0&&Math.round(t).toString(),Number(t.toFixed(a)).toString()}toRgbString(t){let a=this.toRgbColor(),l=`${a.r}, ${a.g}, ${a.b}`;if(t){let e=a.a??1;return`rgba(${l}, ${b.getFormattedColorNumber(e,2)})`}return`rgb(${l})`}toHslString(t){let a=this.toHslColor(),l=`${b.getFormattedColorNumber(this._hue??a.h)}, ${b.getFormattedColorNumber(a.s)}%, ${b.getFormattedColorNumber(a.l)}%`;if(t){let e=a.a??1;return`hsla(${l}, ${b.getFormattedColorNumber(e,2)})`}return`hsl(${l})`}toHsvString(t){let a=this.toHsvColor(),l=`${this._hue??a.h}, ${a.s}%, ${a.v}%`;if(t){let e=a.a??1;return`hsva(${l}, ${b.getFormattedColorNumber(e,2)})`}return`hsv(${l})`}constructor(t,a){ce(this,"_tbgr",void 0),ce(this,"_hue",void 0),Y[0]=t,this._tbgr=Y[0],this._hue=a}}const Ne=c=>n.createElement(pe,c,n.createElement("path",{d:"m5 15-3.78125-3.5 3.78125-3.5v2h8v3h-8zm6-7 3.78125-3.5-3.78125-3.5v2h-8v3h8z"})),he=n.createContext(void 0),te=()=>{let c=n.useContext(he);if(c==null)throw new Error("useColorPickerContext must be used within a ColorPickerContext.Provider");return c},re=c=>c instanceof b?c:b.create(c),ae=n.forwardRef((c,t)=>{let{children:a,className:l,selectedColor:e,onChange:s,onChangeComplete:i,showAlpha:g=!1,applyBackground:p=!0,...m}=c,h=n.useRef(null),o=n.useMemo(()=>re(e),[e]),d=n.useRef(o.toTbgr()),[v,E]=n.useState(o);n.useEffect(()=>{E(o)},[o]);let[w,L]=n.useState(()=>v.toHsvColor());n.useEffect(()=>{o.toTbgr()!==d.current&&(d.current=o.toTbgr(),L(o.toHsvColor()))},[o]);let u=n.useCallback((N,I,U)=>{L(N);let j=U??b.create(N);I?i==null||i(j):s==null||s(j),d.current=j.toTbgr(),E(j)},[s,i]);return n.createElement(D,{className:k("iui-color-picker",{"iui-popover-surface":p},l),ref:Z(h,t),...m},n.createElement(he.Provider,{value:{activeColor:v,setActiveColor:E,hsvColor:w,applyHsvColorChange:u,onChangeComplete:i,showAlpha:g}},a))}),V=n.forwardRef((c,t)=>{let{color:a,style:l,onClick:e,isActive:s,className:i,...g}=c,p=n.useMemo(()=>typeof a=="string"?a:re(a).toHslString(!0),[a]);return n.createElement(D,{as:e?Ce:"span",className:k("iui-color-swatch",{"iui-active":s},i),style:{"--iui-color-swatch-background":p,...l},onClick:e,"aria-pressed":e&&s?"true":void 0,ref:t,...g},c.children??n.createElement(ve,null,p.toUpperCase()))});let Se=(c,t)=>(q(t,c.top,c.bottom)-c.top)/c.height*100,Re=(c,t)=>(q(t,c.left,c.right)-c.left)/c.width*100;const ge=n.forwardRef((c,t)=>{var oe,le,se;let{className:a,colorFieldProps:l,colorDotProps:e,opacitySliderProps:s,hueSliderProps:i,...g}=c,p=n.useRef(void 0),m=Z(p,t),{activeColor:h,hsvColor:o,onChangeComplete:d,applyHsvColorChange:v,showAlpha:E}=te(),w=n.useMemo(()=>b.create({h:o.h,s:100,v:100}),[o.h]),L=n.useMemo(()=>o.h,[o]),u=n.useMemo(()=>E?o.a??1:1,[o.a,E]),N=n.useMemo(()=>h.toHexString(),[h]),[I,U]=n.useState(!1),j=w.toHexString(),F=100-o.v,A=o.s,J=n.useCallback((f,x)=>{let K={h:Number(f.toFixed(2)),s:o.s,v:o.v,a:o.a};v(K,x)},[v,o]),Q=n.useCallback((f,x)=>{let y=Number(f.toFixed(2)),K={h:o.h,s:o.s,v:o.v,a:y};v(K,x)},[v,o]),z=n.useRef(null),W=n.useRef(null),$=n.useCallback((f,x,y)=>{let K={h:o.h,s:f,v:100-x,a:o.a};v(K,y)},[v,o]),r=n.useCallback((f,x)=>{if(z.current&&I||z.current&&x==="onClick"){let y=Re(z.current.getBoundingClientRect(),f.clientX),K=Se(z.current.getBoundingClientRect(),f.clientY);x==="onChange"?$(y,K,!0):$(y,K,!1)}},[I,$]),S=n.useCallback(f=>{I&&(r(f,"onChange"),U(!1),f.preventDefault(),f.stopPropagation())},[I,r]);P("pointerup",S,(oe=p.current)==null?void 0:oe.ownerDocument);let T=n.useCallback(f=>{I&&(f.preventDefault(),f.stopPropagation(),r(f,"onUpdate"))},[I,r]);P("pointermove",T,(le=p.current)==null?void 0:le.ownerDocument);let M=n.useCallback(f=>{I&&(r(f,"onChange"),U(!1))},[I,r]);P("pointerleave",M,(se=p.current)==null?void 0:se.ownerDocument);let H=n.useRef({}),B=f=>{if(f.altKey)return;let x=A,y=F;switch(H.current[f.key]=!0,f.key){case"ArrowDown":y=Math.min(y+1,100),$(x,y,!1);break;case"ArrowUp":y=Math.max(y-1,0),$(x,y,!1);break;case"ArrowLeft":x=Math.max(x-1,0),$(x,y,!1);break;case"ArrowRight":x=Math.min(x+1,100),$(x,y,!1);break}},de=f=>{switch(H.current[f.key]=!1,f.key){case"ArrowUp":case"ArrowDown":case"ArrowLeft":case"ArrowRight":if(H.current.ArrowUp||H.current.ArrowDown||H.current.ArrowLeft||H.current.ArrowRight)return;d==null||d(b.create(o));break}};return n.createElement(D,{className:k("iui-color-selection-wrapper",a),ref:m,...g},n.createElement(D,{as:"div",...l,className:k("iui-color-field",l==null?void 0:l.className),style:{"--iui-color-field-hue":j,"--iui-color-picker-selected-color":N,...l==null?void 0:l.style},ref:Z(z,l==null?void 0:l.ref),onPointerDown:X(l==null?void 0:l.onPointerDown,f=>{var x;f.preventDefault(),r(f,"onClick"),U(!0),(x=W.current)==null||x.focus()})},n.createElement(D,{as:"div",...e,className:k("iui-color-dot",e==null?void 0:e.className),style:{"--iui-color-dot-inset-block":`${F.toString()}% auto`,"--iui-color-dot-inset-inline":`${A.toString()}% auto`,...e==null?void 0:e.style},onPointerDown:X(e==null?void 0:e.onPointerDown,()=>{var f;U(!0),(f=W.current)==null||f.focus()}),onKeyDown:X(e==null?void 0:e.onKeyDown,B),onKeyUp:X(e==null?void 0:e.onKeyUp,de),tabIndex:0,ref:Z(W,e==null?void 0:e.ref)})),n.createElement(ie,{minLabel:"",maxLabel:"",values:[L],trackDisplayMode:"none",min:0,max:359,...i,className:k("iui-hue-slider",i==null?void 0:i.className),tooltipProps:()=>({visible:!1,...i==null?void 0:i.tooltipProps}),onChange:f=>{var x;(x=i==null?void 0:i.onChange)==null||x.call(i,f),J(f[0],!0)},onUpdate:f=>{var x;(x=i==null?void 0:i.onUpdate)==null||x.call(i,f),J(f[0],!1)},thumbProps:()=>({"aria-label":"Hue",...i==null?void 0:i.thumbProps})}),E&&n.createElement(ie,{minLabel:"",maxLabel:"",values:[u],trackDisplayMode:"none",min:0,max:1,step:.01,...s,className:k("iui-opacity-slider",s==null?void 0:s.className),tooltipProps:()=>({visible:!1,...s==null?void 0:s.tooltipProps}),onChange:f=>{var x;(x=s==null?void 0:s.onChange)==null||x.call(s,f),Q(f[0],!0)},onUpdate:f=>{var x;(x=s==null?void 0:s.onUpdate)==null||x.call(s,f),Q(f[0],!1)},style:{"--iui-color-picker-selected-color":j,...s==null?void 0:s.style},thumbProps:()=>({"aria-label":"Opacity",...s==null?void 0:s.thumbProps})}))}),fe=n.forwardRef((c,t)=>{let{defaultColorFormat:a,allowedColorFormats:l=["hsl","rgb","hex"],className:e,colorInputContainerProps:s,panelLabelProps:i,inputFieldsGroupProps:g,swapColorFormatButtonProps:p,...m}=c,h=n.useRef(null),{activeColor:o,applyHsvColorChange:d,hsvColor:v,showAlpha:E}=te(),[w,L]=n.useState(a);n.useEffect(()=>{L(a)},[a]);let[u,N]=n.useState(["","","",""]);n.useEffect(()=>{if(w==="hsl"){let r=o.toHslColor();N([b.getFormattedColorNumber(v.h),b.getFormattedColorNumber(r.s),b.getFormattedColorNumber(r.l),b.getFormattedColorNumber(r.a??o.getAlpha()/255,2)])}else if(w==="rgb"){let r=o.toRgbColor();N([r.r.toString(),r.g.toString(),r.b.toString(),b.getFormattedColorNumber(r.a??o.getAlpha()/255,2)])}else N([o.toHexString(E)]),U(!0)},[o,v.h,w,E]);let[I,U]=n.useState(!0),j=n.useCallback(()=>{let r=l[(l.indexOf(w)+1)%l.length]??l[0];L(r)},[w,l]),F=r=>!!(r&&h.current&&h.current.contains(r)),A=()=>{let r;if(w==="hex")try{let S=u[0].replace(/ /g,"").toLowerCase();if(r=b.create(S),U(!0),o.toHexString(E).toLowerCase()===S)return}catch{U(!1);return}if(w==="hsl"){let[S,T,M,H]=u.map(Number);if(S<0||S>360||T<0||T>100||M<0||M>100||H<0||H>1)return;let B=o.toHslColor();if(B.h===S&&B.s===T&&B.l===M&&B.a===H)return;r=b.create({h:S,s:T,l:M,a:H})}if(w==="rgb"){let[S,T,M,H]=u.map(Number);if(S<0||S>255||T<0||T>255||M<0||M>255||H<0||H>1)return;let B=o.toRgbColor();if(B.r===S&&B.g===T&&B.b===M&&B.a===H)return;r=b.create({r:S,g:T,b:M,a:H})}r&&d(r.toHsvColor(),!0,r)},J=n.createElement(O,{size:"small",maxLength:E?9:7,minLength:1,placeholder:"HEX","aria-label":"Hex",value:u[0],onChange:r=>{let S=r.target.value.startsWith("#")?r.target.value:`#${r.target.value}`;N([S])},onKeyDown:r=>{r.key==="Enter"&&(r.preventDefault(),A())},onBlur:r=>{r.preventDefault(),A()},status:I?void 0:"negative"}),Q=n.createElement(n.Fragment,null,n.createElement(O,{size:"small",type:"number",min:"0",max:"359",step:".1",placeholder:"H","aria-label":"Hue",value:u[0]??"",onChange:r=>{N([r.target.value,u[1],u[2],u[3]])},onKeyDown:r=>{r.key==="Enter"&&(r.preventDefault(),A())},onBlur:r=>{r.preventDefault(),F(r.relatedTarget)||A()},status:Number(u[0])<0||Number(u[0])>360?"negative":void 0}),n.createElement(O,{size:"small",type:"number",min:"0",max:"100",step:".1",placeholder:"S","aria-label":"Saturation",value:u[1]??"",onChange:r=>{N([u[0],r.target.value,u[2],u[3]])},onKeyDown:r=>{r.key==="Enter"&&(r.preventDefault(),A())},onBlur:r=>{r.preventDefault(),F(r.relatedTarget)||A()},status:Number(u[1])<0||Number(u[1])>100?"negative":void 0}),n.createElement(O,{size:"small",type:"number",min:"0",max:"100",step:".1",placeholder:"L","aria-label":"Lightness",value:u[2]??"",onChange:r=>{N([u[0],u[1],r.target.value,u[3]])},onKeyDown:r=>{r.key==="Enter"&&(r.preventDefault(),A())},onBlur:r=>{r.preventDefault(),F(r.relatedTarget)||A()},status:Number(u[2])<0||Number(u[2])>100?"negative":void 0}),E&&n.createElement(O,{size:"small",type:"number",min:"0",max:"1",step:".01",placeholder:"A","aria-label":"Alpha",value:u[3]??"",onChange:r=>{N([u[0],u[1],u[2],r.target.value])},onKeyDown:r=>{r.key==="Enter"&&(r.preventDefault(),A())},onBlur:r=>{r.preventDefault(),F(r.relatedTarget)||A()},status:Number(u[3])<0||Number(u[3])>1?"negative":void 0})),z=n.createElement(n.Fragment,null,n.createElement(O,{size:"small",type:"number",min:"0",max:"255",placeholder:"R","aria-label":"Red",value:u[0]??"",onChange:r=>{N([r.target.value,u[1],u[2],u[3]])},onKeyDown:r=>{r.key==="Enter"&&(r.preventDefault(),A())},onBlur:r=>{r.preventDefault(),F(r.relatedTarget)||A()},status:Number(u[0])<0||Number(u[0])>255?"negative":void 0}),n.createElement(O,{size:"small",type:"number",min:"0",max:"255",placeholder:"G","aria-label":"Green",value:u[1]??"",onChange:r=>{N([u[0],r.target.value,u[2],u[3]])},onKeyDown:r=>{r.key==="Enter"&&(r.preventDefault(),A())},onBlur:r=>{r.preventDefault(),F(r.relatedTarget)||A()},status:Number(u[1])<0||Number(u[1])>255?"negative":void 0}),n.createElement(O,{size:"small",type:"number",min:"0",max:"255",placeholder:"B","aria-label":"Blue",value:u[2]??"",onChange:r=>{N([u[0],u[1],r.target.value,u[3]])},onKeyDown:r=>{r.key==="Enter"&&(r.preventDefault(),A())},onBlur:r=>{r.preventDefault(),F(r.relatedTarget)||A()},status:Number(u[2])<0||Number(u[2])>255?"negative":void 0}),E&&n.createElement(O,{size:"small",type:"number",min:"0",max:"1",step:".01",placeholder:"A","aria-label":"Alpha",value:u[3]??"",onChange:r=>{N([u[0],u[1],u[2],r.target.value])},onKeyDown:r=>{r.key==="Enter"&&(r.preventDefault(),A())},onBlur:r=>{r.preventDefault(),F(r.relatedTarget)||A()},status:Number(u[3])<0||Number(u[3])>1?"negative":void 0})),W=xe(),$=(i==null?void 0:i.id)??W;return n.createElement(D,{as:"div",className:k("iui-color-input-wrapper",e),ref:t,...m},n.createElement(D,{as:"div",...i,className:k("iui-color-picker-section-label",i==null?void 0:i.className),id:$},E&&w!=="hex"?w.toUpperCase()+"A":w.toUpperCase()),n.createElement(D,{as:"div",...s,className:k("iui-color-input",s==null?void 0:s.className)},l.length>1&&n.createElement(_,{size:"small",styleType:"borderless",label:"Switch format",...p,onClick:X(p==null?void 0:p.onClick,j)},n.createElement(Ne,null)),n.createElement(D,{as:"div",role:w!=="hex"?"group":void 0,"aria-labelledby":w!=="hex"?$:void 0,...g,ref:Z(h,g==null?void 0:g.ref),className:k("iui-color-input-fields",g==null?void 0:g.className)},w==="hex"&&J,w==="rgb"&&z,w==="hsl"&&Q)))}),ne=n.forwardRef((c,t)=>{let{colors:a,label:l,labelProps:e,className:s,children:i,paletteContainerProps:g,...p}=c,{activeColor:m,setActiveColor:h,onChangeComplete:o}=te();return n.createElement(D,{className:k("iui-color-palette-wrapper",s),ref:t,...p},l&&n.createElement(D,{as:"div",...e,className:k("iui-color-picker-section-label",e==null?void 0:e.className)},l),n.createElement(D,{as:"div",...g,className:k("iui-color-palette",g==null?void 0:g.className)},i,a&&a.map((d,v)=>{let E=re(d);return n.createElement(V,{key:v,color:E,onClick:()=>{o==null||o(E),h(E)},isActive:E.equals(m)})})))}),be=c=>n.createElement("svg",{viewBox:"0 0 16 16",width:"1rem",height:"1rem",fill:"var(--iui-color-icon-muted, currentColor)",...c},n.createElement("path",{d:"M5 15l-3.781-3.5L5 8v2h8v3H5zm6-7l3.781-3.5L11 1v2H3v3h8z"})),Fe={title:"ColorPicker"},G=[{color:"#ffffff",name:"WHITE"},{color:"#5a6973",name:"GREY"},{color:"#00121d",name:"KURETAKE BLACK MANGA"},{color:"#002a44",name:"RHAPSODY IN BLUE"},{color:"#00426b",name:"DARK IMPERIAL BLUE"},{color:"#005a92",name:"JETSKI RACE"},{color:"#0073ba",name:"FRENCH BLUE"},{color:"#008be1",name:"BLUE COLA"},{color:"#30b0ff",name:"FANTASY CONSOLE SKY"},{color:"#58bfff",name:"HELLO SUMMER"},{color:"#7fceff",name:"CHROMIS DAMSEL BLUE"},{color:"#a6ddff",name:"DROPLET"},{color:"#cdecff",name:"LUCID DREAMS"},{color:"#e5f5fd",name:"KODAMA WHITE"},{color:"#010200",name:"REGISTRATION BLACK"},{color:"#122306",name:"YUZU SOY"},{color:"#23450b",name:"FOREST GREEN"},{color:"#346711",name:"TATZELWURM GREEN"},{color:"#458816",name:"CHLOROPHYLL"},{color:"#56aa1c",name:"PLASTIC PINES"},{color:"#5fbb1f",name:"FIELD GREEN"},{color:"#67cc22",name:"GREEN HIGH"},{color:"#91e458",name:"LILLIPUTIAN LIME"},{color:"#b2ec8b",name:"GREEN DAY"},{color:"#d4f4bd",name:"TEA GREEN"},{color:"#eef6e8",name:"VERDE PASTEL"},{color:"#9ba5af",name:"SERYI GREY"},{color:"#cf0000",name:"RED EPIPHYLLUM"},{color:"#ff6300",name:"SAFETY ORANGE"},{color:"#ffc335",name:"RISE-N-SHINE"}],Te=()=>{const[c,t]=n.useState(!1),[a,l]=n.useState(G[5]),[e,s]=n.useState(G[5].name),i=g=>{const p=g.toHexString(),m=G.findIndex(h=>h.color===p.toLowerCase());l(G[m]),s(G[m].name),console.log(`Selected ${G[m].color}`)};return C.jsxs(C.Fragment,{children:[C.jsx(ee,{content:C.jsx(ae,{selectedColor:a.color,onChangeComplete:i,children:C.jsx(ne,{colors:G.map(({color:g})=>g)})}),visible:c,onVisibleChange:t,placement:"bottom-start",children:C.jsx(_,{label:"Show color picker",children:C.jsx(V,{style:{pointerEvents:"none"},color:a.color})})}),C.jsx("span",{style:{marginLeft:16},children:e})]})},Me=()=>{const[c,t]=n.useState(!1),[a,l]=n.useState(b.create({h:0,s:100,l:50})),e=["hsl","rgb","hex"],[s,i]=n.useState(e[0]),g=m=>{l(m),console.log(`Selected ${p(m)}`)},p=(m=a)=>{switch(s){case"hsl":return m.toHslString();case"rgb":return m.toRgbString();case"hex":return m.toHexString().toUpperCase()}};return C.jsx(C.Fragment,{children:C.jsxs(ue,{children:[C.jsx(ee,{content:C.jsxs(ae,{selectedColor:a,onChangeComplete:g,children:[C.jsx(ge,{}),C.jsx(fe,{defaultColorFormat:s}),C.jsx(ne,{label:"Saved Colors",colors:[{h:0,s:100,l:50},{r:255,g:98,b:0},"#fec134","#5A6973",{h:95,s:83,v:72},{h:250,s:100,l:59}]})]}),visible:c,onVisibleChange:t,placement:"bottom-start",children:C.jsx(_,{label:"Show color picker",children:C.jsx(V,{style:{pointerEvents:"none"},color:a})})}),C.jsx(me,{onClick:()=>{i(e[(e.indexOf(s)+1)%e.length])},endIcon:C.jsx(be,{}),children:C.jsx("div",{style:{width:170},children:p()??"No color selected."})})]})})},Be=()=>{const[c,t]=n.useState(!1),[a,l]=n.useState(b.create({r:90,g:105,b:115,a:.4})),e=["hsl","rgb","hex"],[s,i]=n.useState(e[0]),g=m=>{l(m),console.log(`Selected ${p(m)}`)},p=(m=a)=>{switch(s){case"hsl":return m.toHslString(!0);case"rgb":return m.toRgbString(!0);case"hex":return m.toHexString(!0)}};return C.jsx(C.Fragment,{children:C.jsxs(ue,{children:[C.jsx(ee,{content:C.jsxs(ae,{selectedColor:a,onChangeComplete:g,showAlpha:!0,children:[C.jsx(ge,{}),C.jsx(fe,{defaultColorFormat:s}),C.jsx(ne,{label:"Saved Colors",colors:[{r:90,g:105,b:115,a:1},{r:90,g:105,b:115,a:.81},{r:90,g:105,b:115,a:.4}]})]}),visible:c,onVisibleChange:t,placement:"bottom-start",children:C.jsx(_,{label:"Show color picker",children:C.jsx(V,{style:{pointerEvents:"none"},color:a})})}),C.jsx(me,{onClick:()=>{i(e[(e.indexOf(s)+1)%e.length])},endIcon:C.jsx(be,{}),children:C.jsx("div",{style:{width:200},children:p()??"No color selected."})})]})})};typeof window<"u"&&window.document&&window.document.createElement&&document.documentElement.setAttribute("data-storyloaded","");export{Me as Advanced,Te as Basic,Be as WithAlpha,Fe as default};
