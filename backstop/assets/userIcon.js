/**
 * Web component for user icon. Use in other components examples to simplify html. Choose between 2 predefined types/people.
 * <user-icon size="small" type="2"></user-icon>
 * <user-icon size="x-large" type="1" status="online" showPlaceholder="true"></user-icon>
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

class UserIcon extends HTMLElement {
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
              src="../assets//user-placeholder.png"
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
            ></span>`
          : ''
      }
    </span>
    `;
    this.parentElement.insertAdjacentHTML('beforeend', innerHtml);
    this.remove();
  }
}
customElements.define('user-icon', UserIcon);
