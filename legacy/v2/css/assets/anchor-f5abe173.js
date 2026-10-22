var l=Object.defineProperty;var d=(a,o,e)=>o in a?l(a,o,{enumerable:!0,configurable:!0,writable:!0,value:e}):a[o]=e;var s=(a,o,e)=>(d(a,typeof o!="symbol"?o+"":o,e),e);(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))r(t);new MutationObserver(t=>{for(const i of t)if(i.type==="childList")for(const n of i.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&r(n)}).observe(document,{childList:!0,subtree:!0});function e(t){const i={};return t.integrity&&(i.integrity=t.integrity),t.referrerPolicy&&(i.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?i.credentials="include":t.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(t){if(t.ep)return;t.ep=!0;const i=e(t);fetch(t.href,i)}})();class u extends HTMLElement{constructor(){super();s(this,"changeTheme",({target:{value:e}})=>{const r=e.endsWith("-hc"),t=r?e.split("-")[0]:e;document.body.dataset.iuiTheme=t,document.body.dataset.iuiContrast=r?"high":void 0,this.shadowRoot.querySelector("#theme-color-scheme").innerHTML=`
      :host {
        color-scheme: ${t.includes("light")?"light":"dark"};
      }
    `});s(this,"changeBackground",({target:{value:e}})=>{e==="bg1"?document.body.style.backgroundColor="var(--iui-color-background)":document.body.removeAttribute("style")});const e=`
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
            <label tabindex="-1"><input type="radio" name="background" value="bg1" /><span>Background</span></label>
            <label tabindex="-1"><input type="radio" name="background" value="bg2" checked /><span>Background backdrop</span></label>
          </fieldset>
        </article>
      </div>
    `,r=`
      :host {
        position: fixed;
        top: var(--iui-size-xs);
        right: var(--iui-size-xs);
        z-index: 100000;
        accent-color: var(--iui-color-icon-accent);
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
        background-color: hsl(var(--iui-color-foreground-hsl) / 0.1);
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
        background-color: hsl(var(--iui-color-foreground-hsl) / 0.2);
      }
      .popup {
        visibility: hidden; 
        pointer-events: none;
        box-shadow: var(--iui-shadow-1);
        background-color: var(--iui-color-background);
        color: var(--iui-color-text);
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
        border: 1px solid var(--iui-color-border);
      }
      fieldset > * {
        display: inline-flex;
        align-items: center;
      }
      label, input {
        cursor: pointer;
      }
    `;this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=`
      <style>
        ${r}
      </style>
      <style id="theme-color-scheme">
        :host { color-scheme: light dark; }
      </style>
      ${e}
    `,this.button=this.shadowRoot.querySelector('[aria-label="Page settings"]');const t=window.matchMedia("(prefers-color-scheme: dark)").matches,i=window.matchMedia("(prefers-contrast: more)").matches;this.shadowRoot.querySelector(`input[value=${t?"dark":"light"}${i?"-hc":""}`).checked=!0,document.body.dataset.iuiTheme=t?"dark":"light",document.body.dataset.iuiContrast=i?"high":void 0,document.body.classList.toggle("iui-root",!0)}connectedCallback(){this.shadowRoot.querySelectorAll('input[name="theme"]').forEach(e=>{e.addEventListener("change",this.changeTheme)}),this.shadowRoot.querySelectorAll('input[name="background"]').forEach(e=>{e.addEventListener("change",this.changeBackground)})}disconnectedCallback(){this.shadowRoot.querySelectorAll('input[name="theme"]').forEach(e=>{e.removeEventListener("change",this.changeTheme)}),this.shadowRoot.querySelectorAll('input[name="background"]').forEach(e=>{e.removeEventListener("change",this.changeBackground)})}}customElements.define("theme-button",u);
