const o={1:{title:"Robin Mercer",abbr:"RM",color:"var(--iui-color-background-sunglow)"},2:{title:"Terry Rivers",abbr:"TR",color:"var(--iui-color-background-skyblue)"}};class i extends HTMLElement{constructor(){super()}connectedCallback(){const t=o[this.getAttribute("type")||1],e=this.getAttribute("status"),s=this.getAttribute("size")||"medium",r=this.getAttribute("showPlaceholder"),a=`
      <span
        class="iui-avatar"
        title="${t.title}"
        style="background-color: ${t.color};"
        ${`data-iui-size="${s}"`}
        ${e?`data-iui-status="${e}"`:""}
      >
        ${t.abbr}
        ${r?'<img src="/assets/user-placeholder.png" alt="" />':""}
      </span>`;this.insertAdjacentHTML("afterend",a),this.remove()}}customElements.define("x-avatar",i);
