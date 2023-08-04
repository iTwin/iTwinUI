/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

const persons = {
  1: { title: 'Robin Mercer', abbr: 'RM', color: 'var(--iui-color-background-sunglow)' },
  2: { title: 'Terry Rivers', abbr: 'TR', color: 'var(--iui-color-background-skyblue)' },
};

/**
 * Web component for avatar. Use in other components examples to simplify html. Choose between 2 predefined types/people.
 * <x-avatar size="small" type="2"></x-avatar>
 * <x-avatar size="x-large" type="1" status="online" showPlaceholder="true"></x-avatar>
 */
class Avatar extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const person = persons[this.getAttribute('type') || 1];
    const status = this.getAttribute('status');
    const size = this.getAttribute('size') || 'medium';
    const showPlaceholder = this.getAttribute('showPlaceholder');

    const innerHtml = `
      <span
        class="iui-avatar iui-${size}"
        title="${person.title}"
        style="background-color: ${person.color};"
        ${status ? 'data-iui-status=' + status : ''}
      >
        ${person.abbr}
        ${showPlaceholder ? `<img src="./assets/user-placeholder.png" alt="" />` : ''}
      </span>`;
    this.insertAdjacentHTML('afterend', innerHtml);
    this.remove();
  }
}
customElements.define('x-avatar', Avatar); //custom html elements must have a "-" to avoid potential conflicts with native html elements
