class ThemeButton extends HTMLElement {
  constructor() {
    super();
    const html = /* html */ `
      <div class="settings-root">
        <button aria-label="Settings">
          <svg width="1rem" height="1rem" fill="currentColor" aria-hidden="true" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
            <path d="m16 9.42256v-2.85566l-2.20352-.44435a6.05356 6.05356 0 0 0 -.37645-.903l1.2427-1.87048-2.01923-2.01931-1.86669 1.24016a6.047 6.047 0 0 0 -.91294-.38153l-.44131-2.18839h-2.85566l-.44131 2.18839a6.0501 6.0501 0 0 0 -.91778.38383l-1.85881-1.23495-2.01924 2.01923 1.2388 1.86464a6.05267 6.05267 0 0 0 -.38067.91511l-2.18789.44119v2.85566l2.20054.44373a6.059 6.059 0 0 0 .37924.90383l-1.24251 1.87034 2.01923 2.01924 1.88089-1.24959a6.049 6.049 0 0 0 .8949.372l.44515 2.20735h2.85566l.44683-2.21567a6.05213 6.05213 0 0 0 .88907-.37186l1.882 1.25026 2.01923-2.01923-1.25089-1.88287a6.04854 6.04854 0 0 0 .37291-.89285zm-8.0053 1.61456a3.04782 3.04782 0 1 1 3.04782-3.04782 3.04781 3.04781 0 0 1 -3.04782 3.04782z"/>
          </svg>
        </button>
        <article class="popup">
          <fieldset>
            <legend>Choose theme</legend>
            <label tabindex="-1"><input type="radio" name="theme" value="light" /><span>Light</span></label>
            <label tabindex="-1"><input type="radio" name="theme" value="dark" /><span>Dark</span></label>
            <label tabindex="-1"><input type="radio" name="theme" value="light-hc" /><span>High contrast light</span></label>
            <label tabindex="-1"><input type="radio" name="theme" value="dark-hc" /><span>High contrast dark</span></label>
          </fieldset>
        </article>
      </div>
    `;
    const style = /* css */ `
      :host {
        position: absolute;
        top: 0;
        right: 8px;
        z-index: 2;
        accent-color: var(--iui-color-foreground-primary);
        pointer-events: none;
      }
      .settings-root {
        display: grid;
        justify-items: end;
        overflow: hidden;
      }
      button[aria-label="Settings"] {
        pointer-events: auto;
        padding: 0.5rem;
        font: inherit;
        border: none;
        border-radius: 50%;
        background: transparent;
        display: inline-grid;
        cursor: pointer;
        -webkit-tap-highlight-color: transparent;
      }
      @media (pointer: coarse) {
        button[aria-label="Settings"] {
          padding: 1rem;
        }
      }
      button[aria-label="Settings"]:hover {
        background: hsl(0 0% 50% / 0.3);
      }
      .popup {
        visibility: hidden; 
        pointer-events: none;
        box-shadow: 0 1px 5px hsl(0 0% 0% / 0.25);
        background-color: var(--iui-color-background-1);
        padding: 0.5rem 0.25rem;
        margin: 0.25rem;
      }
      .settings-root:focus-within .popup {
        visibility: visible;
        pointer-events: auto;
      }
      @media (prefers-reduced-motion: no-preference) {
        .popup {
          transform: translateX(100%);
          transition: transform 200ms ease-in, visibility 0s 200ms;
        }
        .settings-root:focus-within .popup {
          transform: translateX(0%);
          transition: transform 200ms ease-out;
        }
      }
      fieldset {
        display: grid;
      }
      fieldset > * {
        display: inline-flex;
        align-items: center;
      }
      label, input {
        cursor: pointer;
      }
    `;
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = /* html */ `
      <style>
        ${style}
      </style>
      <style id="theme-color-scheme">
        :host { color-scheme: light dark; }
      </style>
      ${html}
    `;
    this.button = this.shadowRoot.querySelector('[aria-label="Settings"]');

    // set default state
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const prefersHC = window.matchMedia('(prefers-contrast: more)').matches;
    this.shadowRoot.querySelector(
      `input[value=${prefersDark ? 'dark' : 'light'}${prefersHC ? '-hc' : ''}`
    ).checked = true;
  }

  changeTheme = ({ target: { value: theme } }) => {
    document.documentElement.className = `iui-theme-${theme}`;
    this.shadowRoot.querySelector('#theme-color-scheme').innerHTML = `
      :host {
        color-scheme: ${theme.includes('light') ? 'light' : 'dark'};
      }
    `;
  };

  connectedCallback() {
    this.shadowRoot.querySelectorAll('input[name="theme"]').forEach((radio) => {
      radio.addEventListener('change', this.changeTheme);
    });
  }

  disconnectedCallback() {
    this.shadowRoot.querySelectorAll('input[name="theme"]').forEach((radio) => {
      radio.removeEventListener('change', this.changeTheme);
    });
  }
}
customElements.define('theme-button', ThemeButton);
