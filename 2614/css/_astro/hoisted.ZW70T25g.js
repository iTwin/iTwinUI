import"./placeholder.CRc5Ch11.js";import"./status-success.Dxes4O5Q.js";import"./hoisted.BZ3Up2xX.js";import"./hoisted.BC0Cd4gU.js";import"./hoisted.BfyBjpme.js";import"./hoisted.B1ALVQVo.js";class s extends HTMLElement{constructor(){super()}connectedCallback(){const t=this.getAttribute("value"),e=this.hasAttribute("dismissible"),i=`
    <span
      class="iui-tag iui-select-tag"
    >
      <span
        class="iui-tag-label iui-select-tag-label"
        title="${t}"
      >
        ${t}
      </span>
      ${e?`<button class="iui-button iui-field iui-tag-button iui-select-tag-button" data-iui-variant="borderless" aria-label="Delete ${t} tag" type="button">
            <svg-close-small class="iui-button-icon" aria-hidden="true"></svg-close-small>
          </button>`:""}
    </span>
    `;this.parentElement.insertAdjacentHTML("beforeend",i),this.remove()}}customElements.define("multi-select-tag",s);
