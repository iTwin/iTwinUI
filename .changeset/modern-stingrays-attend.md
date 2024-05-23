---
'@itwin/itwinui-css': minor
---

Added loading state to `iui-button`, via the `data-iui-loading` attribute and the `iui-button-spinner` class.

```html
<button class="iui-button" data-iui-loading="true" aria-disabled="true">
  <span>Click me</span>
  <div
    class="iui-progress-indicator-radial iui-button-spinner"
    data-iui-indeterminate="true"></div>
</button>
```
