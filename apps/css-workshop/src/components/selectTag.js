/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/**
 * Web component for multi select tag. Use in other components examples to simplify html.
 * <multi-select-tag value="Option 1"></multi-select-tag>
 */
class SelectTag extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const value = this.getAttribute('value');
    const dismissible = this.hasAttribute('dismissible');

    const innerHtml = `
    <span
      class="iui-select-tag"
    >
      <span
        class="iui-select-tag-label"
        title="${value}"
      >
        ${value}
      </span>
      ${
        dismissible
          ? `<button class="iui-button iui-field iui-select-tag-button" data-iui-variant="borderless" aria-label="Delete ${value} tag" type="button">
            <svg-close-small class="iui-button-icon iui-select-tag-button-icon" aria-hidden="true"></svg-close-small>
          </button>`
          : ''
      }
    </span>
    `;
    this.parentElement.insertAdjacentHTML('beforeend', innerHtml);
    this.remove();
  }
}
customElements.define('multi-select-tag', SelectTag);
