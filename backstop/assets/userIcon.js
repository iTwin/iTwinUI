/**
 * Web component for user icon. Use in other components examples to simplify html. Choose between 2 predefined types/people.
 * <user-icon size="small" type="2"></user-icon>
 * <user-icon size="x-large" type="1" status="online" showPlaceholder="true"></user-icon>
 */
const persons = {
  1: {
    src: 'https://itwinplatformcdn.azureedge.net/iTwinUI/user-icon-1.jpg',
    title: 'Robin Mercer',
    abbr: 'RM',
    color: '#FFC335',
  },
  2: {
    src: 'https://itwinplatformcdn.azureedge.net/iTwinUI/user-icon-2.jpg',
    title: 'Terry Rivers',
    abbr: 'TR',
    color: '#6AB9EC',
  },
};

const statusIcons = {
  online: `<!-- Use checkmark.svg from @itwin/itwinui-icons package. -->
  <svg class="iui-status-symbol" aria-hidden="true" viewBox="0 0 16 16">
    <path d="M6,14L0,8l2-2l4,4l8-8l2,2L6,14z" />
  </svg>`,
  away: `<!-- Use away.svg from @itwin/itwinui-icons package. -->
  <svg class="iui-status-symbol" aria-hidden="true" viewBox="0 0 16 16" >
    <path d="m13.445 12.832-6.445-4.297v-7.535h2v6.465l5.555 3.703z"/>
  </svg>`,
  offline: `<!-- Use close-small.svg from @itwin/itwinui-icons package. -->
  <svg class="iui-status-symbol" aria-hidden="true" viewBox="0 0 16 16">
    <path d="m12.5 2-4.5 4.5-4.5-4.5-1.5 1.5 4.5 4.5-4.5 4.5 1.5 1.5 4.5-4.5 4.5 4.5 1.5-1.5-4.5-4.5 4.5-4.5z"/>
  </svg>`,
};

class UserIcon extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const person = persons[this.getAttribute('type') || 1];
    const status = this.getAttribute('status');
    const size = this.getAttribute('size') || 'medium';
    const icon = statusIcons[status];
    const showPlaceholder = this.getAttribute('showPlaceholder');

    const innerHtml = `
    <span
      class="iui-user-icon iui-${size}"
      title="${person.title}"
    >
      <abbr
        class="iui-initials"
        style="background-color: ${person.color};"
      >
        ${person.abbr}
      </abbr>
      ${
        showPlaceholder
          ? `<img
              src="https://itwinplatformcdn.azureedge.net/iTwinUI/user-placeholder.png"
              alt="${person.title}"
            />`
          : ''
      }
      <span class="iui-stroke"></span>
      ${
        status
          ? `<span
              title="${status}"
              class="iui-status iui-${status}"
            >
              ${icon && icon}
            </span>`
          : ''
      }
    </span>
    `;
    this.parentElement.insertAdjacentHTML('beforeend', innerHtml);
    this.remove();
  }
}
customElements.define('user-icon', UserIcon);
