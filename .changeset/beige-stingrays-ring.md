---
"@itwin/itwinui-css": major
---

- `.iui-breadcrumbs-content` now requires `.iui-button .iui-field`.
- `a.iui-breadcrumbs-content` require nested `<span>` and hover state looks more like button's hover state.

```diff
<button
-  class="iui-breadcrumbs-content"
+  class="iui-button iui-button-base iui-field iui-breadcrumbs-content"
+  data-iui-variant="borderless"
>
  <span>...</span>
</button>
```

```diff
<a
-  class="iui-anchor iui-breadcrumbs-content"
+  class="iui-anchor iui-button-base iui-button iui-field iui-breadcrumbs-content"
+  data-iui-variant="borderless"
>
+  <span>
    ...
+  </span>
</a>
```
