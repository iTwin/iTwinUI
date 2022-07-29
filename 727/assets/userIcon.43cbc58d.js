const n={1:{title:"Robin Mercer",abbr:"RM",color:"#FFC335"},2:{title:"Terry Rivers",abbr:"TR",color:"#6AB9EC"}};class o extends HTMLElement{constructor(){super()}connectedCallback(){const t=n[this.getAttribute("type")||1],s=this.getAttribute("status"),e=this.getAttribute("size")||"medium",i=this.getAttribute("showPlaceholder"),r=`
    <span
      class="iui-user-icon iui-${e}"
      title="${t.title}"
    >
      <abbr
        class="iui-initials"
        style="background-color: ${t.color};"
      >
        ${t.abbr}
      </abbr>
      ${i?`<img
              src="./assets/user-placeholder.png"
              alt="${t.title}"
            />`:""}
      <span class="iui-stroke"></span>
      ${s?`<span
              title="${s}"
              class="iui-status iui-${s}"
            ></span>`:""}
    </span>
    `;this.insertAdjacentHTML("afterend",r),this.remove()}}customElements.define("user-icon",o);
