import"./anchor-f5abe173.js";import"./location-marker-232b6b62.js";import"./status-success-82f14d39.js";import"./textarea-d55b9268.js";import"./fieldset-689418be.js";import"./tag-d945e726.js";class i extends HTMLElement{constructor(){super()}connectedCallback(){const t=this.getAttribute("value"),e=this.hasAttribute("dismissible"),s=`
    <span
      class="iui-select-tag"
    >
      <span
        class="iui-select-tag-label"
        title="${t}"
      >
        ${t}
      </span>
      ${e?`<button class="iui-select-tag-button" aria-label="Delete ${t} tag" type="button">
            <svg-close-small class="iui-select-tag-button-icon" aria-hidden="true"></svg-close-small>
          </button>`:""}
    </span>
    `;this.parentElement.insertAdjacentHTML("beforeend",s),this.remove()}}customElements.define("multi-select-tag",i);
