---
'@itwin/itwinui-css': minor
---

* Added new `iui-tabs-actions` to `.iui-tabs-wrapper` to add right/bottom content to the horizontal/vertical tabs.

```html
<div class="iui-tabs-wrapper iui-horizontal">
  <ul class="iui-tabs iui-default">...</ul>

  <div class="iui-tabs-actions">
    <button
      class="iui-button iui-button-dropdown"
      data-iui-size="small"
    >
      <span>Actions</span>
      <svg-caret-down-small
        class="iui-button-icon"
        aria-hidden="true"
      ></svg-caret-down-small>
    </button>
  </div>

  <div class="iui-tabs-content">...</div>
  <div class="iui-tabs-content">...</div>
  <div class="iui-tabs-content">...</div>
</div>
```
