class ThemeButton extends HTMLElement {
  constructor() {
    super();
    const html = /* html */ `
      <div class="settings-root">
        <button title="Page settings" id="page-settings-menu-button" aria-label="Page settings" aria-haspopup="true" aria-controls="page-settings-menu">
          <svg width="1rem" height="1rem" fill="currentColor" aria-hidden="true" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
            <path d="m16 9.42256v-2.85566l-2.20352-.44435a6.05356 6.05356 0 0 0 -.37645-.903l1.2427-1.87048-2.01923-2.01931-1.86669 1.24016a6.047 6.047 0 0 0 -.91294-.38153l-.44131-2.18839h-2.85566l-.44131 2.18839a6.0501 6.0501 0 0 0 -.91778.38383l-1.85881-1.23495-2.01924 2.01923 1.2388 1.86464a6.05267 6.05267 0 0 0 -.38067.91511l-2.18789.44119v2.85566l2.20054.44373a6.059 6.059 0 0 0 .37924.90383l-1.24251 1.87034 2.01923 2.01924 1.88089-1.24959a6.049 6.049 0 0 0 .8949.372l.44515 2.20735h2.85566l.44683-2.21567a6.05213 6.05213 0 0 0 .88907-.37186l1.882 1.25026 2.01923-2.01923-1.25089-1.88287a6.04854 6.04854 0 0 0 .37291-.89285zm-8.0053 1.61456a3.04782 3.04782 0 1 1 3.04782-3.04782 3.04781 3.04781 0 0 1 -3.04782 3.04782z"/>
          </svg>
        </button>
        <article class="popup" id="page-settings-menu" role="menu" aria-labelledby="page-settings-menu-button">
          <fieldset>
            <legend>Theme</legend>
            <label tabindex="-1"><input type="radio" name="theme" value="light" /><span>Light</span></label>
            <label tabindex="-1"><input type="radio" name="theme" value="dark" /><span>Dark</span></label>
            <label tabindex="-1"><input type="radio" name="theme" value="light-hc" /><span>High contrast light</span></label>
            <label tabindex="-1"><input type="radio" name="theme" value="dark-hc" /><span>High contrast dark</span></label>
          </fieldset>

          <fieldset>
            <legend>Background color</legend>
            <label tabindex="-1"><input type="radio" name="background" value="bg1" onclick="document.body.classList.add('force-background-1');" /><span>Background 1</span></label>
            <label tabindex="-1"><input type="radio" name="background" value="bg2" onclick="document.body.classList.remove('force-background-1');" checked /><span>Background 2</span></label>
          </fieldset>
        </article>
      </div>
    `;
    const style = /* css */ `
      :host {
        position: fixed;
        top: var(--iui-size-xs);
        right: var(--iui-size-xs);
        z-index: 2;
        accent-color: var(--iui-color-foreground-primary);
        pointer-events: none;
      }
      .settings-root {
        display: grid;
        justify-items: end;
        overflow: hidden;
      }
      button[aria-label="Page settings"] {
        pointer-events: auto;
        padding: var(--iui-size-xs);
        font: inherit;
        border: none;
        border-radius: 50%;
        background-color: hsl(var(--iui-color-foreground-1-hsl) / 0.1);
        backdrop-filter: blur(5px);
        display: inline-grid;
        cursor: pointer;
        outline-offset: -1px;
        transition: background-color var(--iui-duration-1) ease;
        -webkit-tap-highlight-color: transparent;
      }
      @media (pointer: coarse) {
        button[aria-label="Page settings"] {
          padding: var(--iui-size-m);
        }
      }
      button[aria-label="Page settings"]:hover,
      button[aria-label="Page settings"]:focus-within {
        background-color: hsl(var(--iui-color-foreground-1-hsl) / 0.2);
      }
      .popup {
        visibility: hidden; 
        pointer-events: none;
        box-shadow: var(--iui-shadow-1);
        background-color: var(--iui-color-background-1);
        padding: var(--iui-size-xs) var(--iui-size-s);
        margin: var(--iui-size-2xs);
        display: flex;
        flex-direction: column;
        gap: var(--iui-size-xs);
        opacity: 0;
        user-select: none;
      }
      .settings-root:focus-within .popup {
        visibility: visible;
        pointer-events: auto;
        opacity: 1;
      }
      @media (forced-colors: active) {
        button[aria-label="Page settings"],
        button[aria-label="Page settings"]:hover,
        button[aria-label="Page settings"]:focus-within {
          backdrop-filter: none;
          background-color: Canvas;
        }
        
        button[aria-label="Page settings"],
        .popup {
          border: 1px solid;
        }
      }
      @media (prefers-reduced-motion: no-preference) {
        .popup {
          transform: translateX(100%);
          transition: transform var(--iui-duration-1) ease-in, visibility 0s linear var(--iui-duration-1), opacity var(--iui-duration-1) ease-in;
        }
        .settings-root:focus-within .popup {
          transform: translateX(0%);
          transition: transform var(--iui-duration-1) ease-out, visibility 0s linear 0s, opacity var(--iui-duration-1) ease-out;
        }
      }
      fieldset {
        display: grid;
        border-radius: var(--iui-border-radius-1);
        border: 1px solid var(--iui-color-background-border);
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
    this.button = this.shadowRoot.querySelector('[aria-label="Page settings"]');

    // set default state
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const prefersHC = window.matchMedia('(prefers-contrast: more)').matches;
    this.shadowRoot.querySelector(
      `input[value=${prefersDark ? 'dark' : 'light'}${prefersHC ? '-hc' : ''}`
    ).checked = true;
    document.documentElement.dataset.iuiTheme = prefersDark ? 'dark' : 'light';
    document.documentElement.dataset.iuiContrast = prefersHC ? 'high' : undefined;
  }

  changeTheme = ({ target: { value: _theme } }) => {
    const isHighContrast = _theme.endsWith('-hc');
    const theme = isHighContrast ? _theme.split('-')[0] : _theme;
    document.documentElement.dataset.iuiTheme = theme;
    document.documentElement.dataset.iuiContrast = isHighContrast ? 'high' : undefined;
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
