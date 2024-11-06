---
'@itwin/itwinui-css': major
---

The class `iui-radio` now depends on `iui-checkbox` for its styling. Additionally, `iui-radio-wrapper` is now replaced by `iui-checkbox-wrapper` for all `Radio` elements.

```diff
- <label class="iui-radio-wrapper">
-   <input class="iui-radio">
+ <label class="iui-checkbox-wrapper">
+   <input class="iui-checkbox iui-radio">
```
