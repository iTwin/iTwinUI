---
'@itwin/itwinui-css': major
---

Replaces the status classes for `iui-checkbox` with a new `data-iui-status` attribute.

```diff
- <div class="iui-checkbox iui-positive">
+ <div class="iui-checkbox" data-iui-status="positive">
```

Possible values include: `"positive"`, `"negative"`, and `"warning"`.
