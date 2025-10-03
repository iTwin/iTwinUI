const a=""+new URL("user-placeholder-lantlR8O.png",import.meta.url).href,i={1:{title:"Robin Mercer",abbr:"RM",color:"var(--iui-color-background-sunglow)"},2:{title:"Terry Rivers",abbr:"TR",color:"var(--iui-color-background-skyblue)"}};class l extends HTMLElement{constructor(){super()}connectedCallback(){const t=i[this.getAttribute("type")||1],e=this.getAttribute("status"),r=this.getAttribute("size")||"medium",s=this.getAttribute("showPlaceholder"),o=`
      <span
        class="iui-avatar iui-${r}"
        title="${t.title}"
        style="background-color: ${t.color};"
        ${e?"data-iui-status="+e:""}
      >
        ${t.abbr}
        ${s?`<img src=${a} alt="" />`:""}
      </span>`;this.insertAdjacentHTML("afterend",o),this.remove()}}customElements.define("x-avatar",l);
