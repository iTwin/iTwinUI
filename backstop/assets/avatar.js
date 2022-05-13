/**
 * Web component for avatar. Use in other components examples to simplify html. Choose between 2 predefined types/people.
 * <x-avatar size="small" type="2"></x-avatar>
 * <x-avatar size="x-large" type="1" status="online" showPlaceholder="true"></x-avatar>
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
      class="iui-avatar iui-${size}"
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
customElements.define('x-avatar', Avatar); //custom html elements must have a "-" to avoid potential conflicts with native html elements
