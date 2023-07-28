---
'@itwin/itwinui-css': major
---

The `iui-tab-label` wrapper class has been removed. The `iui-tab-label` class now applies to the `<span>` which holds the tab's label. `iui-tab-description` is now a `<span>` element.

```diff
<ul class="iui-tabs">
  <li>
    <button class="iui-tab">
      <span class="iui-tab-label">
        <div>Active</div>
        <div class="iui-tab-description">Sublabel</div>
      </span>
    </button>
  </li>
</ul>

<div class="iui-tabs">
  <button class="iui-tab">
    <span class="iui-tab-label">Active</span>
    <span class="iui-tab-description">Sublabel</span>
  </button>
</div>
```
