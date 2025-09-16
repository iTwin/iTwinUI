import"./theme-fH0jGVlM.js";import"./placeholder-ELKpkxom.js";import"./status-success-8DTPpFkn.js";import"./status-error-LCTudmju.js";import"./caret-down-small-XTq1M1y1.js";import"./close-small-JsqxqIy1.js";class i extends HTMLElement{constructor(){super()}connectedCallback(){const t=this.getAttribute("value"),e=this.hasAttribute("dismissible"),s=`
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
