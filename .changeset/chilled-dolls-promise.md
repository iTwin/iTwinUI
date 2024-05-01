---
"@itwin/itwinui-css": major
---

- `.iui-select-tag-button` now requires `.iui-button .iui-field` and `data-iui-variant="borderless"`.

```diff
<span class="iui-select-tag">
  <span class="iui-select-tag-label">...</span>
  <button
-    class="iui-select-tag-button"
+    class="iui-button iui-field iui-select-tag-button"
+    data-iui-variant="borderless"
  >
    ...
  </button>
</span>
```
