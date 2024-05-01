---
"@itwin/itwinui-css": major
---

`.iui-breadcrumbs-content` now requires `.iui-button .iui-field` and `data-iui-variant="borderless"`.

```diff
  <button
-   class="iui-breadcrumbs-content"
+   class="iui-button iui-button-base iui-field iui-breadcrumbs-content"
+   data-iui-variant="borderless"
  >
```

When used with `<a>`, the same button classes must be used, and the content must be wrapped in a `<span>`. As a result, the anchor's hover state will now be more consistent with the button's hover state.

```diff
  <a
-   class="iui-anchor iui-breadcrumbs-content"
+   class="iui-anchor iui-button-base iui-button iui-field iui-breadcrumbs-content"
+   data-iui-variant="borderless"
  >
+   <span>
      …
+   </span>
  </a>
```
