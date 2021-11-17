const THEMEAVAILABLE = [
  'iui-theme-light',
  'iui-theme-dark',
  'iui-theme-light-hc',
  'iui-theme-dark-hc',
];

class ThemeButton extends HTMLElement {
  constructor() {
    super();
    const html = `
      <button title="Toggle theme" id="theme-button">
        <svg viewBox="0 0 16 16" aria-hidden="true">
          <path d="m8 0a8 8 0 1 0 8 8 8 8 0 0 0 -8-8zm0 12v3a7 7 0 0 1 0-14v3a4 4 0 0 1 0 8zm0 0a4 4 0 0 1 0-8z"/>
        </svg>
        <span class="toggle-theme-label">Toggle theme</span>
      </button>`;
    const style = `
      :host {
        position: absolute;
        top: 0;
        right: 0;
      }
      :host button {
        background-color: transparent;
        cursor: pointer;
        padding: 0.5rem;
        border: 0;
      }
      :host svg {
        width: 1rem;
        height: 1rem;
        display: inline-block;
        vertical-align: middle;
        fill: black;
      }
      :host span {
        display: none;
        color: black;
      }
      :host(:hover) span {
        display: inline-block;
        margin-left: 0.25rem;
      }
      :host-context(.iui-theme-dark) svg {
        fill: white;
      }
      :host-context(.iui-theme-dark) span {
        color: white;
      }`;
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        ${style}
      </style>
      ${html}`;
    this.themeButton = this.shadowRoot.getElementById(`theme-button`);
  }

  // Cycle between all the theme available
  toggleTheme = () => {
    const element = document.getElementById('theme');
    const themeLength = THEMEAVAILABLE.length;
    let themeIndex = themeLength;
    // Verify if theme is set. Set index and remove theme
    if (element.classList.length) {
      const [first, ...rest] = element.className.split(' ');
      themeIndex = THEMEAVAILABLE.findIndex((theme) => theme === first);
      element.classList.remove(first, ...rest);
    }
    element.classList.add(
      // https://stackoverflow.com/questions/17483149/how-to-access-array-in-circular-manner-in-javascript
      THEMEAVAILABLE[
        (((themeIndex + 1) % themeLength) + themeLength) % themeLength
      ]
    );
  };

  toggleCustomTheme = () => {
    const element = document.getElementById('theme');
    element.classList.toggle('custom-theme');
  };

  connectedCallback() {
    this.themeButton.addEventListener('click', this.toggleTheme);
    this.themeButton.addEventListener('contextmenu', this.toggleCustomTheme);
  }
  disconnectedCallback() {
    this.themeButton.removeEventListener('click', this.toggleTheme);
    this.themeButton.removeEventListener('contextmenu', this.toggleCustomTheme);
  }
}
customElements.define('theme-button', ThemeButton);
