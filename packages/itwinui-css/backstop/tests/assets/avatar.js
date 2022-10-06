/**
 * Web component for avatar. Use in other components examples to simplify html. Choose between 2 predefined types/people.
 * <x-avatar size="s" type="2"></x-avatar>
 * <x-avatar size="l" type="1" status="online" showPlaceholder="true"></x-avatar>
 */
const persons = {
  1: {
    title: 'Robin Mercer',
    abbr: 'RM',
    color: '#FFC335',
  },
  2: {
    title: 'Terry Rivers',
    abbr: 'TR',
    color: '#6AB9EC',
  },
};

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
      class="iui-avatar"
      title="${person.title}"
      style="--iui-avatar-background-color: ${person.color};"
      data-iui-size="${size}"
      ${status ? `data-iui-status="${status}"` : ''}
    >
      <abbr class="iui-avatar-initials">
        ${person.abbr}
      </abbr>
      ${
        showPlaceholder
          ? `<img
              class="iui-avatar-image"
              src="./assets/user-placeholder.png"
              loading="lazy"
              draggable="false"
              alt="${person.title}"
            />`
          : ''
      }
      ${
        status
          ? `<span
              title="${status}"
              class="iui-avatar-status"
            ></span>`
          : ''
      }
    </span>
    `;
    this.insertAdjacentHTML('afterend', innerHtml);
    this.remove();
  }
}
customElements.define('x-avatar', Avatar); //custom html elements must have a "-" to avoid potential conflicts with native html elements
