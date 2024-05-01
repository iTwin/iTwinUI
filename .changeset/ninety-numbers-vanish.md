---
"@itwin/itwinui-css": major
---

Added `.iui-field` class to be used with `.iui-button`, `.iui-input`, and `.iui-select-button`. These components now have consistent styling for base, hover and disabled states.

```diff
  <button
-   class="iui-button iui-button-base"
+   class="iui-button iui-button-base iui-field"
  >
```

```diff
  <input
-   class="iui-input"
+   class="iui-input iui-field"
  >
```

```diff
  <div
-   class="iui-select-button"
+   class="iui-select-button iui-field"
  >
```
