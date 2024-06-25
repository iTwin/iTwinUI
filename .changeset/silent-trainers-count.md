---
'@itwin/itwinui-css': major
---

`.iui-tile-thumbnail-type-indicator` and `.iui-tile-thumbnail-quick-action` should now be applied on wrapper element, and the button inside should have the new `.iui-tile-thumbnail-button` class. This reduces code complexity and fixes a visual bug with the hover state.

<details>

<summary>Example</summary>

```html
<div class="iui-tile-thumbnail-quick-action">
  <button
    class="iui-field iui-button-base iui-button iui-tile-thumbnail-button"
    data-iui-variant="borderless"
    data-iui-size="small"
  >
    …
  </button>
</div>
```

</details>
