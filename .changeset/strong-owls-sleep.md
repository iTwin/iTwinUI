---
'@itwin/itwinui-css': major
---

The `iui-tab-label` wrapper class has been removed. The `iui-tab-label` class now applies to the `<span>` which holds the tab's label. `iui-tab-description` is now a `<span>` element.

```diff
- <span class="iui-tab-label">
-   <div>Active</div>
-   <div class="iui-tab-description">Sublabel</div>
- </span>

+ <span class="iui-tab-label">Active</span>
+ <span class="iui-tab-description">Sublabel</span>
```
