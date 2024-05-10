---
"@itwin/itwinui-css": major
---

`.iui-sidenav-button.iui-expand` now requires `.iui-button .iui-field` and `data-iui-size="small"`.

```diff
  <button
-   class="iui-button iui-button-base iui-sidenav-button iui-expand"
+   class="iui-button iui-button-base iui-sidenav-button iui-field iui-expand"
+   data-iui-size="small"
  >
```
