import"./theme.659344b6.js";import"./placeholder.f3e63e81.js";import"./status-success.e39cba75.js";import"./status-error.84b0e608.js";import"./caret-down-small.28fe751d.js";import"./close-small.5bb6ab75.js";class i extends HTMLElement{constructor(){super()}connectedCallback(){const t=this.getAttribute("value"),e=this.hasAttribute("dismissible"),s=`
    <span
      class="iui-select-tag"
      tabindex="0"
    >
      <span
        class="iui-select-tag-label"
        title="${t}"
      >
        ${t}
      </span>
      ${e?`<button class="iui-select-tag-button" aria-label="Delete tag" type="button" tabindex="-1">
            <svg-close-small class="iui-select-tag-button-icon" aria-hidden="true"></svg-close-small>
          </button>`:""}
    </span>
    `;this.parentElement.insertAdjacentHTML("beforeend",s),this.remove()}}customElements.define("multi-select-tag",i);
