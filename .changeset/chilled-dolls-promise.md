---
"@itwin/itwinui-css": major
---

`.iui-select-tag-button` now requires `.iui-button .iui-field` and `data-iui-variant="borderless"`.

```diff
  <button
-   class="iui-select-tag-button"
+   class="iui-button iui-field iui-select-tag-button"
+   data-iui-variant="borderless"
  >
```

Similarly, `.iui-select-tag-button-icon` also requires `.iui-button-icon`.

```diff
-  <span class="iui-select-tag-button-icon">
+  <span class="iui-select-tag-button-icon iui-button-icon">
```
