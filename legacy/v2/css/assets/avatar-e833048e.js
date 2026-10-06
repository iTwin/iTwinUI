const r={1:{title:"Robin Mercer",abbr:"RM",color:"#FFC335"},2:{title:"Terry Rivers",abbr:"TR",color:"#6AB9EC"}};class n extends HTMLElement{constructor(){super()}connectedCallback(){const t=r[this.getAttribute("type")||1],s=this.getAttribute("status"),e=this.getAttribute("size")||"medium",i=this.getAttribute("showPlaceholder"),a=`
    <span
      class="iui-avatar iui-${e}"
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
    `;this.insertAdjacentHTML("afterend",a),this.remove()}}customElements.define("x-avatar",n);
