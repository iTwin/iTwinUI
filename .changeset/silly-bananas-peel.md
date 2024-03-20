---
"@itwin/itwinui-css": major
---

Replaces the size classes for `iui-avatar` with a new `data-iui-size` attribute.

```diff
-<div class="iui-avatar iui-small">
+<div class="iui-avatar" data-iui-size="small">
```

Possible values include: `"small"`, `"medium"`, `"large"`, and `"x-large"`. Defaults to `"medium"`.
