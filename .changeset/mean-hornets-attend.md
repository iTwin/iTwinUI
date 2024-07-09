---
'@itwin/itwinui-css': major
---

Added a new `iui-fieldset-base` class that removes default `<fieldset>` styles. This class is now required when using `iui-fieldset`.

```diff
- <fieldset class="iui-fieldset">
+ <fieldset class="iui-fieldset-base iui-fieldset">
```
