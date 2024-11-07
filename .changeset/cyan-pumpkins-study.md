---
'@itwin/itwinui-css': major
---

Replaces the attribute classes for `iui-checkbox` such as `iui-status`, `iui-disabled`, and `iui-loading` with new `data-iui-` attributes: `data-iui-status`, `data-iui-disabled`, and `data-iui-loading`.

```diff
- <div class="iui-checkbox iui-positive">
+ <div class="iui-checkbox" data-iui-status="positive">
```

Possible values include: `"positive"`, `"negative"`, and `"warning"`.

```diff
- <div class="iui-checkbox iui-disabled">
+ <div class="iui-checkbox" data-iui-disabled="true">
```

```diff
- <div class="iui-checkbox iui-loading">
+ <div class="iui-checkbox" data-iui-loading="true">
```
