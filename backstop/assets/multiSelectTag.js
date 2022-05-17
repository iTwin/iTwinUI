/**
 * Web component for multi select tag. Use in other components examples to simplify html.
 * <multi-select-tag value="Option 1"></multi-select-tag>
 */
class MultiSelectTag extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const value = this.getAttribute('value');
    const dismissible = this.hasAttribute('dismissible');

    const innerHtml = `
    <span
      class="iui-multi-select-tag"
      tabindex="0"
    >
      <span
        class="iui-multi-select-tag-label"
        title="${value}"
      >
        ${value}
      </span>
      ${
        dismissible
          ? `<button class="iui-multi-select-tag-button" aria-label="Delete tag" type="button" tabindex="-1">
            <svg-close-small class="iui-multi-select-tag-button-icon" aria-hidden="true"></svg-close-small>
          </button>`
          : ''
      }
    </span>
    `;
    this.parentElement.insertAdjacentHTML('beforeend', innerHtml);
    this.remove();
  }
}
customElements.define('multi-select-tag', MultiSelectTag);
