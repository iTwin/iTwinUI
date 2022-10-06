/**
 * Web component for radial progress indicator. Use in other components examples to simplify html.
 * <x-radial size="s"></x-radial>
 * <x-radial size="s" percentage="50"></x-radial>
 */

class Radial extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const size = this.getAttribute('size') || 'm';
    const percentage = this.getAttribute('percentage');

    const innerHtml = `
    <div
      class="iui-progress-radial-wrapper"
      role="progressbar"
      data-iui-size="${size}"
      ${percentage ? `aria-valuenow="${percentage}"` : ''}
    >
      <svg
        class="iui-progress-radial"
        viewBox="0 0 32 32"
        aria-hidden="true"
      >
        <circle
          class="iui-progress-radial-track"
          cx="16"
          cy="16"
          r="14"
        >
        </circle>
        <circle
          class="iui-progress-radial-value"
          cx="16"
          cy="16"
          r="14"
          style="stroke-dashoffset: calc(88 - 88 * 60 / 100);"
        >
        </circle>
      </svg>
    </div>
    `;
    this.insertAdjacentHTML('afterend', innerHtml);
    this.remove();
  }
}
customElements.define('x-radial', Radial); //custom html elements must have a "-" to avoid potential conflicts with native html elements
